const express = require('express');
const config = require('../../config/config.js');
const bot = require('../../bot/bot');
const router = express.Router();

router.post('/:botid/delete', async (req, res) => {
	const model = require('../../schemas/BotSchema');
	if (req.body.headers.Authorization !== process.env.APIAUTH) return;
	const botid = req.params.botid;
	await model.findOneAndDelete({ bot: botid });
	res.sendStatus(200);
});

router.post('/stats/bots', async (req, res) => {
	const model = require('../../schemas/BotSchema');
	try {
		const botData = await model.findOne({ apikey: req.body.data.auth });
		if (!botData) {
			return res.sendStatus(401);
		}
		await model.findOneAndUpdate({ apikey: req.body.data.auth }, {
			stats: {
				servers: req.body.data.servers,
				users: req.body.data.users,
				shards: req.body.data.shards,
			}
		});
		return res.sendStatus(200);
	}
	catch (e) {
		res.sendStatus(401);
		console.log(e);
	}
});

router.post('/:botid/vote', async (req, res) => {
	const model = require('../../schemas/BotSchema');
	const model2 = require('../../schemas/UserSchema');

	const botid = req.params.botid;
	const userid = req.body.userid;

	const botData = await model.findOne({ bot: botid });
	const userData = await model2.findOne({ userID: userid });

	if (userData) {
		const OneHour = 60 * 60 * 1000;
		const TwentyFourHour = 24 * OneHour;

		const timeDiff = Date.now() - userData.lastVoted;

		if (timeDiff < TwentyFourHour) {
			return res.redirect('/bots/' + botid + '/vote?type=alderayvoted');
		}

		userData.lastVoted = Date.now();
		userData.save();

		const currentVotes = botData.votes || 0;

		botData.votes = currentVotes + 1;
		botData.save();

		const user = await bot.getRESTUser(req.params.botid);
		const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
		channel.createMessage(`⬆️ <@${req.session.passport?.user.id}> **|** Você votou no bot **${user.username}** com sucesso!`);
		res.redirect('/bots/' + botid + '/vote?type=voted');
	}
});

router.get('/:botid', async (req, res) => {
	const model = require('../../schemas/BotSchema');
	const botDB = await model.findOne({ bot: req.params.botid });
	if (botDB) {
		const ownerInfo = await bot.getRESTUser(botDB.owner);
		const botObj = {
			id: botDB.bot,
			avatar: botDB.avatar,
			shortDesc: botDB.descc,
			longDesc: botDB.descl,
			prefix: botDB.prefix,
			support: botDB.support,
			website: botDB.website,
			tags: botDB.tags,
			status: botDB.status,
			owner: ownerInfo,
		};
		res.status(200).json(botObj);
	}
	else {
		res.status(404).json({ error: 'Bot not found' });
	}
});

router.post('/:botid/genkey', async (req, res) => {
	const model = require('../../schemas/BotSchema');
	const botDB = await model.findOne({ bot: req.params.botid });
	if (!botDB) {
		res.redirect(`/bots/${req.params.botid}/api?type=unknown`);
	}
	else {
		const newKey = 'encontrebotstoken_' + Math.random().toString(36).slice(2, 10);
		const botd = await model.findOne({ bot: req.params.botid });
		botd.apikey = newKey;
		botd.save();
		res.redirect(`/bots/${botDB.bot}/api?type=generated`);
	}
});

router.post('/:botid/edit', async (req, res) => {
	const model = require('../../schemas/BotSchema');
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
		botd.stats = {
			servers: 0,
			users: 0,
			channels: 0
		};
		botd.save();
		res.redirect(`/bots/${botDB.bot}?type=edited`);
		const user = await bot.getRESTUser(req.params.botid);
		const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
		channel.createMessage(`📝 <@${req.session.passport?.user.id}> **|** O Bot **${user.username}** foi editado com sucesso.`);
	}
});

router.post('/:id/approve', async (req, res) => {
	const model = require('../../schemas/BotSchema');
	const data = await model.findOne({ bot: req.params.id });
	if (data) {
		data.status = 'verified';
		data.save();
		res.redirect('/queue?type=approved');
	}
	const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
	const user = await bot.getRESTUser(req.params.id);
	channel.createMessage(`:white_check_mark: <@${data.owner}> **|** O Bot **${user.username}** foi aprovado. [<@${req.session.passport?.user.id}>].`);
	const guild = await bot.getRESTGuild(config.discord.guild.id);
	const member = await guild.getRESTMember(req.params.id);
	const role = await guild.roles.get(config.discord.guild.roles.verifiedBot);
	const role2 = await guild.roles.get(config.discord.guild.roles.pendentBot);
	await member.removeRole(role2.id);
	await member.addRole(role.id);
	const dev = await guild.getRESTMember(data.owner);
	if (!dev) return;
	const role3 = await guild.roles.get(config.discord.guild.roles.developer);
	await dev.addRole(role3.id);
});

router.post('/:id/deny', async (req, res) => {
	const model = require('../../schemas/BotSchema');
	const data = await model.findOne({ bot: req.params.id });
	const owner = data.owner;
	await model.findOneAndDelete({ bot: req.params.id });
	const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
	const user = await bot.getRESTUser(req.params.id);
	channel.createMessage(`:x: <@${owner}> **|** O Bot **${user.username}** foi reprovado. [<@${req.session.passport?.user.id}>].`);
	res.redirect('/queue?type=reproved');
});

router.post('/add', async (req, res) => {
	const model = require('../../schemas/BotSchema');
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
			support: req.body.support || 'discord.gg/seWTF9P2Q5',
			website: req.body.website || '',
			tags: req.body.tags || [],
			owner: req.session.passport?.user.id,
			status: 'pending',
			stats: {
				servers: 0,
				users: 0,
				channels: 0
			}
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