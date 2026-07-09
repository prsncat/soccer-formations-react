import { createContext, useContext, useEffect, useState } from 'react';
import {
  getMe,
  login as loginRequest,
  logout as logoutRequest,
  refreshSession,
} from './authApi.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  async function loadUser() {
    try {
      const data = await getMe();
      setUser(data.user);
    } catch {
      try {
        await refreshSession();
        const data = await getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      }
    } finally {
      setCheckingAuth(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function login(email, password) {
    const data = await loginRequest({ email, password });
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    await logoutRequest();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        checkingAuth,
        isAuthenticated: Boolean(user),
        login,
        logout,
        reloadUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}