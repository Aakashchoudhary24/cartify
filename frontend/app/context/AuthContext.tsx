'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthUser {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (userData: AuthUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateTokens: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = Cookies.get('accessToken');
    const storedRefreshToken = Cookies.get('refreshToken');
    const storedUser = Cookies.get('user');

    if (storedAccessToken && storedRefreshToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
          isAuthenticated: true,
        });
      } catch (error) {
        // Clear corrupted cookies
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('user');
      }
    }
  }, []);

  const login = (userData: AuthUser, accessToken: string, refreshToken: string) => {
    setAuthState({
      user: userData,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });

    Cookies.set('accessToken', accessToken, { expires: 1 }); // 1 day
    Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7 days
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
  };

  const logout = () => {
    setAuthState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');

    router.push('/login');
  };

  const updateTokens = (accessToken: string, refreshToken: string) => {
    setAuthState(prev => ({
      ...prev,
      accessToken,
      refreshToken,
    }));

    Cookies.set('accessToken', accessToken, { expires: 1 });
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
