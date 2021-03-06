/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error(`Error connecting to MongoDb ${err.message}`);
	});

module.exports = mongoose;
