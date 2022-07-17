const ErrorResponse = require('../utils/errorResponse');
const { formatError } = require('../utils/formatError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	console.log('ERROR HANDLER =============', err);

	if (err.name === 'SequelizeValidationError') {
		// add log for err.message
		const msg = JSON.stringify(formatError(err));
		error = new ErrorResponse(msg, err.statusCode);
	}

	if (err.name === 'SequelizeUniqueConstraintError')
		error = new ErrorResponse('Unique constraint Error', err.statusCode);

	if (err.name === 'SequelizeDatabaseError')
		error = new ErrorResponse('Database error', err.statusCode);

	if (err.name === 'Error')
		error = new ErrorResponse(err.message, err.statusCode);

	res
		.status(error.statusCode || 500)
		.json({ message: error.message || 'Server error! Try again.' });
};

module.exports = errorHandler;

/**
 * LEN
 * SequelizeValidationError
 * Validation error: Validation len on password failed
 *
 * unique
 * SequelizeUniqueConstraintError
 * Validation error
 */
