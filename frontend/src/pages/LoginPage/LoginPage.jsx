import React, { useContext, Component  } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoOrganization } from 'react-icons/go';

import classes from './LoginPage.module.css';
import { signInUser } from '../../api/security.api';
import UserContext from '../../context/UserContext.jsx';

import LoginModal from '../../component/Modal/LoginModal';
import RegisterModal from '../../component/Modal/RegisterModal';

const LoginPage = () => {


	return (
		<div className={classes.container}>
			<div className={classes.center}>
				<GoOrganization size={32} />
				<h1 className={classes.h1}>Ça se passe maintenant</h1>
				<h2 className={classes.h2}>Rejoignez nous dès aujourd&#39;hui</h2>
				<div className={classes.btnContainer}>
					<div className={classes.btnRegister}>
						<RegisterModal />
					</div>
					<p className={classes.p}>Vous avec déjà un compte ?</p>
					<LoginModal />
				</div>
			</div>
			{/* <button onClick={getUsersList}>Load</button> */}
		</div>
	);
};

export default LoginPage;
