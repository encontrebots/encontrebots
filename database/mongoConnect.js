const bot = require('../bot/bot.js');
const mongoose = require('mongoose');
const config = require('../config/config.js');
const DatabaseManager = require('denky-database');
bot.db2 = new DatabaseManager('./database.json');

mongoose.connect(config.database.uri, async () => {
	async function randomBot () {
		const canal = await bot.getRESTChannel(config.discord.guild.channels.randomBots);
		const model = require('../schemas/BotSchema');
		const bots = await model.find({});
		if (bots.length === 0) return console.log('[MONGO] Nenhum bot encontrado'.red);
		const boti = bots[Math.floor(Math.random() * bots.length)];
		const userinfo = await bot.getRESTUser(boti.bot);
		const embed = {
			title: `${userinfo.username}`,
			description: boti.descc,
			url: 'https://botsdediscord.xyz/bots/' + boti.bot,
			color: 0x3498DB,
			thumbnail: {
				url: userinfo.avatarURL
			},
			fields: [
				{
					name: 'Website',
					value: boti.website || 'https://botsdediscord.xyz/bots/' + boti.bot,
					inline: true
				},
				{
					name: 'Suporte',
					value: boti.support || 'https://botsdediscord.xyz/bots/' + boti.bot + '/discord',
					inline: true
				}
			]
		};
		const message = await bot.db2.get('randomBot');
		if (message) {
			const msg = await canal.getMessage(message);
			msg.edit({ content: `⏰ Proxima atualização em: <t:${Math.floor(Date.now() / 1000) + 60}:R>.`, embeds: [embed] }).catch(() => {});
		}
		else {
			const messages = await canal.getMessages();
			if (messages.length > 0) {
				await canal.deleteMessages(messages.map((m) => m.id));
			}
			await canal.createMessage({ content: '<:bsystem:1120419940894244915> **Bots Aleatórios**\n- A cada **1 minuto** a mensagem abaixo será atualizada com uma opção de bot diferente para você adicionar em seu servidor!' }).catch(() => {});
			await canal.createMessage({ content: `⏰ Proxima atualização em: <t:${Math.floor(Date.now() / 1000) + 60}:R>.`, embeds: [embed] }).then(async (msg) => {
				await bot.db2.set('randomBot', msg.id);
			}).catch(() => {});
		}
	}
	await randomBot();
	setInterval(async () => {
		await randomBot();
	}, 60000);
	console.log('[MONGO] Estou pronta !'.yellow);
});