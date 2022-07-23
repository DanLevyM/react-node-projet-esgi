import React, {useContext, useState} from "react";
import "./Modal.css";
import { useNavigate } from 'react-router-dom';

import { signInUser } from '../../api/security.api';
import UserContext from '../../context/UserContext.jsx';

export default function LoginModal() {
    const [modal, setmodal] = useState(false);

    const toggleModal = () => setmodal(!modal);

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
			console.log(res);
			localStorage.setItem('isAuth', true);
			localStorage.setItem('token', res.token);
			authUser(true);
		} catch (e) {
			console.error(e);
		}

		nav('/home');
	};

    return (
        <div>
            <button className="btnLogin" onClick={(toggleModal)}>
            Se Connecter
            </button>
            {modal && (
                <form onSubmit={handleLoginForm}>
                    <div  className="modal">
                        <div  className="modal-dialog" role="document">
                            <div  className="modal-content">
                                <div  className="modal-header text-center">
                                    <h4  className="modal-title w-100 font-weight-bold">Se Connecter</h4>
                                    <button type="button"  onClick={toggleModal} className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div  className="modal-body mx-3">
                                    <div  className="md-form mb-5">
                                    <label htmlFor='email'>Email</label>
                                    <input
                             			type='text'
                             			placeholder='user@gmail.com'
                             			name='email'
                             			defaultValue='user1@gmail.com'
                             		/>
                                    </div>

                                    <div  className="md-form mb-4">
                                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Mot de Passe</label>
                                    <input type='text' placeholder='Your password' name='password' />
                                    
                                    </div>

                                </div>
                                <div  className="modal-footer d-flex justify-content-center" onClick={toggleModal} >
                                    <button className="btn btn-default">Se Connecter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
            
        </div>
    )
}