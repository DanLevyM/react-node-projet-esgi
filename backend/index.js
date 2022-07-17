/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan');

const errorHandler = require('./server/middlewares/error');
const expressListRoutes = require('express-list-routes');

const UserRouter = require('./server/routes/users-router');
const SecurityRouter = require('./server/routes/security-router');
const AdminRouter = require('./server/routes/admin-router');
const RelationssRouter = require('./server/routes/friends-router');

const app = express();
app.use(express.json());

const PORT = process.env.SERVER_PORT || 3000;

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/v1/friends', RelationssRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/auth', SecurityRouter);
app.use('/api/v1/admin', AdminRouter);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
console.log(expressListRoutes(app));
