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
	status: {
		type: String,
		default: 'pending'
	},
	owner: {
		type: String
	}
});

module.exports = mongoose.model('Bot', Schema);