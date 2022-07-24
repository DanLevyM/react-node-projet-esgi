import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoOrganization } from 'react-icons/go';

import { signInUser } from '../api/security.api';
import UserContext from '../context/UserContext.jsx';

const LoginPage = () => {
	const nav = useNavigate();
	const { authUser } = useContext(UserContext);

	const handleLoginForm = async (e) => {
		e.preventDefault();

		const postData = JSON.stringify({
			email: e.target.elements.email.value,
			password: e.target.elements.password.value,
		});

		try {
			const res = await signInUser(postData);
			if (res.code === 200) {
				localStorage.setItem('isAuth', true);
				localStorage.setItem('token', res.token);
				localStorage.setItem('role', res.role);
				authUser(true, res.role);
			} else {
				console.error('Sign in failed !');
			}
		} catch (e) {
			console.error(e);
		}

		nav('/');
	};

	return (
		<div>
			<div>
				<GoOrganization size={32} />
				<h1>Ça se passe maintenant</h1>
				<h2>Rejoignez nous dès aujourd&#39;hui</h2>
				<div>
					<div>S&#39;inscrire avec une adresse mail</div>
					<p>Vous avec déjà un compte ?</p>
					<div>Se connecter</div>
				</div>
			</div>
			{/* <button onClick={getUsersList}>Load</button> */}
			<form onSubmit={handleLoginForm}>
				LoginPage
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						placeholder='user@gmail.com'
						name='email'
						defaultValue='admin@gmail.com'
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input type='text' placeholder='Your password' name='password' />
				</div>
				<button type='submit'>Sign In</button>
			</form>
		</div>
	);
};

export default LoginPage;
