const staging = process.env.REACT_APP_STAGING;

const STAGE_EXPLORE_API_V1 = 'https://stage-explore-api-632jevcdbq-df.a.run.app/api/v1';
const PROD_EXPLORE_API_V1 = '';

export const EXPLORE_API = staging ? STAGE_EXPLORE_API_V1 : PROD_EXPLORE_API_V1;
