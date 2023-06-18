module.exports = {
	'port': 3000,
	'discord': {
		'clientID': process.env.CLIENT_ID,
		'clientSecret': process.env.CLIENT_SECRET,
		'clientToken': process.env.CLIENT_TOKEN,
		'callbackURL': process.env.CALLBACK_URL,
		'serverToken': process.env.SERVER_TOKEN,
		'guild': {
			'id': '938779759658287175',
			'roles': {
				'verifier': '938801159810990150',
				'verifiedBot': '938800923776516147',
				'developer': '938800917262794832',
				'pendentBot': '938800924321804318'
			},
			'channels': {
				'logs': '938845976217661450',
			}
		}
	},
	'server': {
		'secret': process.env.SECRET
	},
	'database': {
		'uri': process.env.MONGO,
		'name': 'bdd'
	},
	'oauth2': {
		'prompt': 'none',
		'scopes': ['identify', 'guilds']
	},
	'tags': [
		'Levels',
		'Moderação',
		'Social',
		'Diversão',
		'Economia',
		'Música',
		'Anime',
		'Multiidioma',
		'Logs'
	]
};