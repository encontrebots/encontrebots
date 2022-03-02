const config = require('../config/config.js');
const { Client } = require('eris');
const bot = new Client('Bot ' + config.discord.serverToken, {
	restMode: true,
	intents: ['all'],
	defaultImageSize: 4096
});

bot.on('ready', async () => {
	console.log('[SERVERS] Estou pronto!'.green);
});

bot.on('interactionCreate', async (interaction) => {
	if (interaction.data.name === 'bump') {
		const model = require('../schemas/ServerSchema');
		const data = await model.findOne({ server: interaction.channel.guild.id });
		const OneHour = 60 * 60 * 1000;
		const TwoHour = 2 * OneHour;
		const timeDiff = Date.now() - data.bump;
		if (timeDiff < TwoHour) {
			return interaction.createMessage({
				embeds: [
					{
						title: ':x: | Você não pode impulsionar mais de uma vez por 2 horas!',
						color: 0xFF0000,
						description: 'Você pode usar isso novamente em `' + Math.round((TwoHour - timeDiff) / 1000) + '` segundos.'
					}
				]
			});
		}
		else {
			data.bump = Date.now();
			data.save();
		}
	}
});

bot.connect();
module.exports = bot;