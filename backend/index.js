/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./server/middlewares/error');

const UserRouter = require('./server/routes/users-router');
const SecurityRouter = require('./server/routes/security-router');
const AdminRouter = require('./server/routes/admin-router');
const ReportRouter = require('./server/routes/report-router');
const RelationsRouter = require('./server/routes/relations-router');
const AnalyticsRouter = require('./server/routes/analytics-router');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT || 3001;

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const server = require('http').Server(app);
const io = new Server(server);


app.use('/api/v1/friends', RelationsRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/auth', SecurityRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/report', ReportRouter);
app.use('/api/v1/analytics', AnalyticsRouter);

app.use(errorHandler);

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
	});
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});



// Uncomment to check routes
const expressListRoutes = require('express-list-routes');
expressListRoutes(app);
