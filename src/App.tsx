import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { Dashboard } from './pages/Dashboard';

export const App = () => {
	return (
		<Router>
			<div className="App main-layout">
				<AppHeader />
				<Routes>
					<Route element={<Dashboard />} path="/dashboard">
						<Route element={<Dashboard />} path=":userType" />
					</Route>
					<Route element={<HomePage />} path="/" />
				</Routes>
			</div>
		</Router>
	);
};
