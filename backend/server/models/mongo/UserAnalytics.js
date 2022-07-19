const mongoose = require('./db.js');

const UserAnaliticsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: false,
	},
});

const UserAnalitics = mongoose.model('UserAnalitics', UserAnaliticsSchema);

module.exports = UserAnalitics;
