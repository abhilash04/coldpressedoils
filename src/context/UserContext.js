import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { config } from '../config/config';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCookie = Cookies.get(config.cookieName);
    const savedUser = localStorage.getItem('amrutha_user');
    
    if (savedCookie && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    
    // Store in structure expected by apiServices
    const authData = {
      token: token,
      loginUserId: userData.id
    };
    
    Cookies.set(config.cookieName, JSON.stringify(authData), { expires: 30 });
    localStorage.setItem('amrutha_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    Cookies.remove(config.cookieName);
    localStorage.removeItem('amrutha_user');
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

