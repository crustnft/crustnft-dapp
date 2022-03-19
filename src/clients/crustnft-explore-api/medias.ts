import axios from 'axios';
import { EXPLORE_API } from 'constants/crustNftExploreApis';
import uuidv4 from 'utils/uuidv4';

export const generateMedia = async (accessToken: string) => {
  const response = await axios.post(
    `${EXPLORE_API}/medias`,
    {
      fileName: uuidv4(),
      contentType: 'image/png'
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
  console.log(response);
  return response?.data?.data;
};
