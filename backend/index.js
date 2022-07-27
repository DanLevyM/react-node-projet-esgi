/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./server/middlewares/error');

const UserRouter = require('./server/routes/users-router');
const SecurityRouter = require('./server/routes/security-router');
const AdminRouter = require('./server/routes/admin-router');
const ReportRouter = require('./server/routes/report-router');
const PostRouter = require('./server/routes/post-router');
const RelationsRouter = require('./server/routes/relations-router');
const AnalyticsRouter = require('./server/routes/analytics-router');
const AccessHash = require('./server/models/postgres/User');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT || 3001;

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}


app.post('/api/reset-password', async (req, res) => {
	const { email } = req.body;
	// const user = await User.resetPassword(email);
	// res.send(user);

	try {
		// utiliser le model User pour récupérer l'utilisateur avec l'email
		const user = await user.find({email});
		if (!user) {
			return res.status(404).send({message: 'User not found'});
		}
		// générer un nouveau mot de passe hashé
		const hasHash = await AccessHash.find({userId: user.id});
		if (hasHash) {
			return res.status(200).send({message: 'un Email de réinitialisation à deja été envoyé'}); 
		}
		// nouveau mot de passe hashé à envoyer par email à l'utilisateur
		const hash = new AccessHash({userId: user.id});
		await hash.save();
		await sendResetPasswordEmail();

		//  send an email
		return res.json({message: 'un Email de réinitialisation à été envoyé'});
	}catch{
		return res.status(500).send({message: 'Internal server error'});
	}

});

app.use('/api/v1/friends', RelationsRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/auth', SecurityRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/report', ReportRouter);
app.use('/api/v1/home', PostRouter);
app.use('/api/v1/analytics', AnalyticsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// Uncomment to check routes
const expressListRoutes = require('express-list-routes');
const { sendResetPasswordEmail } = require('./server/mailer');
expressListRoutes(app);
