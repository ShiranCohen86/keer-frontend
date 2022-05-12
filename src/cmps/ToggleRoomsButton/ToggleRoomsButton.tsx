import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const ToggleRoomsButton = ({ onSwitchRooms }: any) => {
	const [ alignment, setAlignment ] = React.useState('Available');

	const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setAlignment(newAlignment);
		onSwitchRooms();
	};

	const buttonStyle = { padding: '3px', fontSize: '12px', color: '#ac8b67', border: '1px solid #ffb860' };

	return (
		<ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange}>
			<ToggleButton sx={buttonStyle} value="Available">
				Available
			</ToggleButton>
			<ToggleButton sx={buttonStyle} value="Couples">
				Couples
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
