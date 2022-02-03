const express = require('express');
const bot = require('../bot/bot.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        bot: bot,
		user: req.session.passport?.user || null,
	});
});

router.get('/@me', (req, res) => {
    res.render('@me', {
        bot: bot,
		user: req.session.passport?.user || null,
	});
});

router.get('/bots', (req, res) => {
    res.render('bots', {
        bot: bot,
		user: req.session.passport?.user || null,
	});
});

module.exports = router;