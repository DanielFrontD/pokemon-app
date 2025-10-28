'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';
import { authService } from '@/utils/auth/authService';
import { tokenStorage } from '@/utils/auth/cookies';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Decode JWT to check expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const token = tokenStorage.get();
    if (token && !isTokenExpired(token)) {
      setState(prev => ({
        ...prev,
        token,
        isAuthenticated: true,
        user: { id: '1', username: 'admin', name: 'Pokemon Trainer' },
        isLoading: false,
      }));
    } else {
      if (token) tokenStorage.remove(); // Remove expired token
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await authService.login(credentials);
      const mockUser: User = {
        id: '1',
        username: credentials.username,
        name: 'Pokemon Trainer',
      };
      
      tokenStorage.set(response.token);
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        token: response.token,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    tokenStorage.remove();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
