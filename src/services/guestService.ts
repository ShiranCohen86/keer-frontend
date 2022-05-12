import { httpService } from "./httpService";

export const guestService = {
  getGuestFamilies
};

async function getGuestFamilies() {
  try {
    return await httpService.get('guest/families', null);
  } catch (err) {
    console.log(err);
  }
}



