import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const GuestTable = ({ guests }: { guests: {}[] }) => {
	interface Guest {
		_id?: string;
		name?: string;
		room?: number;
	}
	return (
		<TableContainer component={Paper} sx={{ width: 'fit-content' }}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">Name</TableCell>
						<TableCell align="center">Room</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{guests.map((guest: Guest) => (
						<TableRow key={guest._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell align="center">{guest.name}</TableCell>
							<TableCell align="center">{guest.room}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
