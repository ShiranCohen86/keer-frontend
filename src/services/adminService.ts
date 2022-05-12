import { httpService } from './httpService';

export const adminService = {
	sendStatus
};

async function sendStatus() {
	try {
		return await httpService.post('administration/status', null);
	} catch (err) {
		throw err
	}
}

