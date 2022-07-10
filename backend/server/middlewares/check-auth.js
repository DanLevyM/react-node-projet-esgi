const { verifyToken } = require("../lib/token-manager.js");
const User = require("../models/postgres/User");

module.exports = async (req, res, next) => {
	const auth = req.headers.authorization;
	if (!auth) {
		return res.sendStatus(401);
	}
	console.log(auth);
	const [type, token] = auth.split(" ");
	if (type !== "Bearer") {
		return res.sendStatus(401);
	}

	const tokenInDb = await User.findOne({ where: { token: token } });
	if (!tokenInDb) return res.status(403).json({ error: "Not found" });

	try {
		const decoded = await verifyToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		return res.sendStatus(401);
	}
};
