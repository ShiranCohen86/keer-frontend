import { httpService } from './httpService';

export const roomService = {
	getAvailableRooms,
	getCouplesRooms
};

async function getAvailableRooms() {
	try {
		return await httpService.get('room/available', null);
	} catch (err) {
		console.log(err);
	}
}
async function getCouplesRooms() {
	try {
		return await httpService.get(`room/couples`, null);
	} catch (err) {
		console.log(err);
	}
}
