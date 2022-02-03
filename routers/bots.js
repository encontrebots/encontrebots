const express = require('express');
const config = require('../config/config.json');
const getStaff = require('../utils/functions.js');
const bot = require('../bot/bot.js');
const router = express.Router();

router.get('/', async (req, res) => {
	await getStaff(req, bot, config);
	res.render('bot', {
		user: req.session.passport?.user || null,
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

module.exports = router;