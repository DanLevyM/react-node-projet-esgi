import React from 'react';

const ResetPassword = () => {

  const getEmail = () => {
    // recuperer l'email de l'utilisateur
    const email = localStorage.getItem('email');
  }

  return (
    <form onSubmit={getEmail}>
      Reset Password
      <div className='container'>
        <label htmlFor='email'>Email</label>
        <input type='text' placeholder='user@gmail.com' />
      </div>
      <button type='submit'>Envoyer</button>
    </form>
  );
};

export default ResetPassword;