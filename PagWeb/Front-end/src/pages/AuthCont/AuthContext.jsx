import  { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Lógica para iniciar sesión (por ejemplo, llamada a API)
    console.log('Logging in with', email, password);
    setUser({ email });
  };

  const register = (name, email, password) => {
    // Lógica para registrar usuario (por ejemplo, llamada a API)
    console.log('Registering with', name, email, password);
    setUser({ name, email });
  };

  const value = {
    user,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


//Este código proporciona una implementación más simple y simulada de autenticación, útil para prototipos o pruebas donde no se requiere comunicación real con un backend.