/* eslint-disable no-shadow */
/* eslint-disable import/no-duplicates */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable promise/always-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
  Layout, Menu, Input, Button, message, Alert, Form, Typography, Table, Progress, Dropdown, Upload,
} from 'antd';
import {
  KeyOutlined, FileSearchOutlined, UploadOutlined, DollarOutlined, FilePdfOutlined, PlusOutlined, DownOutlined,
} from '@ant-design/icons';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import XLSX from 'xlsx';
import { selectUser } from '../redux/selector';
import {
  getMftoByNumber,
  storage, uploadFile, uploadImage, uploadPdf,
} from './api/controllers/firebase'; // Asegúrate de que esta ruta apunta a tu configuración de Firebase
import { getMFTO } from './api/controllers/getMFTO'; // Asegúrate de que esta ruta apunta a tu función getMFTO

const { Sider } = Layout;
const { Search } = Input;

const Dashboard = () => {
  const [activeKey, setActiveKey] = useState('1'); // nuevo estado
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
            <Menu.Item key="1" icon={<UploadOutlined />}>
              Cargar Libro de fletes
            </Menu.Item>
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
        <div>
          <Typography.Title>
            Bienvenido,
            {' '}
            {currentUser.usuario}
          </Typography.Title>
          <p>Sección para Consultar estado de cuenta</p>
          <Input placeholder="Ingresa tu número de MFTO" style={{ marginBottom: '20px' }} value={searchMFTO} onChange={(e) => setSearchMFTO(e.target.value)} />
          <Button onClick={handleSearchMFTO}>Buscar</Button>
          <Table columns={columns} dataSource={tableData} />
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
