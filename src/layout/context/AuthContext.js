// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para atualizar o token
  const updateToken = () => {
    const cookieToken = Cookie.get('auth');
    if (cookieToken) {
      const decodedToken = jwt.decode(cookieToken);
      setToken(cookieToken);
      setUser(decodedToken);
    } else {
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  };

  // Função para fazer logout
  const logout = () => {
    Cookie.remove('auth');
    setToken(null);
    setUser(null);
  };

  // Carregar token inicial
  useEffect(() => {
    updateToken();
  }, []);

  const value = {
    token,
    user,
    loading,
    updateToken,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};