const mongoose = require('mongoose');
const Schema = mongoose.Schema({
	bot: {
		type: String
	},
	avatar: {
		type: String
	},
	descc: {
		type: String
	},
	descl: {
		type: String
	},
	prefix: {
		type: String
	},
	support: {
		type: String
	},
	website: {
		type: String
	},
	tags: {
		type: Array
	},
	apikey: {
		type: String
	},
	stats: {
		type: Object,
		servers: {
			type: Number,
		},
		users: {
			type: Number,
		},
		shards: {
			type: Number,
		},
		default: {
			servers: 0,
			users: 0,
			shards: 0,
		}
	},
	status: {
		type: String,
		default: 'pending'
	},
	votes: {
		type: Number,
		default: 0
	},
	owner: {
		type: String
	}
});

module.exports = mongoose.model('Bot', Schema);