const express = require('express');
const config = require('../config/config.json');
const getStaff = require('../utils/functions.js');
const bot = require('../bot/bot.js');
const router = express.Router();

router.get('/', async (req, res) => {
	await getStaff(req, bot, config);
	res.render('index', {
		bot: bot,
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
	res.render('bots', {
		bot: bot,
		user: req.session.passport?.user || null,
	});
});

module.exports = router;