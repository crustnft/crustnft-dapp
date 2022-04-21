import axios from 'axios';
import { EXPLORE_API } from 'constants/crustNftExploreApis';
import {
  CreateNftCollectionDto,
  GenerateNftCollectionDto,
  NftCollectionDto,
  UpdateNftCollectionDto
} from './types';

export const createCPCollection = async (
  createDto: CreateNftCollectionDto,
  accessToken: string
) => {
  const response = await axios
    .post(`${EXPLORE_API}/ntf-collections`, createDto, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      console.log('create CP collection error', err.response);
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
      console.log('update CP Collection error', err.response);
      return;
    });

  if (!response?.data?.data) return;

  return response.data.data;
};

export const updatePartialCPCollection = async (
  accessToken: string,
  id: string,
  partialUpdateDto: Partial<UpdateNftCollectionDto>
) => {
  const collectionInfo = await getCollectionInfo(accessToken, id);
  if (!collectionInfo) return;
  const {
    status,
    updatedAt,
    metadataCID,
    creator,
    collectionCID,
    createdAt,
    collectionSize,
    generatedNfts,
    ...updateDto
  } = collectionInfo;
  console.log('update partial CP Collection', updateDto);
  console.log('partial update CP Collection', partialUpdateDto);
  console.log('both', { ...updateDto, ...partialUpdateDto });
  const updatedCPCollection = await updateCPCollection(
    { ...updateDto, ...partialUpdateDto },
    accessToken
  );
  console.log('updatedCPCollection', updatedCPCollection);
};

export const getCollections = async (
  accessToken: string,
  countOnly: boolean = false
): Promise<NftCollectionDto[] | undefined> => {
  const response = await axios
    .get(`${EXPLORE_API}/ntf-collections/?countOnly=${countOnly.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      console.log('get collections error', err.response);
      return;
    });

  if (!response?.data?.data) return;
  return response.data.data;
};

export const getCollectionsSummary = async () => {};

export const startGenerateNftCollection = async (
  accessToken: string,
  generateNftCollectionDto: GenerateNftCollectionDto
) => {
  const response = await axios
    .post(`${EXPLORE_API}/ntf-collections/generate-nft-collection`, generateNftCollectionDto, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      console.log('start generate CP collection error', err.response);
      return;
    });

  if (!response?.data?.data) return;
  return response.data.data;
};

export const getCollectionInfo = async (
  accessToken: string,
  collectionId: string
): Promise<NftCollectionDto | undefined> => {
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
