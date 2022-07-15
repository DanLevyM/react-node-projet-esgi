const { Model, DataTypes } = require('sequelize');
const connection = require('./db');
const ErrorResponse = require('../../utils/errorResponse');

class UsersFriends extends Model {}

UsersFriends.init(
	{
		user_low: {
			type: DataTypes.INTEGER,
			allowNull: false,
			require: true,
		},
		user_high: {
			type: DataTypes.INTEGER,
			allowNull: false,
			require: true,
		},
		status: {
			type: DataTypes.ENUM(
				'user_low_pending_request',
				'user_high_pending_request',
				'friends',
				'user_low_block_high',
				'user_high_block_low'
			),
			require: true,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		sequelize: connection,
		modelName: 'usersfriends',
	}
);

// To have a proper table and a clear friends status, we add users with lower id in
// column 1 and higher id in column 2
const checkUsersFriendsDatas = async (usersFriends) => {
	if (usersFriends.user_low === usersFriends.user_high)
		throw new ErrorResponse('Same id for sender and receiver', 422);

	if (usersFriends.user_low > usersFriends.user_high)
		throw new ErrorResponse('Internal friend request error', 422);
};

UsersFriends.addHook('beforeCreate', checkUsersFriendsDatas);
UsersFriends.addHook('beforeUpdate', checkUsersFriendsDatas);

module.exports = UsersFriends;
