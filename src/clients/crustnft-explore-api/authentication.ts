import axios from 'axios';
import { EXPLORE_API } from 'constants/crustNftExploreApis';
import { isExistingUser } from './users';

export const challengeLogin = async (account: string): Promise<string | undefined> => {
  const _account = account.toLowerCase();
  const checkUser = await isExistingUser(_account);
  if (!checkUser) {
    return;
    // await createEmptyUser(_account);
  }
  const response = await axios
    .post(`${EXPLORE_API}/authentication/challenge-login`, { account: _account })
    .catch((e) => {
      console.log('error challengeLogin', e.response);
      return;
    });

  return response?.data?.data;
};

export const login = async (account: string, signature: string) => {
  const response = await axios
    .post(`${EXPLORE_API}/authentication/login`, {
      account: account.toLowerCase(),
      signature
    })
    .catch((err) => {
      console.log('Error login', err.response);
      return;
    });

  return response?.data?.data;
};
