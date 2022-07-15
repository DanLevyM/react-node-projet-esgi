exports.formatError = (error) => {
	console.log('===========3=3=3=3=3=3==', error, typeof error);
	return error.errors.reduce((acc, err) => {
		acc[err.path] = err.message;
		return acc;
	}, {});
};
