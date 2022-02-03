const config = require('../config/config.json');
const Eris = require('eris');
const bot = new Eris.Client(config.discord.clientToken, {
	restMode: true,
	intents: ['all'],
	defaultImageSize: 4096
});

bot.eris = Eris;

bot.on('ready', async () => {
	console.log('[BOT] Estou pronto!'.green);
	require('../database/mongoConnect.js')(bot);
});

bot.on('guildMemberAdd', async (guild, member) => {
	if (guild.id !== config.discord.guild.id) return;
	if (member.bot) {
		member.addRole(config.discord.guild.roles.pendentBot);
	}
	const devDB = await bot.db.get(`developer-${member.id}`);
	if (devDB) {
		member.addRole(config.discord.guild.roles.developer);
	}
});

bot.connect();
module.exports = bot;