/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
// pages/reset-password.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { token } = router.query; // Obtiene el token desde la URL

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      await axios.post('/api/controllers/reset-password', { token, newPassword: password });
      setSuccess(true);
    } catch (err) {
      setError('Algo salió mal al restablecer la contraseña');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {success ? (
        <div>
          <h1 className="text-xl">Contraseña actualizada con éxito</h1>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <h1 className="py-10 text-2xl text-center font-bold"> TRANSPORTES MTM S.A.S.</h1>
          <h1 className="text-xl text-center">Restablecer Contraseña</h1>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Nueva Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirmar Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={resetPassword}
              >
                Restablecer Contraseña
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
