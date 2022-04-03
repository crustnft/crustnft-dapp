import axios from 'axios';

const ipfsPinningService = 'https://pin.crustcode.com/psa';

export const pinW3Crust = async (authHeader: string, cid: string, name: string) => {
  await axios.post(
    ipfsPinningService + '/pins',
    {
      cid,
      name
    },
    {
      headers: {
        authorization: 'Bearer ' + authHeader,
        'Content-Type': 'application/json'
      }
    }
  );
};
