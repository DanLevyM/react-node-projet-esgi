const mongoose = require('./db.js');

const UserAnaliticsSchema = new mongoose.Schema({
	role: {
		type: String,
		required: false,
		unique: false,
	},
	technologies: [
		{
			type: String,
			required: false,
			unique: false,
		},
	],
});

const UserAnalitics = mongoose.model('UserAnalitics', UserAnaliticsSchema);

module.exports = UserAnalitics;
