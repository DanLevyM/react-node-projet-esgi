import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Profile from '../component/Profile';
import Technos from '../component/Technos';

const ProfilePage = () => {
	const [isProfile, setIsProfile] = useState(true);
	const [isTechno, setIsTechno] = useState(false);

	return (
		<div className='container-fluid'>
			<div className='btn-group d-flex justify-content-center'>
				<button
					className='btn btn-secondary'
					onClick={() => {
						setIsProfile(true);
						setIsTechno(false);
					}}
				>
					My infos
				</button>

				<button
					className='btn btn-secondary'
					onClick={() => {
						setIsProfile(false);
						setIsTechno(true);
					}}
				>
					Technos
				</button>
			</div>
			<Profile open={isProfile} />
			<Technos open={isTechno} />
		</div>
	);
};

export default ProfilePage;
