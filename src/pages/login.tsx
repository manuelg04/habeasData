/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  message, Form, Input, Button, Card, Typography,
} from 'antd';
import {
  setUser,
} from '../redux/userSlice';

export default function Login() {
  const [infouser, setInfoUser] = useState('');
  const [pass, setPass] = useState('');
  const [registering, setRegistering] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch(); // obtén dispatch

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/middlewares/auth/login', { usuario: infouser, pass });

      const {
        id, usuario, role, token,
      } = response.data;
      dispatch(setUser({
        id, usuario, role, token,
      }));

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
      await axios.post('/api/middlewares/auth/register', { usuario: infouser, pass });

      // Redirige al usuario al inicio de sesión luego de registrarse
      setRegistering(false);
    } catch (error) {
      message.error('Error al registrar el usuario');
    }
  };

  return (
    <>
      <Card style={{ width: 300, margin: 'auto', marginTop: 50 }}>
        <Typography.Title level={4}>
          {!registering ? 'Señor usuario si quiere consultar su estado cuenta inicie sesión' : 'Te estas registrando con transportes MTM'}
        </Typography.Title>
        {!registering ? (
          <>
            <Typography.Paragraph type="warning">Si no estás registrado, ¡hazlo ahora!</Typography.Paragraph>
            <Form onFinish={handleSubmit}>
              <Form.Item>
                <Input
                  type="text"
                  placeholder="Usuario"
                  value={infouser}
                  onChange={(e) => setInfoUser(e.target.value)}
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
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
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

          </>
        ) : (
          <Form onFinish={handleSubmitRegister}>
            <Form.Item>
              <Input
                type="text"
                placeholder="Nombre de usuario o Razon Social"
                value={infouser}
                onChange={(e) => setInfoUser(e.target.value)}
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
              <Button type="primary" htmlType="submit" style={{ backgroundColor: 'blue' }}>
                Registrarme
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
}
