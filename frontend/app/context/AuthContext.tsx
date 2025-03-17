'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define types for our auth state
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

// Define the context interface
interface AuthContextType extends AuthState {
  login: (userData: AuthUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateTokens: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });
  const router = useRouter();

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');

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
        // If parsing fails, clear localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handle login
  const login = (userData: AuthUser, accessToken: string, refreshToken: string) => {
    // Update state
    setAuthState({
      user: userData,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });

    // Store in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Handle logout
  const logout = () => {
    // Clear state
    setAuthState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });

    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // Redirect to login
    router.push('/login');
  };

  // Update tokens (useful for token refresh)
  const updateTokens = (accessToken: string, refreshToken: string) => {
    setAuthState(prev => ({
      ...prev,
      accessToken,
      refreshToken,
    }));

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
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

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);