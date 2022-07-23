import React, {useContext, useState} from "react";
import "./Modal.css";

import { registerUser } from '../../api/security.api';

export default function RegisterModal() {
    const [modal, setmodal] = useState(false);

    const toggleModal = () => setmodal(!modal);

    const handleRegisterForm = async (e) => {
        e.preventDefault();

        const postData = JSON.stringify({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
        });

        registerUser(postData);
    };

    return (
        <div>
            <button className="btnRegister" onClick={(toggleModal)}>
            S&apos;inscrire
            </button>
            {modal && (
                <form onSubmit={handleRegisterForm}>
                    <div  className="modal">
                        <div  className="modal-dialog" role="document">
                            <div  className="modal-content">
                                <div  className="modal-header text-center">
                                    <h4  className="modal-title w-100 font-weight-bold">S&apos;inscrire</h4>
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
                                    <button className="btn btn-default">S&apos;inscrire</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}