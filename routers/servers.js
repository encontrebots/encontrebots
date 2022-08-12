const express = require('express');
const bot = require('../servers/bot.js');
const markdown = require('markdown-it')();
const router = express.Router();

router.get('/', async (req, res) => {
	const model = require('../schemas/ServerSchema');
	const servers = await model.find({ status: 'verified' });
	for (let i = 0; i < servers.length; i++) {
		const serverInfo = await bot.getRESTGuild(servers[i].server) || null;
		servers[i].name = serverInfo.name;
		servers[i].icon = serverInfo.iconURL;
	}
	// ordenar os servidores por bumpados recentemente
	const guilds = servers.sort((a, b) => {
		return b.bump - a.bump;
	});
	res.render('servers/index', {
		bot: bot,
		servers: guilds,
		user: req.session.passport?.user || null,
	});
});

router.get('/add', async (req, res) => {
	if (!req.session.passport?.user) {
		res.redirect('/');
	}
	const guilds = req.session.passport.user.guilds;
	const guildArray = [];
	guilds.forEach(async (guild) => {
		if (guild.permissions & 32) {
			guildArray.push(guild);
		}
	});
	res.render('servers/addserver', {
		bot: bot,
		servers: guildArray,
		user: req.session.passport?.user || null,
	});
});

router.get('/:id', async (req, res) => {
	const model = require('../schemas/ServerSchema');
	const botDB = await model.findOne({ server: req.params.id });

	if (!botDB) {
		return res.sendStatus(404);
	}

	const botuser = await bot.getRESTGuild(req.params.id).catch(async (e) => {
		console.log(e);
	});

	botDB.icon = botuser.iconURL;
	botDB.name = botuser.name;
	botDB.guild = botuser;
	const dono = await bot.getRESTUser(botDB.owner);
	botDB.dono = dono;

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
	res.render('servers/viewserver', {
		serveri: botDB,
		botDesc: markdown.render(botDB.descl),
		bot: bot,
		serverOwner: botOwner,
		user: req.session.passport?.user || null,
	});
});

router.get('/:id/edit', async (req, res) => {
	const model = require('../schemas/ServerSchema');
	const botDB = await model.findOne({ bot: req.params.id });
	if (!botDB) {
		res.redirect('/');
	}
	if (req.session.passport?.user.id !== botDB.owner) {
		res.redirect('/');
	}
	const guild = await bot.getRESTGuild(req.params.id);
	botDB.guild = guild;
	res.render('servers/editserver', {
		bot: bot,
		serveri: botDB,
		user: req.session.passport?.user || null,
	});
});

module.exports = router;