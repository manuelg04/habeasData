/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
  Layout, Menu, Input, Button, message, Alert, Form, Typography, Table,
} from 'antd';
import { KeyOutlined, FileSearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selector';
import { getDocumentsByField, uploadFile } from './api/controllers/firebase';

const { Sider } = Layout;
const { Search } = Input;

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeKey, setActiveKey] = useState('1'); // nuevo estado
  const [form, setForm] = useState({ Documento: '', Placa: '', Manifiesto: '' }); // Nuevo estado para el formulario
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
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

  const handleFormSubmit = async () => {
    // Se realiza la búsqueda en firebase en función de los campos que no están vacíos
    if (form.Documento !== '') {
      const result = await getDocumentsByField('prueba', 'DOCUMENTO', form.Documento);
      setExcelData(result);
    } else if (form.Placa !== '') {
      const result = await getDocumentsByField('prueba', 'PLACA', form.Placa);
      setExcelData(result);
    } else if (form.Manifiesto !== '') {
      const result = await getDocumentsByField('prueba', 'MFTO', form.Manifiesto);
      setExcelData(result);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePasswordGeneration = () => {
    const password = generatePassword(10);
    message.success(`La nueva contraseña es: ${password}`);
  };

  const getExcelData = async (url) => {
    try {
      const getResponse = await axios.get(`/api/controllers/getExcelData?url=${url}`);
      const datosExcel = getResponse.data;

      const batchSize = 100;
      for (let start = 0; start < datosExcel.length; start += batchSize) {
        await axios.post('/api/controllers/writeDataToFirestore', { data: datosExcel, start }); // Aquí pasas también el parámetro "start"
      }

      // La función podría devolver los datos de respuesta de la última llamada, si los necesitas
      return datosExcel;
    } catch (error) {
      message.error('Error al procesar los datos del archivo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(file);
      await getExcelData(result);
    } catch (error) {
      // message.error('Error al cargar el archivo');
    }
  };

  const columns = [
    {
      title: 'MFTO',
      dataIndex: 'MFTO',
    },
    {
      title: 'PLACA',
      dataIndex: ' PLACA ',
    },
    {
      title: 'PROPIETARIO',
      dataIndex: ' PROPIETARIO ',
    },
    {
      title: 'DOCUMENTO',
      dataIndex: 'DOCUMENTO',
    },
    {
      title: 'FLETE PAGADO',
      dataIndex: 'FLETE PAGADO',
    },
    {
      title: 'ANTICIPOS',
      dataIndex: 'ANTICIPOS',
    },
    {
      title: 'RETENCIONES ICA 5*1000 / FUENTE 1%',
      dataIndex: 'RETENCIONES ICA 5*1000 / FUENTE 1%',
    },
    {
      title: 'POLIZA / ESTAMPILLA',
      dataIndex: 'POLIZA / ESTAMPILLA',
    },
    {
      title: 'FALTANTE / O DAÑO EN LA MERCANCIA',
      dataIndex: 'FALTANTE / O DAÑO EN LA MERCANCIA',
    },
    {
      title: 'VR. SALDO CANCELAR',
      dataIndex: ' VR. SALDO CANCELAR ',
    },
    {
      title: 'FECHA CONSIGNACION SALDO',
      dataIndex: 'FECHA CONSIGNACION SALDO',
    },
  ];

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
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex items-center justify-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="mb-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Upload
              </button>
            </div>
          </form>
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
            <Input name="Manifiesto" placeholder="No Manifiesto" value={form.Manifiesto} onChange={handleFormChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleFormSubmit} style={{ backgroundColor: 'blue' }}>Buscar</Button>
          </Form.Item>
        </Form>
        <Table dataSource={excelData} columns={columns} />
      </div>
      )}
      {/* Aquí se pueden agregar más componentes que se muestren con base en activeKey */}
    </Layout>
  );
};

export default Dashboard;
