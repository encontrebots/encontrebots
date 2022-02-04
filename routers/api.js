const express = require('express');
const passport = require('passport');
const config = require('../config/config.js');
const bot = require('../bot/bot');
const router = express.Router();

router.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), async function(req, res) {
	if (!req.user.id || !req.user.guilds) {
		res.redirect('/');
	}
	else {res.redirect('/dashboard');}
});

router.post('/bots/:botid/edit', async (req, res) => {
	const model = require('../schemas/BotSchema');
	const botDB = await model.findOne({ bot: req.params.botid });
	if (!botDB) {
		res.redirect(`/bots/${req.params.botid}/edit?type=unknown`);
	}
	else {
		const botd = await model.findOne({ bot: req.params.botid });
		botd.bot = botDB.bot;
		botd.descc = req.body.descc || 'Olá, sou um simples bot para discord!';
		botd.descl = req.body.descl || '### Olá, seja bem-vindo!\n\nPosso te ajudar com alguma coisa?\n\n- [Me Adicione!](/bots/' + botDB.bot + '/add)\n- [Discord!](/bots/' + botDB.bot + '/discord)';
		botd.prefix = req.body.prefix;
		botd.support = req.body.support;
		botd.website = req.body.website;
		botd.tags = req.body.tags;
		botd.status = botDB.status || 'pending';
		botd.save();
		res.redirect(`/bots/${botDB.bot}?type=edited`);
		const user = await bot.getRESTUser(req.params.botid);
		const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
		channel.createMessage(`📝 <@${req.session.passport?.user.id}> **|** O Bot **${user.username}** foi editado com sucesso.`);
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
			descc: req.body.descc || 'Olá, sou um simples bot para discord!',
			descl: req.body.descl || '### Olá, seja bem-vindo!\n\nPosso te ajudar com alguma coisa?\n\n- [Me Adicione!](/bots/' + req.body.botid + '/add)\n- [Discord!](/bots/' + req.body.botid + '/discord)',
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