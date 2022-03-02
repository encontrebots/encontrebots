const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/callback', passport.authenticate('discord', { prompt: 'none', failureRedirect: '/' }), async function(req, res) {
	if (!req.user.id || !req.user.guilds) {
		res.redirect('/');
	}
	else {res.redirect('/');}
});

router.post('/stats/bots', async (req, res) => {
	const model = require('../schemas/BotSchema');
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

module.exports = router;