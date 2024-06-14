import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, set_user] = useState({});

  const login = (user) => {
    setIsAuthenticated(true);
    set_user(user);
  }
  const logout = () => setIsAuthenticated(false);

  const state = {
    user,
    isAuthenticated
  }

  const actions = {
    login,
    logout,
    set_user
  }

  return (
    <AuthContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
