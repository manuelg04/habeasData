/* eslint-disable quotes */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  Form, Input, Button, Card, Typography, Alert, Checkbox, DatePicker, Select,
} from 'antd';
import Swal from 'sweetalert2';
import {
  setUser,
} from '../redux/userSlice';

const { Option } = Select;

export default function Login() {
  const [infouser, setInfoUser] = useState('');
  const [pass, setPass] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [expeditionDate, setExpeditionDate] = useState(null);
  const [email, setEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [documentType, setDocumentType] = useState('Cedula'); // Por defecto 'Cedula'
  const router = useRouter();
  const dispatch = useDispatch();

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
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Inicio de sesión exitoso',
      });
      // Redirigir al usuario al panel de control
      router.push('/dashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
      });
    }
  };

  const handleSubmitRegister = async () => {
    try {
      await axios.post('/api/middlewares/auth/register', {
        tipo_documento: documentType,
        usuario: infouser,
        pass,
        nombre: ownerName,
        email,
        fecha_expedicioncc: expeditionDate,
      });
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Registro exitoso',
      });
      // Redirige al usuario al inicio de sesión luego de registrarse
      setRegistering(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario ya registrado en la base de datos',
        });
      }
    }
  };

  return (
    <>
      <div style={{
        backgroundImage: `url(/pres_mtm_3.jpg)`,
        backgroundSize: 'cover', // Asegura que la imagen de fondo cubra toda la pantalla
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Alert
          message="Atención"
          description="Señor usuario, por motivos de seguridad y políticas de la compañía se ha protegido la información mostrada por transportes MTM a sus usuarios."
          type="warning"
          showIcon
          style={{ maxWidth: '80%', marginBottom: '30px' }}
        />
        <Card style={{
          width: 300, margin: 'auto', marginTop: 80, backgroundColor: 'lightgray',
        }}
        >
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
                  <Button type="link" onClick={() => router.push('/recoveryPassword')}>
                    ¿Olvidaste tu contraseña?
                  </Button>
                </Form.Item>
              </Form>

            </>
          ) : (
            <Form onFinish={handleSubmitRegister}>
              <Form.Item>
                <Select value={documentType} onChange={(value) => setDocumentType(value)}>
                  <Option value="Cedula">Cédula</Option>
                  <Option value="NIT">NIT</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Input
                  type="text"
                  placeholder="No de documento"
                  value={infouser}
                  onChange={(e) => setInfoUser(e.target.value)}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
              </Form.Item>
              <Typography.Paragraph type="secondary">
                Señor usuario recuerde que el campo de Documento solo admite Numeros
              </Typography.Paragraph>
              {documentType !== 'NIT' && (
              <Form.Item>
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="Fecha de expedición"
                  onChange={(date, dateString) => setExpeditionDate(dateString)}
                />
              </Form.Item>
              )}

              {/* Campo de Correo electrónico */}
              <Form.Item>
                <Input
                  type="email"
                  placeholder="Correo Electrónico"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Item>

              {/* Campo de Nombre Propietario */}
              <Form.Item>
                <Input
                  type="text"
                  placeholder="Nombre Propietario"
                  onChange={(e) => setOwnerName(e.target.value)}
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
                <Checkbox onChange={(e) => setTermsAccepted(e.target.checked)}>
                  Al dar click en el botón de Registrarme, acepto los términos y condiciones de uso
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: 'lightblue' }} disabled={!termsAccepted}>
                  Registrarme
                </Button>
                <Button type="link" onClick={() => setRegistering(false)}>
                  Cancelar
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    </>
  );
}
