const staging = process.env.REACT_APP_STAGING;
const STAGE_UPLOAD_IMAGE_PUBLIC_BUCKET =
  'https://storage.googleapis.com/stage-nft-generator-api-upload';

const PROD_UPLOAD_IMAGE_PUBLIC_BUCKET =
  'https://storage.googleapis.com/stage-nft-generator-api-upload';

export const UPLOAD_IMAGE_PUBLIC_BUCKET = staging
  ? STAGE_UPLOAD_IMAGE_PUBLIC_BUCKET
  : PROD_UPLOAD_IMAGE_PUBLIC_BUCKET;
