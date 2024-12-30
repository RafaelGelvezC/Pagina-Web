import { createContext, useContext, useState } from 'react';
import { login, register, resetPassword as apiResetPassword } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  };

  // Función para registrar un nuevo usuario
  const registerUser = async (name, email, password) => {
    try {
      const response = await register(name, email, password);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      throw new Error('Error al registrar usuario');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  // Función para recuperar contraseña
  const resetPassword = async (email) => {
    try {
      await apiResetPassword(email);
    } catch (error) {
      throw new Error('Error al recuperar contraseña');
    }
  };

  const value = {
    user,
    login: loginUser,
    register: registerUser,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};