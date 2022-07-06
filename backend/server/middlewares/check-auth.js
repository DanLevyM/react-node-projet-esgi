const { verifyToken } = require("../lib/token-manager.js");

module.exports = async (req, res, next) => {
	const auth = req.headers.authorization;
	if (!auth) {
		return res.sendStatus(401);
	}
	const [type, token] = auth.split(" ");
	if (type !== "Bearer") {
		return res.sendStatus(401);
	}
	try {
		const decoded = await verifyToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		return res.sendStatus(401);
	}
};
