exports.formatError = (error) => {
	return error.errors.reduce((acc, err) => {
		acc[err.path] = err.message;
		return acc;
	}, {});
};
