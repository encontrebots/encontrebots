const express = require('express');
const config = require('../config/config.json');
const getStaff = require('../utils/functions.js');
const bot = require('../bot/bot.js');
const router = express.Router();

router.get('/', async (req, res) => {
	await getStaff(req, bot, config);
	const bots = await bot.db.get('bots');
	const botArray = [];
	bots.forEach((boti) => {
		if (bot.status === 'pending') return;
		botArray.push(boti);
	});
	res.render('index', {
		bot: bot,
		bots: botArray,
		user: req.session.passport?.user || null,
	});
});

router.get('/queue', async (req, res) => {
	await getStaff(req, bot, config);
	const bots = await bot.db.get('bots');
	const botArray = [];
	bots.forEach((bot) => {
		if (bot.status === 'pending') {
			botArray.push(bot);
		}
	});
	res.render('queue', {
		bot: bot,
		bots: botArray,
		user: req.session.passport?.user || null,
	});
});

router.get('/@me', async (req, res) => {
	await getStaff(req, bot, config);
	res.render('@me', {
		bot: bot,
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
	if (!req.session.passport.user) {
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