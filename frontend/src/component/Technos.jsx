import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { getMe, updateMe } from '../api/users.api';

const technosList = [
	'React',
	'NodeJS',
	'PHP',
	'C',
	'C++',
	'C#',
	'F#',
	'Ruby',
	'MySQL',
	'PostgreSQL',
	'Angular',
];

const theStyle = {
	border: '1px solid rgba(81, 203, 238, 1)',
	'box-shadow': '0 0 5px rgba(81, 203, 238, 1)',
};

const Technos = ({ open }) => {
	const { authUser } = useContext(UserContext);
	const nav = useNavigate();
	const [technos, setTechnos] = useState([]);
	const [user, setUser] = useState([]);
	const [isLoading, setIsLoading] = useState([]);

	const handleChange = (event) => {
		const checkboxValue = event.target.value;
		const indexToCheck = technos.indexOf(checkboxValue);
		const newTab = technos;

		if (indexToCheck === -1) {
			setTechnos([...technos, checkboxValue]);
		} else {
			newTab.splice(indexToCheck, 1);
			setTechnos(newTab);
		}
	};

	useEffect(() => {
		let isCancelled = false;

		const retrieveMe = async () => {
			const res = await getMe(localStorage.getItem('token'));
			if (!isCancelled) {
				setIsLoading(false);
				setUser(res);
			}
		};

		if (!isCancelled) {
			setIsLoading(true);
			retrieveMe();
		}

		return () => {
			isCancelled = true;
		};
	}, [open]);

	if (!open) return null;

	const handleFormUpdateTechnos = async (e) => {
		e.preventDefault();
		const body = {
			technologies: technos,
		};

		await updateMe(localStorage.getItem('token'), body);
		nav('/');
	};

	const generateKey = (str, index) => {
		return `${str}-${index}`;
	};

	return (
		<div
			className='mx-auto mt-5 p-2 border border-1 rounded'
			style={{ width: '500px' }}
		>
			<form onSubmit={handleFormUpdateTechnos}>
				{technosList.map((techno, index) => (
					<div
						className='form-group row p-1'
						key={generateKey('tech-div', index)}
					>
						<label htmlFor={techno}>
							<input
								type='checkbox'
								onClick={handleChange}
								id={techno}
								name={techno}
								value={techno}
							/>
							{techno}
						</label>
					</div>
				))}

				<button type='submit' className='btn btn-primary btn-lg w-100 m-1 mt-2'>
					Update my infos
				</button>
			</form>
		</div>
	);
};

Technos.propTypes = {
	open: PropTypes.bool,
};

export default Technos;
