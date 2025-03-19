import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://beauvoir-server.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'HUBO UN ERROR');
      }
    } catch (err) {
      setError('ERROR AL ENVIAR LA SOLICITUD');
    }
  };

  return (
    <div className="bg-white relative flex items-center justify-center py-24">
      <header className="relative flex flex-col justify-center items-center text-center w-full max-w-md px-8">
        <h2 className="text-3xl text-black mb-4 tracking-wide">
          RECUPERAR CONTRASEÑA
        </h2>
        <p className="text-xs text-gray-700 mb-6">INGRESA TU CORREO Y TE ENVIAREMOS INSTRUCCIONES</p>

        <form onSubmit={handleSubmit} className="w-full">
          {message && <div className="text-green-500 mb-4 text-xs font-semibold uppercase">{message}</div>}
          {error && <div className="text-red-500 mb-4 text-xs font-semibold uppercase">{error}</div>}

          <div className="mb-6">
            <input
              type="email"
              placeholder="INGRESA TU CORREO"
              className="text-xs w-full px-4 py-2 border-b border-gray-300 focus:border-gray-700 outline-none text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-xs font-bold w-full text-md py-2 px-6 border text-black hover:bg-black hover:text-white transition"
          >
            ENVIAR INSTRUCCIONES
          </button>
        </form>
      </header>
    </div>
  );
}

export default ForgotPassword;
