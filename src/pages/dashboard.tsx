/* eslint-disable promise/always-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
  Layout, Menu, Input, Button, message, Alert, Form, Typography, Table, Progress, Dropdown, Upload,
} from 'antd';
import {
  KeyOutlined, FileSearchOutlined, UploadOutlined, DollarOutlined, FilePdfOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import XLSX from 'xlsx';
import { selectUser } from '../redux/selector';
import {
  findPDFByDocumentNumber, getDocumentsByField, uploadFile, uploadFileWithDocument,
} from './api/controllers/firebase';

const { Sider } = Layout;
const { Search } = Input;

const Dashboard = () => {
  const [activeKey, setActiveKey] = useState('1'); // nuevo estado
  const [form, setForm] = useState({ Documento: '', Placa: '', Manifiesto: '' }); // Nuevo estado para el formulario
  const [file, setFile] = useState(null);
  const [searchDocumentNumber, setSearchDocumentNumber] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [getPdfUrl, setGetPdfUrl] = useState(null);
  const currentUser = useSelector(selectUser);
  // Estado para los datos de la tabla
  const [tableData, setTableData] = useState([]);
  // Estado para manejar la carga de archivos
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const isAdmin = currentUser.role === 'admin';

  const handleUploadExcel = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('excelFile', file);

      const response = await axios.post('/api/controllers/insertExcelData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        message.success('Data inserted successfully');
      } else {
        message.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Error uploading Excel file:', error);
      message.error('Failed to upload Excel file');
    }

    setUploading(false);
  };


  // Define la estructura de las columnas
  const columns = [
    {
      title: 'MFTO',
      dataIndex: 'mfto',
      key: 'mfto',
    },
    {
      title: 'PLACA',
      dataIndex: 'placa',
      key: 'placa',
    },
    {
      title: 'PROPIETARIO',
      dataIndex: 'propietario',
      key: 'propietario',
    },
    {
      title: 'DOCUMENTO',
      dataIndex: 'documento',
      key: 'documento',
    },
    {
      title: 'FLETE PAGADO',
      dataIndex: 'fletePagado',
      key: 'fletePagado',
    },
    {
      title: 'ANTICIPOS',
      dataIndex: 'anticipos',
      key: 'anticipos',
    },
    {
      title: 'RETENCIONES ICA 5*1000 / FUENTE 1%',
      dataIndex: 'retenciones',
      key: 'retenciones',
    },
    {
      title: 'POLIZA / ESTAMPILLA',
      dataIndex: 'poliza',
      key: 'poliza',
    },
    {
      title: 'FALTANTE / O DAÑO EN LA MERCANCIA',
      dataIndex: 'faltante',
      key: 'faltante',
    },
    {
      title: 'VR. SALDO CANCELAR',
      dataIndex: 'saldoCancelar',
      key: 'saldoCancelar',
    },
    {
      title: 'FECHA CONSIGNACION SALDO',
      dataIndex: 'fechaConsignacion',
      key: 'fechaConsignacion',
    },
    {
      title: 'ACCIONES',
      dataIndex: 'acciones',
      key: 'acciones',
      // Aquí puedes agregar los botones o acciones necesarias
      render: () => (
        <Button>Acción</Button>
      ),
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
              <Menu.Item key="4" icon={<DollarOutlined />}>
                Cargar liquidaciones/pagos
              </Menu.Item>
              <Menu.Item key="5" icon={<DollarOutlined />}>
                Tramites
              </Menu.Item>

            </>
          )}
          <Menu.Item key="2" icon={<FileSearchOutlined />}>
            Consulte estado de cuenta
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
          <p>Sección para Cargar Libro de fletes</p>
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
          </Upload>
          <Button onClick={handleUploadExcel} loading={uploading} style={{ marginTop: 16 }}>
            {uploading ? 'Cargando...' : 'Cargar Archivo'}
          </Button>
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
    </Layout>
  );
};

export default Dashboard;
