const { Model, DataTypes } = require('sequelize');
const connection = require('./db');

class Post extends Model {}

Post.init(
	{
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
