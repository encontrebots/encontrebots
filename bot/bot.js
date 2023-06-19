const config = require('../config/config.js');
const Eris = require('eris');
const bot = new Eris.Client('Bot ' + config.discord.clientToken, {
	restMode: true,
	intents: ['all'],
	defaultImageSize: 4096
});

bot.eris = Eris;

bot.on('ready', async () => {
	console.log('[BDD] Estou pronto!'.green);
	require('../database/mongoConnect.js');
	const DatabaseManager = require('denky-database');
	bot.db = new DatabaseManager('./database/db.json');
});

bot.on('guildMemberAdd', async (guild, member) => {
	if (guild.id !== config.discord.guild.id) return;
	if (member.bot) {
		const model = require('../schemas/BotSchema');
		const data = await model.findOne({ bot: member.id });
		if (!data) {
			member.addRole(config.discord.guild.roles.verifiedBot);
		}
		else if (data.status === 'pending') {
			member.addRole(config.discord.guild.roles.pendentBot);
		}
	}
	else {
		const model = require('../schemas/BotSchema');
		const data = await model.findOne({ owner: member.id });
		if (data) {
			member.addRole(config.discord.guild.roles.developer);
		}
		else if(!data) {
			member.addRole(config.discord.guild.roles.members);
		}
	}
});

bot.on('disconnect', async () => {
	await bot.connect();
});

bot.connect();
module.exports = bot;