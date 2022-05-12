import { useNavigate } from 'react-router-dom';
import { NavMenu } from '../NavMenu/NavMenu';
import HomeIcon from '@mui/icons-material/Home';

export const AppHeader = () => {
	const navigate = useNavigate();
	return (
		<header className="app-header full">
			<div onClick={() => navigate('/')} className="app-logo">
				<HomeIcon color="action" sx={{ fontSize: 40 }} />
			</div>
			<NavMenu />
		</header>
	);
};
