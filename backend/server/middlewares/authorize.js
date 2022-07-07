const ErrorResponse = require("../utils/errorResponse");

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new ErrorResponse("Not authorized", 401));
		}
		next();
	};
};
