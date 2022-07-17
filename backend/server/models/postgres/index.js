exports.connection = require('./db');
exports.User = require('./User');
exports.UsersRelations = require('./UsersRelations');

exports.User.belongsToMany(exports.User, {
	as: 'user_low',
	foreignKey: 'user_low',
	through: exports.UsersRelations,
});
exports.User.belongsToMany(exports.User, {
	as: 'user_high',
	foreignKey: 'user_high',
	through: exports.UsersRelations,
});

// exports.Article = require("./Article");
// const { ArticleMongo, Article } = require("../mongo");
// const User = require("./User");

// exports.User.hasMany(exports.Article);
// exports.Article.belongsTo(exports.User, { as: "owner" });

// function denormalizeArticle(article) {
// 	Article.findOne({
// 		where: {
// 			id: article.id,
// 		},
// 		include: [{ model: User, as: "owner", attributes: ["id", "firstName"] }],
// 	}).then(async (article) => {
// 		await ArticleMongo.findOneAndUpdate(
// 			{ _id: article.id },
// 			{
// 				_id: article.id,
// 				...article,
// 			},
// 			{
// 				upsert: true,
// 			}
// 		);
// 	});
// }

// exports.Article.addHook("afterCreate", denormalizeArticle);
// exports.Article.addHook("afterUpdate", denormalizeArticle);
// exports.Article.addHook("afterDestroy", (article) => {
// 	ArticleMongo.deleteOne({ _id: article.id });
// });
