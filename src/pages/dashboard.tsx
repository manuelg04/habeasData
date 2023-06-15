/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
  Layout, Menu, Input, Button, message, Alert, Form, Typography, Upload,
} from 'antd';
import { KeyOutlined, FileSearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selector';

const { Sider } = Layout;
const { Search } = Input;

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeKey, setActiveKey] = useState('1'); // nuevo estado
  const [form, setForm] = useState({ Documento: '', Placa: '', Manifiesto: '' }); // Nuevo estado para el formulario
  const currentUser = useSelector(selectUser);
  const isAdmin = currentUser.role === 'admin';

  const handleSearch = async (value) => {
    try {
      // Llama a tu API para buscar al usuario por nombre
      const response = await axios.get(`/api/findInternUsers?id=${value}`);

      if (response.data) {
        setSelectedUser(response.data);
        message.success('Usuario encontrado');
      }
    } catch (error) {
      message.error('Usuario no encontrado');
      setSelectedUser(null);
    }
  };

  const generatePassword = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    return password;
  };

  useEffect(() => {
    generatePassword(16);
  }, []);

  const handleFormSubmit = () => {
    // Aquí puedes llamar a tu API para buscar el estado de cuenta con la información del formulario
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePasswordGeneration = () => {
    const password = generatePassword(10);
    message.success(`La nueva contraseña es: ${password}`);
    // Aquí debes llamar a tu API o función para cambiar la contraseña del usuario
  };
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);

    try {
      const response = await axios.post('/api/controllers/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        message.success('Archivo subido exitosamente');
      } else {
        throw new Error('Algo salió mal al subir el archivo');
      }
    } catch (err) {
      message.error(err.message);
    }

    // Debemos siempre retornar false para prevenir el comportamiento por defecto de antd Upload.
    return false;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={({ key }) => setActiveKey(key)}>
          {isAdmin && (
            <>
              <Menu.Item key="1" icon={<KeyOutlined />}>
                Generar contraseña
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                Cargar Excel
              </Menu.Item>

            </>
          )}
          <Menu.Item key="2" icon={<FileSearchOutlined />}>
            Consulte Estado de Cuenta
          </Menu.Item>
        </Menu>
      </Sider>
      {isAdmin && activeKey === '1' && (
        <div>
          <Typography.Title>
            Bienvenido,
            {' '}
            {currentUser.usuario}
          </Typography.Title>
          <Search placeholder="Buscar por nombre" onSearch={handleSearch} style={{ width: 200, margin: '15px 0' }} />
          {selectedUser && (
          <Button onClick={handlePasswordGeneration}>
            Generar contraseña para
            {' '}
            {selectedUser.usuario}
          </Button>
          )}
        </div>
      )}
      {isAdmin && activeKey === '3' && (
        <div style={{ padding: '15px' }}>
          <Typography.Title>Cargar archivo Excel</Typography.Title>
          <Alert message="Atención: aquí suba su archivo de Excel." type="info" showIcon />
          <Upload.Dragger name="file" beforeUpload={handleFileUpload} accept=".xlsx">
            <p>Click o arrastra el archivo para subirlo</p>
          </Upload.Dragger>
        </div>
      )}
      {activeKey === '2' && (
      <div style={{ padding: '15px' }}>
        <Typography.Title>Estado de Cuenta</Typography.Title>
        <Alert message="Las facturas electrónicas DEBEN ser enviadas al correo establecido por transportes MTM el cual es facturacionelectronica@transportesmtm.com para poder darle trámite y programación de pago del servicio." type="info" showIcon />
        <Alert message="Si al momento de buscar el servicio no le arroja observaciones, quiere decir que al momento no ha llegado documentación a la oficina principal." type="info" showIcon />
        <Form onFinish={handleFormSubmit}>
          <Form.Item>
            <Input name="Documento" placeholder="Documento" value={form.Documento} onChange={handleFormChange} />
          </Form.Item>
          <Form.Item>
            <Input name="Placa" placeholder="Placa" value={form.Placa} onChange={handleFormChange} />
          </Form.Item>
          <Form.Item>
            <Input name="Manifiesto" placeholder="No Manifiesto" value={form.Manifiesto} onChange={handleFormChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleFormSubmit}>Buscar</Button>
          </Form.Item>
        </Form>
      </div>
      )}
      {/* Aquí se pueden agregar más componentes que se muestren con base en activeKey */}
    </Layout>
  );
};

export default Dashboard;
