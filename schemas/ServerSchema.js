const mongoose = require('mongoose');
const Schema = mongoose.Schema({
	server: {
		type: String
	},
	owner: {
		type: String
	},
	descc: {
		type: String
	},
	descl: {
		type: String
	},
	invite: {
		type: String
	},
	background: {
		type: String
	},
	bump: {
		type: Number,
	}
});

module.exports = mongoose.model('Server', Schema);