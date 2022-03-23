import { UPLOAD_IMAGE_PUBLIC_BUCKET } from 'constants/gcpApis';

export const getPublicUrlFromId = (id: string) => {
  return `${UPLOAD_IMAGE_PUBLIC_BUCKET}/${id}`;
};
