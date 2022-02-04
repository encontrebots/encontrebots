const mongoose = require('mongoose');
const config = require('../config/config.js');
mongoose.connect(config.database.uri, () => {
	console.log('[MONGO] Estou pronta !'.yellow);
});