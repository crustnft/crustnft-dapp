import axios from 'axios';
import { EXPLORE_API } from 'constants/crustNftExploreApis';
import { CreateCollectionDto } from './types';
export const getCollection = async (id: string) => {
  const response = await axios.get(`${EXPLORE_API}/collections/${id}`).catch((e) => {
    console.log('error getting collection', e.response);
    return;
  });

  if (!response?.data?.data) return;
  return response?.data?.data;
};

export const createCollection = async (
  accessToken: string,
  createCollectionDto: CreateCollectionDto
) => {
  const response = await axios
    .post(`${EXPLORE_API}/collections`, createCollectionDto, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((e) => {
      console.log('Error create collection', e.response);
      return;
    });

  return response?.data?.data;
};

export const updateCollection = async (
  accessToken: string,
  updateCollectionDto: CreateCollectionDto
) => {
  const response = await axios
    .put(`${EXPLORE_API}/collections`, updateCollectionDto, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((e) => {
      console.log('Error create collection', e.response);
      return;
    });

  return response?.data?.data;
};
