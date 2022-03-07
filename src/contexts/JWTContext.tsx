import axios from 'axios';
import { CRUSTNFT_EXPLORE_API_V1 } from 'configs/crustnft-explore-api';
import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { ActionMap, AuthState, JWTContextType } from '../@types/auth';
import { isValidToken, setSession } from '../utils/jwt';

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT'
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    accessToken: string;
  };
  [Types.Login]: {
    accessToken: string;
  };
  [Types.Logout]: undefined;
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  accessToken: ''
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        accessToken: action.payload.accessToken
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        accessToken: ''
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        console.log('init access token');

        if (accessToken && isValidToken(accessToken)) {
          console.log('accessToken is valid');
          setSession(accessToken); // TODO: actually not needed, can implement the function to observe when token is expired inside the setSession()

          // const response = await axios.get('/api/account/my-account');
          // const { user } = response.data;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              accessToken: ''
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              accessToken: ''
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            accessToken: ''
          }
        });
      }
    };

    initialize();
  }, []);

  const challengeLogin = async (account: string): Promise<string | undefined> => {
    console.log('challengeLogin', account);
    const response = await axios
      .post(`${CRUSTNFT_EXPLORE_API_V1}/authentication/challenge-login`, { account })
      .catch((e) => {
        console.log('error challengeLogin', e.response);
        return;
      });

    return response?.data?.data.split('\n').at(-1);
  };

  const login = async (account: string, signature: string) => {
    const response = await axios
      .post(`${CRUSTNFT_EXPLORE_API_V1}/authentication/login`, {
        account,
        signature
      })
      .catch((err) => {
        console.log('Error login', err.response);
        return;
      });

    setSession(response?.data?.data);

    dispatch({
      type: Types.Login,
      payload: {
        accessToken: ''
      }
    });

    return response?.data?.data;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        challengeLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
