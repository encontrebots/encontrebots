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

router.get('/:id', async (req, res) => {
	await getStaff(req, bot, config);
	const botDB = await bot.db.get(`bot-${req.params.id}`);
	if (!botDB) {
		res.redirect('/');
	}
	res.render('viewbot', {
		boti: botDB,
		bot: bot,
		user: req.session.passport?.user || null,
	});
});

router.get('/:id/add', async (req, res) => {
	res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.params.id}&permissions=8&scope=bot%20applications.commands`);
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