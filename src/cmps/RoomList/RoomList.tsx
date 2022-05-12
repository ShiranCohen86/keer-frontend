import { RoomPreview } from '../RoomPreview';

export const RoomList = ({
	rooms
}: {
	rooms: {
		_id: string;
		number: number;
		capacity: number;
	}[];
}) => {
	return (
		<ul className="room-list">
			{rooms.map((room) => (
				<li key={room._id}>
					<RoomPreview room={room} />
				</li>
			))}
		</ul>
	);
};
