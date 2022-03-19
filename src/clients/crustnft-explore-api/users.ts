import axios from 'axios';
import { EXPLORE_API } from 'constants/crustNftExploreApis';
import { isEmpty } from 'lodash';

export const isExistingUser = async (account: string) => {
  const response = await axios.get(`${EXPLORE_API}/users/${account.toLowerCase()}`);
  console.log(response);
  if (!isEmpty(response.data)) {
    return true;
  }
  return false;
};

export const createEmptyUser = async (account: string) => {
  const _account = account.toLowerCase();
  const response = await axios
    .post(`${EXPLORE_API}/users`, { account: _account, displayName: _account })
    .catch((e) => {
      console.log('error createEmptyUser', e.response);
      return;
    });

  return response?.data?.data;
};

export const updateUser = async () => {};
