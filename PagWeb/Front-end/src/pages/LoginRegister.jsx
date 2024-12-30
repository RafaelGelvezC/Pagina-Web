/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from './AuthCont/AuthContext';

const LoginRegister = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!email) tempErrors.email = 'Email es requerido';
    if (!password) tempErrors.password = 'Contraseña es requerida';
    if (!isLogin && !name) tempErrors.name = 'Nombre es requerido';
    if (!isLogin && password !== confirmPassword)
      tempErrors.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      login(email, password);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      register(name, email, password);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">
        {isLogin ? 'Inicio de Sesión' : 'Registro'}
      </h1>
      <form
        className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg"
        onSubmit={isLogin ? handleLogin : handleRegister}
      >
        {!isLogin && (
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
        )}
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
        {!isLogin && (
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={!isLogin}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {isLogin ? 'Iniciar Sesión' : 'Registrar'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 hover:underline"
      >
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
      </button>
    </div>
  );
};

export default LoginRegister;
