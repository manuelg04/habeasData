/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  message, Form, Input, Button, Card,
} from 'antd';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [registering, setRegistering] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
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

  const handleSubmitRegister = async () => {
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
      <Card style={{ width: 300, margin: 'auto', marginTop: 50 }}>
        {!registering ? (
          <Form onFinish={handleSubmit}>
            <Form.Item>
              <Input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                type="password"
                placeholder="Contraseña"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginRight: 10,
                  backgroundColor: '#1890ff', // o el color que desees para el fondo
                  borderColor: '#1890ff', // o el color que desees para el borde
                  color: '#fff',

                }}
              >
                Iniciar sesión
              </Button>
              <Button type="link" onClick={() => setRegistering(true)}>
                Registrar
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form onFinish={handleSubmitRegister}>
            <Form.Item>
              <Input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                type="password"
                placeholder="Contraseña"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Registrarme
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
}
