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
			default: 0
		},
		users: {
			type: Number,
			default: 0
		},
		shards: {
			type: Number,
			default: 0
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