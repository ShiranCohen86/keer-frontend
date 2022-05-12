import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const RoomPreview = ({ room }: { room: { _id: string; number: number; capacity: number } }) => {
	return (
		<div className="room-preview">
			<Card
				variant="outlined"
				sx={{
					width: 'fit-content',
					borderRadius: '10px'
				}}
			>
				<CardContent
					sx={{
						'&:last-child': {
							paddingBottom: '8px'
						},
						padding: '8px'
					}}
				>
					<Typography sx={{ fontSize: 14 }}>Room number</Typography>
					<Typography sx={{ fontSize: 30 }}>{room.number}</Typography>
					<Typography sx={{ fontSize: 14 }}>Capacity: {room.capacity} people.</Typography>
				</CardContent>
			</Card>
		</div>
	);
};
