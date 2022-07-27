import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { generateKey } from '../utils/string';


import UserContext from '../context/UserContext';
import { userIsAuth, userRole } from '../utils/local-storage';

const Post = ({ el, index }) => {
	const { user, authUser } = useContext(UserContext);
  

	return (
		<div
			key={generateKey('div', index)}
			className='d-flex flex-column text-wrap p-3 m-2 border shadow rounded bg-info w-75 mx-auto'
		>
			<h5 className=''>{el.user_name}</h5>
			<p key={generateKey('text', index)} className=''>
				{el.content}
			</p>
		</div>
	);
};

Post.propTypes = {
	el: PropTypes.object,
  index: PropTypes.number
};

export default Post;
