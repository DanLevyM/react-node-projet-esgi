const ErrorResponse = require('../utils/errorResponse');
const { formatError } = require('../utils/formatError');

const errorHandler = (err, req, res) => {
	let error = { ...err };

	// console.log('ERROR HANDLER =============', err);

	if (err.name === 'SequelizeValidationError') {
		// add log for err.message
		const msg = JSON.stringify(formatError(err));
		error = new ErrorResponse(msg, 422);
	}

	if (err.name === 'SequelizeUniqueConstraintError')
		error = new ErrorResponse('Unique constraint Error', 422);

	if (err.name === 'SequelizeDatabaseError')
		error = new ErrorResponse('Database error', 422);

	if (err.name === 'Error') error = new ErrorResponse(err.message, 422);

	res
		.status(error.statusCode || 500)
		.json({ message: error.message || 'Server error' });
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
