/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const colors = require('colors');

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('Connected to MongoDB'.blue);
	})
	.catch((err) => {
		console.error(`Error connecting to MongoDb ${err.message}`.red);
	});

module.exports = mongoose;
