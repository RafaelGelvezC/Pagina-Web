/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const LoginRegister = () => {
const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const handleLogin = (e) => {
  console.log('Logging in with', email, password);
};

const handleRegister = (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
  alert('Las contraseñas no coinciden');
  return;
  }
  // Aquí iría la lógica para manejar el registro
  console.log('Registering with', name, email, password);
};

return (
  <div>
  <h1>{isLogin ? 'Inicio de Sesión' : 'Registro'}</h1>
  <form onSubmit={isLogin ? handleLogin : handleRegister}>
      {!isLogin && (
      <div>
          <label>Nombre:</label>
          <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required={!isLogin} 
          />
      </div>
      )}
      <div>
      <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
      />
      </div>
      <div>
      <label>Contraseña:</label>
      <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
      />
      </div>
      {!isLogin && (
      <div>
          <label>Confirmar Contraseña:</label>
          <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required={!isLogin} 
          />
      </div>
      )}
      <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrar'}</button>
  </form>
  <button onClick={() => setIsLogin(!isLogin)}>
      {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
  </button>
  </div>
);
};

export default LoginRegister;
