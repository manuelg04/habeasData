/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { message } from 'antd';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [registering, setRegistering] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { usuario, pass });

      // Almacenar el token en las cookies/localStorage
      document.cookie = `token=${response.data.token}; path=/`;

      // Redirigir al usuario al panel de control
      router.push('/dashboard');
    } catch (error) {
      message.error('Usuario o contraseña incorrectos');
    }
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/register', { usuario, pass });

      // Redirige al usuario al inicio de sesión luego de registrarse
      setRegistering(false);
    } catch (error) {
      message.error('Error al registrar el usuario');
    }
  };

  return (
    <>
      {!registering ? (
      // Mostrar el formulario de inicio de sesión si el usuario no está registrándose
        <form onSubmit={handleSubmit}>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
          <button type="submit">Login</button>
          <button type="button" onClick={() => setRegistering(true)}>Registrar</button>
        </form>
      ) : (
      // Mostrar el formulario de registro si el usuario está registrándose
        <form onSubmit={handleSubmitRegister}>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
          <button type="submit">Registrarme</button>
        </form>
      )}
    </>
  );
}
