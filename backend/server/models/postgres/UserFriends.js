const { Model, DataTypes } = require('sequelize');
const connection = require('./db');

class UserFriends extends Model {}

UserFriends.init(
	{
		user_id: DataTypes.BIGINT,
		friend_id: DataTypes.BIGINT,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		sequelize: connection,
		modelName: 'userfriends',
	}
);

module.exports = UserFriends;
