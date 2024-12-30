import axios from 'axios';

const API_URL = 'https://api.example.com';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
	},
});

// Función para manejar errores de manera consistente
const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || 'Error en la solicitud');
  } else if (error.request) {
    throw new Error('No se recibió respuesta del servidor');
  } else {
    throw new Error('Error al configurar la solicitud');
  }
};

// Funciones para interactuar con la API
export const login = async (email, password) => {
  try {
    return await apiService.post('/auth/login', { email, password });
  } catch (error) {
    handleError(error);
  }
};

export const register = async (name, email, password) => {
  try {
    return await apiService.post('/auth/register', { name, email, password });
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (email) => {
  try {
    return await apiService.post('/auth/reset-password', { email });
  } catch (error) {
    handleError(error);
  }
};

export const getUserData = async (userId) => {
  try {
    return await apiService.get(`/users/${userId}`);
  } catch (error) {
    handleError(error);
  }
};

export const submitTaxCalculation = async (taxData) => {
  try {
    return await apiService.post('/taxes/calculate', taxData);
  } catch (error) {
    handleError(error);
  }
};

export const getTransactionHistory = async (userId) => {
  try {
    return await apiService.get(`/transactions/${userId}`);
  } catch (error) {
    handleError(error);
  }
};

export default apiService;