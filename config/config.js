module.exports = {
	'port': 3000,
	'discord': {
		'clientID': process.env.CLIENT_ID,
		'clientSecret': process.env.CLIENT_SECRET,
		'clientToken': process.env.CLIENT_TOKEN,
		'callbackURL': process.env.CALLBACK_URL,
		'serverToken': process.env.SERVER_TOKEN,
		'guild': {
			'id': '1119998748265828372',
			'roles': {
				'verifier': '1120003211797999637',
				'verifiedBot': '1120003895851229256',
				'developer': '1120003336247201823',
				'pendentBot': '1120003860841381898',
				'members': '1120003395491725363'
			},
			'channels': {
				'logs': '1120004180699009118',
				'randomBots': '1120415405928878233'
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