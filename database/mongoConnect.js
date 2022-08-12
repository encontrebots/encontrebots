// const bot = require('../bot/bot.js');
const mongoose = require('mongoose');
const config = require('../config/config.js');
mongoose.connect(config.database.uri, async () => {
	/*
	async function randomBot () {
		const canal = await bot.getRESTChannel('1007627004910252032');
		const model = require('../schemas/BotSchema');
		const bots = await model.find({});
		const boti = bots[Math.floor(Math.random() * bots.length)];
		if (boti === undefined) return;
		const userinfo = await bot.getRESTUser(boti.bot);
		const embed = {
			title: `Random Bot | ${userinfo.username}`,
			description: boti.descc,
			url: `${process.env.URL}/bots/` + boti.bot,
			color: 0x3498DB,
			thumbnail: {
				url: userinfo.avatarURL
			},
			fields: [
				{
					name: 'Website',
					value: boti.website || 'https://botsdediscord.herokuapp.com/bots/' + boti.bot,
					inline: true
				},
				{
					name: 'Support',
					value: boti.support || 'https://botsdediscord.herokuapp.com/bots/' + boti.bot + '/discord',
					inline: true
				}
			]
		};
		canal.createMessage({ embeds: [embed] }).then((msg) => {
			setTimeout(async () => {
				await msg.delete();
			}, 60000);
		});
	}
	await randomBot();
	setInterval(async () => {
		await randomBot();
	}, 60000);
	*/
	console.log('[MONGO] Estou pronta!'.yellow);
});