import axios from 'axios';
import { EXPLORE_API } from '../../constants/crustNftExploreApis';
import uuidv4 from '../../utils/uuidv4';

export const generateMedia = async (accessToken: string, contentType: string) => {
  const response = await axios
    .post(
      `${EXPLORE_API}/medias`,
      {
        fileName: uuidv4(),
        contentType
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    .catch((e) => {
      console.log(e.response);
    });
  console.log(response);
  return response?.data?.data;
};

export const uploadImage = async (accessToken: string, file: File) => {
  try {
    const signedUrl = await generateMedia(accessToken, file.type);

    if (!signedUrl) return;

    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: file
    }).then((response) => {
      console.log('response fetch', response);
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.text();
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
