const ErrorResponse = require("../utils/errorResponse");

exports.authorize = (...roles) => {
	return (req, res, next) => {
		console.log("ROLES::========", ...roles);
		console.log("REQ USER ROLE =====", req.user.role);
		if (!roles.includes(req.user.role)) {
			return next(new ErrorResponse("Not authorized", 401));
		}
		next();
	};
};
