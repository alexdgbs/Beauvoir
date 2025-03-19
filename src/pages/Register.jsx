import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('LAS CONTRASEÑAS NO COINCIDEN');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const response = await fetch('https://beauvoir-server.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'ERROR AL REGISTRAR EL USUARIO');
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
          CREAR CUENTA
        </h2>
        <p className="text-xs text-gray-700 mb-6">REGÍSTRATE PARA COMENZAR</p>

        <form onSubmit={handleSubmit} className="w-full">
          {error && <div className="text-red-500 mb-4 text-xs">{error}</div>}

          <div className="mb-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="NOMBRE COMPLETO"
              className="w-full px-4 py-2 border-b border-gray-300 focus:border-gray-700 outline-none text-gray-700 text-xs"
              required
            />
          </div>

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

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="CONTRASEÑA"
              className="w-full px-4 py-2 border-b border-gray-300 focus:border-gray-700 outline-none text-gray-700 text-xs"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
          </div>

          <div className="mb-8 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="CONFIRMAR CONTRASEÑA"
              className="w-full px-4 py-2 border-b border-gray-300 focus:border-gray-700 outline-none text-gray-700 text-xs"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showConfirmPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
          </div>

          <button 
            type="submit"
            className="w-full text-md py-2 px-6 border text-black hover:bg-black hover:text-white transition text-xs font-bold"
          >
            CREAR CUENTA
          </button>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-xs">¿YA TIENES UNA CUENTA?</p>
            <Link to="/login" className="text-gray-700 border-b border-gray-700 hover:text-gray-900 text-xs font-semibold">
              INICIAR SESIÓN
            </Link>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Register;
