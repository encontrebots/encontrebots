const config = require('../config/config.js');
const Eris = require('eris');
const bot = new Eris.Client(config.discord.clientToken, {
	restMode: true,
	intents: ['all'],
	defaultImageSize: 4096
});

bot.eris = Eris;

bot.on('ready', async () => {
	console.log('[BOT] Estou pronto!'.green);
	require('../database/mongoConnect.js');
	const DatabaseManager = require('denky-database');
	bot.db = new DatabaseManager('./database/db.json');
	setInterval(async () => {
		const channel = await bot.getRESTChannel('944179728556904478');
		channel.createMessage('>>> **[RAM] |** `' + Math.round(process.memoryUsage().rss / 1000000) + 'mb`');
	}, 3000);
});

bot.on('guildMemberAdd', async (guild, member) => {
	if (guild.id !== config.discord.guild.id) return;
	if (member.bot) {
		member.addRole(config.discord.guild.roles.verifiedBot);
	}
	else {
		const model = require('../schemas/BotSchema');
		const data = await model.findOne({ owner: member.id });
		if (data) {
			member.addRole(config.discord.guild.roles.developer);
		}
	}
});

bot.on('disconnect', async () => {
	await bot.connect();
});

bot.connect();
module.exports = bot;