const express = require('express');
const passport = require('passport');
const config = require('../config/config.json');
const bot = require('../bot/bot');
const router = express.Router();

router.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), async function(req, res) {
	if (!req.user.id || !req.user.guilds) {
		res.redirect('/');
	}
	else {res.redirect('/dashboard');}
});

router.post('/bots/add', async (req, res) => {
	const user = await bot.getRESTUser(req.body.botid).catch(() => {
		return res.redirect('/bots/add?type=botnotfound');
	});
	if (!user.bot) {
		return res.redirect('/bots/add?type=botnotfound');
	}
	else {
		const botDB = await bot.db.get(`bot-${req.body.botid}`);
		if (botDB) {
			return res.redirect('/bots/add?type=botalreadyadded');
		}
		else {
			let bots = await bot.db.get('bots');
			await bot.db.set(`bot-${req.body.botid}`, {
				id: req.body.botid,
				name: user.username,
				avatar: user.avatarURL,
				descc: req.body.descc || 'Um bot incrivel com funcionalidades únicas',
				descl: req.body.descl || `Um bot incrivel com funcionalidades únicas, conheça ${user.username}`,
				tags: req.body.tags,
				prefix: req.body.prefix,
				owner: req.session.passport?.user || null,
				status: 'pending',
				date: Date.now(),
			});
			if (!bots) {
				await bot.db.set('bots', [
					{
						id: req.body.botid,
						name: user.username,
						avatar: user.avatarURL,
						descc: req.body.descc || 'Um bot incrivel com funcionalidades únicas',
						descl: req.body.descl || `Um bot incrivel com funcionalidades únicas, conheça ${user.username}`,
						tags: req.body.tags,
						prefix: req.body.prefix,
						owner: req.session.passport?.user || null,
						status: 'pending',
						date: Date.now(),
					}
				]);
			}
			else {
				await bot.db.push('bots', {
					id: req.body.botid,
					name: user.username,
					avatar: user.avatarURL,
					descc: req.body.descc || 'Um bot incrivel com funcionalidades únicas',
					descl: req.body.descl || `Um bot incrivel com funcionalidades únicas, conheça ${user.username}`,
					tags: req.body.tags,
					prefix: req.body.prefix,
					owner: req.session.passport?.user || null,
					status: 'pending',
					date: Date.now(),
				});
			}
		}
		const channel = await bot.getRESTChannel(config.discord.guild.channels.logs);
		const devDB = await bot.db.get(`developer-${req.session.passport?.user.id}`);
		if (!devDB) {
			await bot.db.set(`developer-${req.session.passport?.user.id}`, true);
		}
		channel.createMessage(`:white_check_mark: <@${req.session.passport?.user.id}> **|** O Bot **${user.username}** foi adicionado com sucesso. | <@&${config.discord.guild.roles.verifier}>`);
		setTimeout(() => {
			res.redirect('/?type=botadded');
		}, 3000);
	}
});

module.exports = router;