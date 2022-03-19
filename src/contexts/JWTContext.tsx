import {
  challengeLogin,
  login as exploreApiLogin
} from 'clients/crustnft-explore-api/authentication';
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

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              accessToken: accessToken
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

  const login = async (account: string, signature: string) => {
    const accessToken = await exploreApiLogin(account, signature);

    if (!accessToken) return;

    setSession(accessToken);
    dispatch({
      type: Types.Login,
      payload: {
        accessToken
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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
