/* eslint-disable no-undef */
const Sequelize = require('sequelize');

// const DB_URL = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_URL}/${process.env.MYSQL_DB}`;

const connection = new Sequelize(
	process.env.MYSQL_DB,
	process.env.MYSQL_USER,
	process.env.MYSQL_PWD,
	{
		dialect: 'mysql',
		dialectOptions: {
			host: 'db',
		},
	}
);

connection.authenticate().then(() => {
	console.log('Connected to MySQL');
});

module.exports = connection;
