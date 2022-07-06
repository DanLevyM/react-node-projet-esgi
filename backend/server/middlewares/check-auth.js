const { verifyToken } = require("../lib/tokenManager.js");

module.exports = async (req, res, next) => {
	const auth = req.headers.authorization;
	console.log("============================ headers.auth: ", auth);
	console.log("============================ auth: ", auth);
	if (!auth) {
		console.log("no auth");
		return res.sendStatus(401);
	}
	const [type, token] = auth.split(" ");
	if (type !== "Bearer") {
		return res.sendStatus(401);
	}
	try {
		const decoded = await verifyToken(token);
		console.log(`DECODED : ${JSON.stringify(decoded)}`);
		req.user = decoded;
		console.log(`DECODED : ${JSON.stringify(req.user)}`);
		next();
	} catch (error) {
		return res.sendStatus(401);
	}
};
