import axios from 'axios';
import { EXPLORE_API } from '../../constants/crustNftExploreApis';

export const generateMedia = async (accessToken: string, fileId: string, contentType: string) => {
  const response = await axios
    .post(
      `${EXPLORE_API}/medias`,
      {
        fileName: fileId,
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

const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const uploadImage = async (accessToken: string, fileId: string, file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Limit file upload is 20MB');
  }
  try {
    const signedUrl = await generateMedia(accessToken, fileId, file.type);

    if (!signedUrl) return;

    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: file
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response;
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
