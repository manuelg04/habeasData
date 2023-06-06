/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
  Layout, Menu, Input, Button, message, Alert, Form, Typography,
} from 'antd';
import { KeyOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';

const { Sider } = Layout;
const { Search } = Input;

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeKey, setActiveKey] = useState('1'); // nuevo estado
  const [form, setForm] = useState({ Documento: '', Placa: '', Manifiesto: '' }); // Nuevo estado para el formulario

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
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={({ key }) => setActiveKey(key)}>
          <Menu.Item key="1" icon={<KeyOutlined />}>
            Generar contraseña
          </Menu.Item>
          <Menu.Item key="2" icon={<FileSearchOutlined />}>
            Consulte Estado de Cuenta
          </Menu.Item>
        </Menu>
      </Sider>
      {activeKey === '1' && (
        <div>
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
