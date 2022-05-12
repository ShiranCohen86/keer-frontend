import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

export const NavMenu = () => {
	const navigate = useNavigate();

	const goDashboard = ({ target }: any) => {
		const userType = target.innerText.toLowerCase();

		navigate(`/dashboard/${userType}`);
	};
	return (
		<React.Fragment>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
					justifyContent: 'center'
				}}
			>
				<Typography onClick={goDashboard} sx={{ minWidth: 100 }}>
					reception
				</Typography>
				<Typography onClick={goDashboard} sx={{ minWidth: 100 }}>
					manager
				</Typography>
				<Typography onClick={goDashboard} sx={{ minWidth: 100 }}>
					owner
				</Typography>
			</Box>
		</React.Fragment>
	);
};
