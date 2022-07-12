'use strict';

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('users', [
			{
				firstName: 'admin',
				lastName: 'admin',
				password: '121212',
				email: 'admin@gmail.com',
				createdAt: new Date(),
				updatedAt: new Date(),
				role: 'admin',
			},
			{
				firstName: 'admin',
				lastName: 'admin',
				password: '121212',
				email: 'admin2@gmail.com',
				createdAt: new Date(),
				updatedAt: new Date(),
				role: 'admin',
			},
			{
				firstName: 'John',
				lastName: 'Doe',
				password: '121212',
				email: 'johndoe@gmail.com',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: 'Paul',
				lastName: 'Hack',
				password: '121212',
				email: 'paulhack@gmail.com',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface) => {
		return queryInterface.bulkDelete('users', null, {});
	},
};
