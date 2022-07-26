const { Model, DataTypes } = require('sequelize');
const connection = require('./db');

class Post extends Model {}

Post.init(
	{
		user_name: {
			type: DataTypes.STRING,
			allowNull: false,
			require: true,
		},
		user_post: {
			type: DataTypes.INTEGER,
			allowNull: false,
			require: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: true,
			require: false
		},
	},
	{
		sequelize: connection,
		modelName: 'post',
	}
);

module.exports = Post;
