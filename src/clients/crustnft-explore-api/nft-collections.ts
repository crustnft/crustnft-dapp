import axios from 'axios';
import { EXPLORE_API } from 'constants/crustNftExploreApis';
import { CreateNftCollectionDto, UpdateNftCollectionDto } from './types';

export const createCPCollection = async (
  createDto: CreateNftCollectionDto,
  accessToken: string
) => {
  const response = await axios
    .post(`${EXPLORE_API}/ntf-collections`, createDto, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      console.log(err.response);
      return;
    });

  if (!response?.data?.data) return;

  return response.data.data;
};

export const updateCPCollection = async (
  updateDto: UpdateNftCollectionDto,
  accessToken: string
) => {
  const response = await axios
    .put(`${EXPLORE_API}/ntf-collections`, updateDto, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      console.log(err.response);
      return;
    });

  if (!response?.data?.data) return;

  return response.data.data;
};

export const getCollections = async (accessToken: string, countOnly: boolean = false) => {
  const response = await axios
    .get(`${EXPLORE_API}/ntf-collections/?countOnly=${countOnly.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      console.log(err.response);
      return;
    });

  if (!response?.data?.data) return;
  return response.data.data;
};

export const getCollectionsSummary = async () => {};
export const startGenerateNftCollection = async () => {};

export const getCollectionInfo = async (accessToken: string, collectionId: string) => {
  const response = await axios
    .get(`${EXPLORE_API}/ntf-collections/${collectionId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      console.log('getCollectionInfo error', err.response);
      return;
    });

  if (!response?.data?.data) return;
  return response.data.data;
};
