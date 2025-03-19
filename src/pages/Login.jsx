import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('POR FAVOR INGRESA TU EMAIL Y CONTRASEÑA');
      return;
    }
    try {
      const response = await fetch('https://beauvoir-server.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); 
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userId', data.user._id);

        navigate('/Productos');
      } else {
        console.error('ERROR DEL SERVIDOR:', data.message);
        setError(data.message || 'ERROR AL INICIAR SESIÓN');
      }
    } catch (err) {
      setError('HUBO UN ERROR AL REALIZAR LA SOLICITUD');
      console.error(err);
    }
  };

  return (
    <div className="bg-white relative flex items-center justify-center py-24">
      <header className="relative flex flex-col justify-center items-center text-center w-full max-w-md px-8">
        <h2 className="text-3xl text-black mb-4 tracking-wide">
          INICIAR SESIÓN
        </h2>
        <p className="text-xs text-gray-700 mb-6">INGRESA TUS DATOS PARA ACCEDER</p>
        
        <form onSubmit={handleSubmit} className="w-full">
          {error && <div className="text-red-500 mb-4 text-xs">{error}</div>}

          <div className="mb-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL"
              className="w-full px-4 py-2 border-b border-gray-300 focus:border-gray-700 outline-none text-gray-700 text-xs"
              required
            />
          </div>

          <div className="mb-8">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="CONTRASEÑA"
              className="w-full px-4 py-2 border-b border-gray-300 focus:border-gray-700 outline-none text-gray-700 text-xs"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-md py-2 px-6 border text-black hover:bg-black hover:text-white transition text-xs font-bold"
          >
            INGRESAR
          </button>

          <div className="mt-6 text-center">
            <Link to="/recuperar-password" className="text-xs text-gray-600 hover:text-gray-800">
              ¿OLVIDASTE TU CONTRASEÑA?
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-xs">¿NO TIENES UNA CUENTA?</p>
            <Link to="/registro" className="text-gray-700 border-b border-gray-700 hover:text-gray-900 text-xs font-semibold">
              CREAR CUENTA
            </Link>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Login;