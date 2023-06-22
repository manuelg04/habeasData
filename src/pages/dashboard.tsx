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
  Layout, Menu, Input, Button, message, Alert, Form, Typography, Table, Progress, Dropdown,
} from 'antd';
import {
  KeyOutlined, FileSearchOutlined, UploadOutlined, DollarOutlined, FilePdfOutlined, PlusOutlined, DownOutlined,
} from '@ant-design/icons';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selector';
import {
  downloadFileByName,
  getDocumentsByField, uploadFile,
} from './api/controllers/firebase';

const { Sider } = Layout;
const { Search } = Input;

const Dashboard = () => {
  const [activeKey, setActiveKey] = useState('1'); // nuevo estado
  const [form, setForm] = useState({ Documento: '', Placa: '', Manifiesto: '' }); // Nuevo estado para el formulario
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [getPdfUrl, setGetPdfUrl] = useState(null);
  const currentUser = useSelector(selectUser);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [liquiFile, setLiquiFile] = useState<File | null>(null);
  const liquiFileInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const paymentFileInputRef = useRef(null);
  const isAdmin = currentUser.role === 'admin';

  const handleFileSelect = () => {
    paymentFileInputRef.current.click();
  };

  const handleFormSubmit = async () => {
    // Se realiza la búsqueda en firebase en función de los campos que no están vacíos
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getExcelData = async (url) => {
    try {
      const getResponse = await axios.get(`/api/controllers/getExcelData?url=${url}`);
      const datosExcel = getResponse.data;

      const batchSize = 100;
      for (let start = 0; start < datosExcel.length; start += batchSize) {
        await axios.post('/api/controllers/writeDataToFirestore', { data: datosExcel, start }); // Aquí pasas también el parámetro "start"
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

  const handleLiquidacionesSubmit = async () => {
    try {
      await downloadFileByName(file);
      message.success('Liquidaciones cargadas correctamente');
    } catch (error) {
      // message.error('Error al cargar el archivo');
    }
  };

  const handleSoportePagoPDFSubmit = async () => {
    try {
      await uploadFile(file);
      message.success('Soporte de pago cargado correctamente');
    } catch (error) {
      // message.error('Error al cargar el archivo');
    }
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Button icon={<UploadOutlined />} onClick={() => handleFileSelect()}>Soporte de pago</Button>
        <input
          ref={paymentFileInputRef}
          type="file"
          hidden
          onChange={(e) => {
            setPaymentFile(e.target.files[0]);
            handleSoportePagoPDFSubmit();
          }}
        />
      </Menu.Item>
      <Menu.Item>
        <Button icon={<DollarOutlined />} onClick={() => liquiFileInputRef.current.click()}>Subir liquidaciones</Button>
        <input
          ref={liquiFileInputRef}
          type="file"
          hidden
          onChange={(e) => {
            setLiquiFile(e.target.files[0]);
            handleLiquidacionesSubmit();
          }}
        />
      </Menu.Item>
    </Menu>
  );

  const handleExpand = (record) => {
    // Aquí podrías implementar la lógica para expandir la fila.
    // Esto podría implicar cambiar el campo 'expanded' del objeto 'record'
    // y luego actualizar el estado para reflejar este cambio.
  };

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
      dataIndex: ' VR. SALDO CANCELAR ',
    },
    {
      title: 'FECHA CONSIGNACION SALDO',
      dataIndex: 'FECHA CONSIGNACION SALDO',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => {
        if (!isAdmin) {
          // Para un usuario que no es administrador, mostrar un enlace para descargar el PDF
          console.log(getPdfUrl);
          return (
            <>
              <a onClick={() => downloadFileByName('290d249e-e3d2-4c76-9ac4-8f5918d0dbf3')} target="_blank" rel="noreferrer">
                <FilePdfOutlined />
                Descargar Liquidaciones
              </a>
              {getPdfUrl && (
              <a href={getPdfUrl} target="_blank" rel="noopener noreferrer" download>
                <FilePdfOutlined />
                {' '}
                Descarga tu PDF aquí
              </a>
              )}
            </>
          );
        }

        // Para un usuario administrador, mostrar el menú desplegable original
        return (
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <PlusOutlined />
              <DownOutlined />
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const columns2 = [
    {
      title: 'Soportes de pago',
      dataIndex: 'Soportes de pago',
    },
    {
      title: 'Liquidaciones',

      dataIndex: 'Liquidaciones ',
    },

  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={({ key }) => setActiveKey(key)}>
          {isAdmin && (
            <>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                Cargar Excel
              </Menu.Item>

            </>
          )}
          <Menu.Item key="2" icon={<FileSearchOutlined />}>
            Consulte Estado de Cuenta
          </Menu.Item>
          <Menu.Item key="4" icon={<FileSearchOutlined />}>
            Consulte Soportes de pago
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
      {activeKey === '4' && (
        <>
          <Search placeholder="Buscar por documento" style={{ width: 200 }} />
          <Table dataSource={excelData} columns={columns} />
        </>
      )}
      {/* Aquí se pueden agregar más componentes que se muestren con base en activeKey */}
    </Layout>
  );
};

export default Dashboard;
