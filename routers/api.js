const express = require('express');
const passport = require('passport');
const config = require('../config/config.json');
const bot = require('../bot/bot');
const router = express.Router();

router.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), async function(req, res) {
	if (!req.user.id || !req.user.guilds) {
		res.redirect('/');
	}
	else {res.redirect('/dashboard');}
});

router.post('/bots/edit', async (req, res) => {
	const model = require('../schemas/BotSchema');
	const botDB = await model.findOne({ bot: req.body.botid });
	if (!botDB) {
		res.redirect(`/bots/${req.body.botid}/edit?type=unknown`);
	}
	else {
		const bot = await model.findOne({ bot: req.body.botid });
		bot.bot = botDB.bot;
		bot.descc = req.body.descc;
		bot.descl = req.body.descl;
		bot.prefix = req.body.prefix;
		bot.support = req.body.support;
		bot.website = req.body.website;
		bot.tags = req.body.tags;
		bot.status = botDB.status || 'pending';
		bot.save();
		res.redirect(`/bots/${botDB.bot}?type=edited`);
	}
});

router.post('/bots/:id/approve', async (req, res) => {
	const model = require('../schemas/BotSchema');
	const data = await model.findOne({ bot: req.params.id });
	if (data) {
		data.status = 'verified';
		data.save();
		res.redirect('/queue?type=approved');
	}
	const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
	const user = await bot.getRESTUser(req.params.id);
	channel.createMessage(`:white_check_mark: <@${req.session.passport?.user.id}> **|** O Bot **${user.username}** foi aprovado. [<@${req.session.passport?.user.id}>].`);
	res.redirect('/queue?type=approved');
});

router.post('/bots/:id/deny', async (req, res) => {
	const model = require('../schemas/BotSchema');
	await model.findOneAndDelete({ bot: req.params.id });
	const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
	const user = await bot.getRESTUser(req.params.id);
	channel.createMessage(`:x: <@${req.session.passport?.user.id}> **|** O Bot **${user.username}** foi reprovado. [<@${req.session.passport?.user.id}>].`);
	res.redirect('/queue?type=reproved');
});

router.post('/bots/add', async (req, res) => {
	const model = require('../schemas/BotSchema');
	const user = await bot.getRESTUser(req.body.botid);
	if (await model.findOne({ bot: req.body.botid })) {
		res.redirect('/add?type=alderay');
	}
	else {
		await model.create({
			bot: req.body.botid,
			avatar: user.avatarURL,
			descc: req.body.descc,
			descl: req.body.descl,
			prefix: req.body.prefix || '!',
			support: req.body.support || 'discord.gg/WJjVSSyFea',
			website: req.body.website || '',
			tags: req.body.tags || [],
			owner: req.session.passport?.user.id,
			status: 'pending',
		}).then(async () => {
			const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
			const devDB = await bot.db.get(`developer-${req.session.passport?.user.id}`);
			if (!devDB) {
				await bot.db.set(`developer-${req.session.passport?.user.id}`, true);
			}
			channel.createMessage(`:white_check_mark: <@${req.session.passport?.user.id}> **|** O Bot **${user.username}** foi adicionado com sucesso. | <@&${config.discord.guild.roles.verifier}>`);
			setTimeout(() => {
				res.redirect('/add?type=botadded');
			}, 3000);
		});
	}
});

module.exports = router;