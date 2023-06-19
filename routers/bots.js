const express = require('express');
const config = require('../config/config.js');
const getStaff = require('../utils/functions.js');
const bot = require('../bot/bot.js');
const router = express.Router();
const markdown = require('markdown-it')();

router.get('/:id/status', async (req, res) => {
	await getStaff(req, bot, config);
	const model = require('../schemas/BotSchema');
	const botd = await model.findOne({ bot: req.params.id });
	const stats = botd.stats || {
		servers: 0,
		users: 0,
		shards: 0,
	};
	if (!botd) {
		return res.redirect('/');
	}
	else {
		res.json(stats);
	}
});

router.get('/:id/website', async (req, res) => {
	await getStaff(req, bot, config);
	const model = require('../schemas/BotSchema');
	const botd = await model.findOne({ bot: req.params.id });
	if (!botd) {
		return res.redirect('/');
	}
	else {
		res.redirect(botd.website || '/');
	}
});

router.get('/:id/vote', async (req, res) => {
	await getStaff(req, bot, config);
	const model = require('../schemas/BotSchema');
	const botDB = await model.findOne({ bot: req.params.id });
	const botuser = await bot.getRESTUser(req.params.id);
	botDB.avatar = botuser.avatarURL;
	botDB.name = botuser.username;
	let botOwner;
	if (!botDB) {
		res.redirect('/');
	}
	else if (req.session.passport?.user.id === botDB.owner) {
		botOwner = true;
	}
	else if (req.session.passport?.user.id !== botDB.owner) {
		botOwner = false;
	}
	res.render('votebot', {
		boti: botDB,
		botDesc: markdown.render(botDB.descl),
		bot: bot,
		botOwner: botOwner,
		user: req.session.passport?.user || null,
	});
});

router.get('/:id/discord', async (req, res) => {
	await getStaff(req, bot, config);
	const model = require('../schemas/BotSchema');
	const botd = await model.findOne({ bot: req.params.id });
	if (!botd) {
		return res.redirect('/');
	}
	else {
		res.redirect(botd.support || 'https://discord.gg/seWTF9P2Q5');
	}
});

router.get('/:id', async (req, res) => {
	await getStaff(req, bot, config);
	const model = require('../schemas/BotSchema');
	const botDB = await model.findOne({ bot: req.params.id });
	const botuser = await bot.getRESTUser(req.params.id);
	if (!botDB.stats) {
		botDB.stats = {
			servers: 0,
			users: 0,
			shards: 0,
		}
	}
	botDB.avatar = botuser.avatarURL;
	botDB.name = botuser.username;
	let botOwner;
	if (!botDB) {
		res.redirect('/');
	}
	else if (req.session.passport?.user.id === botDB.owner) {
		botOwner = true;
	}
	else if (req.session.passport?.user.id !== botDB.owner) {
		botOwner = false;
	}
	res.render('viewbot', {
		boti: botDB,
		botDesc: markdown.render(botDB.descl),
		bot: bot,
		botOwner: botOwner,
		user: req.session.passport?.user || null,
	});
});

router.get('/:id/add', async (req, res) => {
	res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.params.id}&permissions=-1&scope=bot%20applications.commands`);
});

router.get('/:id/edit', async (req, res) => {
	const model = require('../schemas/BotSchema');
	const botDB = await model.findOne({ bot: req.params.id });
	if (!botDB) {
		res.redirect('/');
	}
	if (req.session.passport?.user.id !== botDB.owner) {
		res.redirect('/');
	}
	res.render('editbot', {
		bot: bot,
		boti: botDB,
		tags: config.tags,
		user: req.session.passport?.user || null,
	});
});

router.get('/:id/api', async (req, res) => {
	const model = require('../schemas/BotSchema');
	const botDB = await model.findOne({ bot: req.params.id });
	if (!botDB) {
		res.redirect('/');
	}
	if (req.session.passport?.user.id !== botDB.owner) {
		res.redirect('/');
	}
	res.render('apibot', {
		bot: bot,
		boti: botDB,
		tags: config.tags,
		user: req.session.passport?.user || null,
	});
});

module.exports = router;