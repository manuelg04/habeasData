import {
  Upload, Button, message, Table,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { uploadFile, db } from './api/controllers/firebase';
import { RootState } from '../redux/store';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { role } = useSelector((state: RootState) => state.user.usuario);
  const documento = useSelector((state: RootState) => state.user.usuario.usuario);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'nombre_de_tu_colección'), where('DOCUMENTO', '==', documento));
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => doc.data());
        setData(newData);
      } catch (error) {
        message.error(`Error al cargar los datos: ${error}`);
      }
    };

    fetchData();
  }, [documento]);

  const uploadProps = {
    name: 'file',
    accept: '.xls,.xlsx',
    beforeUpload: async (file) => {
      try {
        const fileUrl = await uploadFile(file);
        message.success(`El archivo se cargó correctamente. URL del archivo: ${fileUrl}`);
      } catch (error) {
        message.error(`Error al subir el archivo: ${error}`);
      }
      // Prevent the default upload behavior
      return false;
    },
  };

  const columns = [
    {
      title: 'Fecha Cargue',
      dataIndex: 'Fecha Cargue',
    },
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
      title: 'FLETE PAGADO',
      dataIndex: 'FLETE PAGADO',
    },
    {
      title: 'ANTICIPOS',
      dataIndex: ' ANTICIPOS ',
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
      title: 'VR. SALDO CANCELAR ',
      dataIndex: ' VR. SALDO CANCELAR ',
    },
    {
      title: 'FECHA CONSIGNACION SALDO',
      dataIndex: 'FECHA CONSIGNACION SALDO',
    },

    // Añade aquí el resto de tus columnas...
  ];

  return (
    <>
      {role === 'admin' && (
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Subir archivo Excel</Button>
        </Upload>
      )}
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default Dashboard;
