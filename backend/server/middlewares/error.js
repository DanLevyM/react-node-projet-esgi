const ErrorResponse = require('../utils/errorResponse');
const { formatError } = require('../utils/formatError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	console.log(err.stack);

	// ---------------------------------------------------------
	// ------------------ MONGO ERRORS ----------------------
	// ---------------------------------------------------------
	if (err.name === 'CastError') {
		const message = `${err.value} not found! Wrong format.`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	// ---------------------------------------------------------
	// ----------------- SEQUELIZE ERRORS ----------------------
	// ---------------------------------------------------------
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
