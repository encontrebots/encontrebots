module.exports = (bot) => {
	const config = require('../config/config.json');
	const Database = require('./mongoWrapper');

	const db = new Database(config.database.uri, config.database.name);
	db.on('ready', () => {
		console.log('[MONGO] Estou pronta !'.yellow);
	});

	bot.db = db;
	bot.db.connect();
};