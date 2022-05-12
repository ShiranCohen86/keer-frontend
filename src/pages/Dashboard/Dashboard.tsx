import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomList } from '../../cmps/RoomList';
import { roomService } from '../../services/roomService';
import { guestService } from '../../services/guestService';
import { GuestTable } from '../../cmps/GuestTable';
import { adminService } from '../../services/adminService';
import { ModalMsg } from '../../cmps/Modal';
import { ToggleRoomsButton } from '../../cmps/ToggleRoomsButton';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const Dashboard = () => {
	const [ availableRooms, setAvailableRooms ] = useState([]);
	const [ couplesRooms, setCouplesRooms ] = useState([]);
	const [ guestsFamilies, setGuestsFamilies ] = useState([]);
	const [ isAvailable, setIsAvailable ] = useState(true);
	const [ isLoadedFamiliesGuests, setIsLoadedFamiliesGuests ] = useState(false);
	const [ isLoadedCouples, setIsLoadedCouples ] = useState(false);
	const [ isLoadedAvailable, setIsLoadedAvailable ] = useState(false);
	const [ isLoadedSentSms, setIsLoadedSentSms ] = useState(false);
	const [ classFull, setClassFull ] = useState('');
	const [ isOpenModal, setOpenModal ] = useState(false);
	const [ msg, setMsg ] = useState('');
	const [ userTypes ] = useState([ 'owner', 'manager', 'reception' ]);

	interface Guest {
		room: number;
	}

	const { userType = '' } = useParams();
	const onCloseModal = () => setOpenModal(false);

	const sendStatus = async () => {
		try {
			setIsLoadedSentSms(true);
			await adminService.sendStatus();
			setMsg('Send SMS successful');
		} catch (err) {
			const msg: any = err;
			setMsg(msg.response.data.err);
			setOpenModal(true);
		} finally {
			setIsLoadedSentSms(false);
		}
	};

	const onSwitchRooms = () => {
		setIsAvailable(!isAvailable);
	};

	useEffect(
		() => {
			if (!userType) {
				setClassFull('full');
			} else {
				setClassFull('');
			}
		},
		[ userType ]
	);

	useEffect(
		() => {
			const getAvailableRooms = async () => {
				try {
					const rooms = await roomService.getAvailableRooms();
					setAvailableRooms(rooms);
				} catch (err) {
					console.log(err);
				} finally {
					setIsLoadedAvailable(true);
				}
			};
			if (userTypes.includes(userType) && !isLoadedAvailable) {
				getAvailableRooms();
			}
		},
		[ isLoadedAvailable, userType, userTypes ]
	);

	useEffect(
		() => {
			const getGuestFamilies = async () => {
				try {
					const guests = await guestService.getGuestFamilies();
					const sortedGuest = guests.sort(
						(a: Guest, b: Guest) => (a.room > b.room ? 1 : b.room > a.room ? -1 : 0)
					);
					setGuestsFamilies(sortedGuest);
				} catch (err) {
					console.log(err);
				} finally {
					setIsLoadedFamiliesGuests(true);
				}
			};
			if (!isLoadedFamiliesGuests) {
				getGuestFamilies();
			}
		},
		[ isLoadedFamiliesGuests ]
	);

	useEffect(
		() => {
			const getCouplesRooms = async () => {
				try {
					const rooms = await roomService.getCouplesRooms();
					setCouplesRooms(rooms);
				} catch (err) {
					console.log(err);
				} finally {
					setIsLoadedCouples(true);
				}
			};
			if ([ 'owner', 'manager' ].includes(userType) && !isLoadedCouples) {
				getCouplesRooms();
			}
		},
		[ isLoadedCouples, userType ]
	);

	return (
		<div className="dashboard">
			<h1>{userType} Dashboard</h1>

			{userType === 'owner' &&
			guestsFamilies.length > 0 && (
				<div className="status-rooms">
					<h2>Send SMS status of the hotel with current percentage of taken rooms</h2>
					{!isLoadedSentSms ? (
						<Button variant="contained" onClick={sendStatus}>
							Send
						</Button>
					) : (
						<CircularProgress />
					)}
				</div>
			)}

			{[ 'owner', 'manager' ].includes(userType) && <ToggleRoomsButton onSwitchRooms={onSwitchRooms} />}

			{isAvailable ? (
				userTypes.includes(userType) && (
					<div className="available-rooms">
						<h2>Available Rooms</h2>
						{availableRooms.length > 0 ? (
							<RoomList rooms={availableRooms} />
						) : isLoadedAvailable ? (
							<p>No Available Rooms</p>
						) : (
							<CircularProgress />
						)}
					</div>
				)
			) : (
				[ 'owner', 'manager' ].includes(userType) && (
					<div className="couples-rooms">
						<h2>Couples Rooms</h2>
						{couplesRooms.length > 0 ? (
							<RoomList rooms={couplesRooms} />
						) : isLoadedCouples ? (
							<p>No Couples Rooms</p>
						) : (
							<CircularProgress />
						)}
					</div>
				)
			)}

			<div className={`families-guests ${classFull}`}>
				<h2>Families Guests</h2>
				{guestsFamilies.length > 0 ? (
					<GuestTable guests={guestsFamilies} />
				) : isLoadedFamiliesGuests ? (
					<p>No Families Guests</p>
				) : (
					<CircularProgress />
				)}
			</div>
			<ModalMsg isOpenModal={isOpenModal} onCloseModal={onCloseModal} msg={msg} />
		</div>
	);
};
