/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RecoveryPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Hacer una solicitud al servidor para iniciar el proceso de recuperación de contraseña
      // Supongamos que tienes un endpoint en tu API que se encargará de generar y enviar el token
      const response = await axios.post('/api/controllers/recoveryPassword', { email });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Vefique su correo electrónico para restablecer su contraseña.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo electrónico no existe en nuestra base de datos.',
        });
      }
    } catch (error) {
      setMessage('Error al enviar la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
          Recuperar Contraseña
        </h2>
        <h1 className="py-10 text-center">
          Señor usuario por favor ingrese el correo que registro en
          nuestro sistema para poder enviarle un correo con las instrucciones para
          recuperar su contraseña
        </h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Dirección de correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Enviar'}
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-6 text-center text-sm text-red-500">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoveryPassword;
