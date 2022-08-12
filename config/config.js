module.exports = {
	'port': 3000,
	'discord': {
		'clientID': process.env.CLIENT_ID,
		'clientSecret': process.env.CLIENT_SECRET,
		'clientToken': process.env.CLIENT_TOKEN,
		'callbackURL': process.env.CALLBACK_URL,
		'serverToken': process.env.SERVER_TOKEN,
		'guild': {
			'id': '884494431334563871',
			'roles': {
				'verifier': '954508289390039131',
				'verifiedBot': '884897535989256293',
				'developer': '1007623946704781414',
				'pendentBot': '1007623311104147606'
			},
			'channels': {
				'logs': '954509369251360789',
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