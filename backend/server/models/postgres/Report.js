const { Model, DataTypes } = require('sequelize');
const connection = require('./db');

class Report extends Model {}

Report.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			require: true,
		},

		user_id_reported: {
			type: DataTypes.INTEGER,
			allowNull: false,
			require: true,
		},
		reason: {
			type: DataTypes.ENUM('Harcelement','Faux profil', 'Comportement négatif', 'Autre'),
			allowNull: false,
			require: true
		},

		comment: {
			type: DataTypes.STRING,
			allowNull: true,
			require: false
		},
	},
	{
		sequelize: connection,
		modelName: 'report',
	}
);

module.exports = Report;
