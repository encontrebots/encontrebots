const mongoose = require('mongoose');
const Schema = mongoose.Schema({
	userID: {
		type: String
	},
	alderayVoted: {
		type: Boolean,
	},
	lastVoted: {
		type: Number,
	},
});

module.exports = mongoose.model('User', Schema);