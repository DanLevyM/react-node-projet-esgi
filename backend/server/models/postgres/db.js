/* eslint-disable no-undef */
const Sequelize = require('sequelize');

const DB_URL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_URL}/${process.env.POSTGRES_DB}`;
const connection = new Sequelize(DB_URL, {
	useNewUrlParser: true,
});

connection.authenticate().then(() => {
	console.log('Connected to Postgresql');
});

module.exports = connection;
