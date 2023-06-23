/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable promise/always-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
  Layout, Menu, Input, Button, message, Alert, Form, Typography, Table, Progress, Popover, Space,
} from 'antd';
import {
  KeyOutlined, FileSearchOutlined, UploadOutlined, DollarOutlined, FilePdfOutlined, PlusOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selector';
import {
  addDocument,
  findPDFByDocumentNumber, getDocumentsByField, uploadFile, uploadFileWithDocument,
} from './api/controllers/firebase';

const { Sider } = Layout;
const { Search } = Input;

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeKey, setActiveKey] = useState('1'); // nuevo estado
  const [form, setForm] = useState({ Documento: '', Placa: '', Manifiesto: '' }); // Nuevo estado para el formulario
  const [file, setFile] = useState(null);
  const [searchDocumentNumber, setSearchDocumentNumber] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [getPdfUrl, setGetPdfUrl] = useState(null);
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
        await axios.post('/api/controllers/writeDataToFireStore', { data: datosExcel, start }); // Aquí pasas también el parámetro "start"
        // Actualiza el progreso
        const percentageComplete = Math.min(((start + batchSize) / datosExcel.length) * 100, 100);
        setProgress(percentageComplete);
      }
      message.success('Datos cargados correctamente');
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

  function SubirLiquidacion({ record }) {
    const handleChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleClick = async () => {
      try {
        // Subir el archivo a Firebase Storage y obtener la URL de descarga
        const url = await uploadFile(file);
        console.log('🚀 ~ url:', url);

        // Obtener el documento de Firestore que corresponde a este MFTO
        const documents = await getDocumentsByField('prueba', 'MFTO', record.MFTO);
        console.log('🚀 ~ documents:', documents);

        if (documents.length > 0) {
          const doc = documents[0];

          // Actualizar el documento con la URL de la liquidación
          await addDocument('prueba', doc.id);
        } else {
          throw new Error(`No se encontró un documento con MFTO: ${record.MFTO}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleClick}>Subir Liquidación</button>
      </div>
    );
  }
  function subirPago(record) {
    console.log('Subir Pago', record);
  }

  const columns = [
    {
      title: 'MFTO',
      dataIndex: 'MFTO',
    },
    {
      title: 'PLACA',
      dataIndex: 'PLACA',
    },
    {
      title: 'PROPIETARIO',
      dataIndex: 'PROPIETARIO',
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
      dataIndex: 'VR. SALDO CANCELAR',
    },
    {
      title: 'FECHA CONSIGNACION SALDO',
      dataIndex: 'FECHA CONSIGNACION SALDO',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Popover
          placement="bottom"
          title="Acciones"
          content={(
            <Space direction="vertical">
              <SubirLiquidacion record={record} />
              <Button onClick={() => subirPago(record)}>Subir Pago</Button>
            </Space>
                )}
          trigger="click"
        >
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </Popover>
      ),
    },
  ];

  const handlePDFSubmit = async (e) => {
    e.preventDefault();
    try {
      const documentNumber = prompt('Ingrese el número de documento para este PDF');
      await uploadFileWithDocument(file, documentNumber);
    } catch (error) {
      message.error('Error al cargar el archivo');
    }
  };

  const handleDocumentNumberSubmit = async () => {
    try {
      const pdfUrl = await findPDFByDocumentNumber(searchDocumentNumber);
      setGetPdfUrl(pdfUrl); // Abre el PDF en una nueva pestaña
    } catch (error) {
      message.error('No se encontró el PDF');
    }
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
              <Menu.Item key="4" icon={<DollarOutlined />}>
                Cargar liquidaciones/pagos
              </Menu.Item>
              <Menu.Item key="5" icon={<DollarOutlined />}>
                Tramites
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
          <Progress percent={progress} status="active" />
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
      {activeKey === '5' && (
        <>
          <Input
            value={searchDocumentNumber}
            onChange={(e) => setSearchDocumentNumber(e.target.value)}
            placeholder="Buscar por doc"
            onPressEnter={handleDocumentNumberSubmit}
          />

          {getPdfUrl && (
          <a href={getPdfUrl} target="_blank" rel="noopener noreferrer">
            <FilePdfOutlined />
            {' '}
            Descarga tu PDF aquí
          </a>
          )}
        </>
      )}
      {isAdmin && activeKey === '4' && (
      <div className="p-4">
        <form onSubmit={handlePDFSubmit} className="flex items-center justify-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="mb-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Upload
            </button>
          </div>
        </form>
        <Progress percent={progress} status="active" />
      </div>
      )}
      {/* Aquí se pueden agregar más componentes que se muestren con base en activeKey */}
    </Layout>
  );
};

export default Dashboard;
