const express = require('express');
const config = require('../config/config.js');
const getStaff = require('../utils/functions.js');
const bot = require('../bot/bot.js');
const router = express.Router();

router.get('/', async (req, res) => {
	await getStaff(req, bot, config);
	const model = require('../schemas/BotSchema');
	const bots = await model.find({ status: 'verified' });
	for (let i = 0; i < bots.length; i++) {
		const BotRaw = await bot.getRESTUser(bots[i].bot) || null;
		bots[i].name = BotRaw.username;
		bots[i].avatar = BotRaw.avatarURL;
	}
	res.render('index', {
		bot: bot,
		bots: bots,
		user: req.session.passport?.user || null,
	});
});

router.get('/queue', async (req, res) => {
	await getStaff(req, bot, config);
	if (!req.session.passport?.user.staff) {
		return res.redirect('/');
	}
	const model = require('../schemas/BotSchema');
	const bots = await model.find({ status: 'pending' });
	for (let i = 0; i < bots.length; i++) {
		const BotRaw = await bot.getRESTUser(bots[i].bot) || null;
		bots[i].name = BotRaw.username;
		bots[i].avatar = BotRaw.avatar;
	}
	res.render('queue', {
		bot: bot,
		bots: bots,
		user: req.session.passport?.user || null,
	});
});

router.get('/@me', async (req, res) => {
	await getStaff(req, bot, config);
	if (!req.session.passport?.user.staff) {
		return res.redirect('/');
	}
	const model = require('../schemas/BotSchema');
	const botd = await model.find({ owner: req.session.passport?.user.id });
	for (let i = 0; i < botd.length; i++) {
		const BotRaw = await bot.getRESTUser(botd[i].bot) || null;
		botd[i].name = BotRaw.username;
		botd[i].avatar = BotRaw.avatarURL;
	}
	res.render('@me', {
		bot: bot,
		bots: botd,
		user: req.session.passport?.user || null,
	});
});

router.get('/bots', async (req, res) => {
	await getStaff(req, bot, config);
	const bots = await bot.db.get('bots');
	res.render('bots', {
		bot: bot,
		bots: bots,
		user: req.session.passport?.user || null,
	});
});

router.get('/login', async function(req, res) {
	res.redirect('/api/callback');
});

router.get('/logout', async function(req, res) {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
});

router.get('/add', async (req, res) => {
	if (!req.session.passport?.user) {
		res.redirect('/');
	}
	res.render('addbot', {
		bot: bot,
		tags: config.tags,
		user: req.session.passport?.user || null,
	});
});

router.get('/discord', async (req, res) => {
	res.redirect('https://discord.gg/WJjVSSyFea');
});

module.exports = router;