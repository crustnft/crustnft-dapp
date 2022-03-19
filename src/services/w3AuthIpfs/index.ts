import axios from 'axios';

export const AUTH_HEADER =
  'cG9sLTB4QTIyOGNGYWI4MEE2NzM4NTIyNDc2RGVDMTFkNzkzZDYxMjk5NjhiMjoweGU2ZDA1NDIzYTcxY2YzNjdjNWNhZmQwNzRmOWZjODAyMWUwMmEzZDA4MGViZTMyY2VhNDA0MjkwZTgxOWM5YTExMDUxMjNhZDJjZWM2ZjQ1Y2NiZWRmOTYyYjc5NzA4YWRiYjMwNTcxMGEzZWIzYjMzOWM3MzFmNTc1NGM4NWY1MWM=';

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
