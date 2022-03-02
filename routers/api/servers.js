const express = require('express');
const bot = require('../../servers/bot');
const router = express.Router();

router.post('/add', async (req, res) => {
	const model = require('../../schemas/ServerSchema');
	await bot.getRESTGuild(req.body.server).catch(async () => {
		return res.redirect('https://discordapp.com/oauth2/authorize?client_id=948601322146517062&guild_id=' + req.body.server + '&scope=bot%20applications.commands&permissions=19473');
	});
	if (await model.findOne({ bot: req.body.server })) {
		res.redirect('/add?type=alderaysv');
	}
	else {
		await model.create({
			server: req.body.server,
			owner: req.session.passport?.user.id,
			descc: req.body.descc || 'Olá, sou um simples servidor para discord!',
			descl: req.body.descl || 'Olá, temos membros ativos e muito mais, deseja se juntar a nós?',
			invite: req.body.support,
			background: req.body.image || 'https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_29.png',
		});
	}
	return res.redirect('/servers/' + req.body.server);
});

router.post('/edit', async (req, res) => {
	const model = require('../../schemas/ServerSchema');
	const botDB = await model.findOne({ server: req.body.guildid });
	if (!botDB) {
		res.redirect(`/servers/${req.body.guildid}/edit?type=unknown`);
	}
	else {
		await model.findOneAndUpdate({ server: req.body.guildid }, {
			descc: req.body.descc || 'Olá, sou um simples servidor para discord!',
			descl: req.body.descl || 'Olá, temos membros ativos e muito mais, deseja se juntar a nós?',
			invite: req.body.support,
			background: req.body.image || 'https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_29.png',
		});
		res.redirect(`/servers/${req.body.guildid}/edit?type=editedsv`);
	}
});

router.post('/report', async (req, res) => {
	const guild = await bot.getRESTGuild(req.body.guildid);
	guild.owner = await bot.getRESTUser(guild.ownerID);
	const channel = await bot.getRESTChannel('939476624393502730');

	channel.createMessage('> <@&938801109995253780>\n⤷ Novo servidor reportado!\n\n**Guild:** ' + guild.name + '\n**Owner:** ' + guild.owner.username + '\n**ID:** ' + guild.id);
	res.redirect(`/servers/${req.body.guildid}?type=report`);
});

module.exports = router;