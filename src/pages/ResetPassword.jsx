import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('LAS CONTRASEÑAS NO COINCIDEN');
      return;
    }

    try {
      const response = await fetch(`https://beauvoir-server.onrender.com/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setRedirecting(true);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }, 2000);
      } else {
        setError(data.message || 'HUBO UN ERROR');
      }
    } catch (err) {
      setError('ERROR AL RESTABLECER LA CONTRASEÑA');
    }
  };

  return (
    <div className="bg-white relative flex items-center justify-center py-24">
      <header className="relative flex flex-col justify-center items-center text-center w-full max-w-md px-8">
        <h2 className="text-3xl border-gray-600 text-gray-800 mb-4">
          RESTABLECER CONTRASEÑA
        </h2>

        {success ? (
          <div className="text-green-500 text-xs font-bold mb-4">
            TU CONTRASEÑA HA SIDO RESTABLECIDA EXITOSAMENTE.
            {redirecting && <div className="mt-2">REDIRECCIONANDO...</div>}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            {error && <div className="text-red-500 mb-4 text-xs font-semibold uppercase">{error}</div>}

            <div className="mb-6">
              <input
                type="password"
                placeholder="NUEVA CONTRASEÑA"
                className="text-xs w-full px-4 py-2 border-b border-gray-300 focus:border-gray-700 outline-none text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-8">
              <input
                type="password"
                placeholder="CONFIRMAR CONTRASEÑA"
                className="w-full px-4 py-2 border-b border-gray-300 focus:border-gray-700 outline-none text-gray-700 text-xs"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-xs font-bold py-2 px-6 border text-black hover:bg-black hover:text-white transition"
            >
              RESTABLECER CONTRASEÑA
            </button>
          </form>
        )}
      </header>
    </div>
  );
}

export default ResetPassword;