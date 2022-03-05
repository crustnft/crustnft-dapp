import axios from 'axios';
import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/auth';
import { isValidToken, setSession } from '../utils/jwt';
const baseUrl = 'https://stage-explore-api-632jevcdbq-df.a.run.app';

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER'
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
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

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    // initialize();
  }, []);

  const challengeLogin = async (account: string): Promise<string | undefined> => {
    console.log('challengeLogin', account);
    const response = await axios
      .post(`${baseUrl}/api/v1/authentication/challenge-login`, { account })
      .catch((e) => {
        console.log('error challengeLogin', e.response);
        return;
      });
    console.log('reus', response?.data?.data.split('\n').at(-1));
    console.log('response', response?.data);
    return response?.data?.data.split('\n').at(-1);
  };

  const login = async (account: string, signature: string) => {
    const response = await axios
      .post(`${baseUrl}/api/v1/authentication/login`, {
        account,
        signature
      })
      .catch((err) => {
        console.log('error', err.response);
        return;
      });

    return response?.data?.data;
    //const { accessToken, user } = response.data;

    // setSession(accessToken);
    // dispatch({
    //   type: Types.Login,
    //   payload: {
    //     user
    //   }
    // });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: Types.Register,
      payload: {
        user
      }
    });
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
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
