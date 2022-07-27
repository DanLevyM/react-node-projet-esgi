import React from 'react';
import MyRouter from './routes/routes';
import { UserProvider } from './context/UserContext';

const App = () => {
	return (
		<>
			<UserProvider>
				<MyRouter />
			</UserProvider>
		</>
	);
};

export default App;
