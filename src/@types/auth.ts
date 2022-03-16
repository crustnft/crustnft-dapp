export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  accessToken: string;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  accessToken: string;
  method: 'jwt';
  login: (account: string, signature: string) => Promise<void>;
  challengeLogin: (account: string) => Promise<string | undefined>;
  logout: () => Promise<void>;
};
