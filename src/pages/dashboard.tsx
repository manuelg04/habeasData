/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import {
  Upload, Button, message, Table, Input, Space, Modal, Spin,
} from 'antd';
import {
  DollarCircleOutlined, FileAddOutlined, UploadOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  collection, doc, getDocs, onSnapshot, query, updateDoc, where,
} from '@firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { uploadFile, db, uploadNonExcelFile } from './api/controllers/firebase';
import { RootState } from '../redux/store';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [fileList, setFileList] = useState([]);
  const [mftoNumber, setMftoNumber] = useState('');
  const { role } = useSelector((state: RootState) => state.user.usuario);
  const documento = useSelector((state: RootState) => state.user.usuario.usuario);

  const handleOpenModal = (type, mfto) => {
    setMftoNumber(mfto);
    setUploadType(type);
    setUploadModalVisible(true);
  };

  const handleCloseModal = () => {
    setUploadModalVisible(false);
    setFileList([]);
  };

  const handleChange = (info) => {
    setFileList(info.fileList);
  };

  const handleConfirmUpload = async () => {
    try {
      if (!fileList || !fileList.length) {
        message.error('No se ha seleccionado ningún archivo para subir.');
        return;
      }
      const file = fileList[0]?.originFileObj;
      if (file) {
        let fileUrl;
        if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
          fileUrl = await uploadFile(file);
          setIsUploading(true);
        } else {
          fileUrl = await uploadNonExcelFile(file);
        }

        // Query the collection where 'MFTO' field matches the input 'mftoNumber'
        const q = query(collection(db, 'nombre_de_tu_colección'), where('MFTO', '==', mftoNumber));
        const querySnapshot = await getDocs(q);

        // If no such document exist, show error message
        if (querySnapshot.empty) {
          message.error(`No se encontró un documento con el número MFTO: ${mftoNumber}`);
          return;
        }

        // Assuming 'MFTO' field is unique within the collection, use the first document
        const docSnap = querySnapshot.docs[0];

        // Update the document with new file url
        await updateDoc(doc(db, 'nombre_de_tu_colección', docSnap.id), {
          urlpago: uploadType === 'Imagen' ? fileUrl : docSnap.data().urlpago || null,
          urlliquidacion: uploadType === 'PDF' ? fileUrl : docSnap.data().urlliquidacion || null,
        });

        message.success(`El archivo se cargó correctamente. URL del archivo: ${fileUrl}`);
      }
      handleCloseModal();
    } catch (error) {
      setIsUploading(false);
      message.error(`Error al subir el archivo: ${error}`);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      let q;
      if (role === 'admin') {
        q = collection(db, 'nombre_de_tu_colección');
      } else {
        q = query(collection(db, 'nombre_de_tu_colección'), where('DOCUMENTO', '==', documento));
      }

      onSnapshot(q, (snapshot) => {
        let newData = snapshot.docs.map((doc) => doc.data());
        if (searchTerm) {
          newData = newData.filter((item) => item.MFTO && item.MFTO.includes(searchTerm));
        }
        setData(newData);
      });
    } catch (error) {
      message.error(`Error al cargar los datos: ${error}`);
    }
  }, [documento, role, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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

  const handleOpenLink = (url) => {
    if (url) {
      // Abre la url en una nueva pestaña
      window.open(url, '_blank');
    } else {
      // Muestra un mensaje si la url no está disponible
      message.error('La URL no está disponible');
    }
  };

  const columns = [
    {
      title: 'Fecha Cargue',
      dataIndex: 'FECHA DESPACHO',
    },
    {
      title: 'MFTO',
      dataIndex: 'MFTO',
    },
    {
      title: 'PLACA',
      dataIndex: 'PLACA',
    },
    {
      title: 'PROPIETARIO/DOCUMENTO',
      dataIndex: 'PROPIETARIO/DOCUMENTO',
    },
    {
      title: 'FLETE PAGADO',
      dataIndex: 'FLETE PAGADO',
    },
    {
      title: 'ANTICIPOS',
      dataIndex: 'ANTICIPOS ',
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
      render: (text, record) => (
        <Space size="middle">
          <FileAddOutlined
            onClick={() => {
              handleOpenModal('PDF', record.MFTO);
              // Aquí puedes agregar la funcionalidad para "Subir liquidación"
            }}
          />
          <DollarCircleOutlined
            onClick={() => {
              handleOpenModal('Imagen', record.MFTO);
              // Aquí puedes agregar la funcionalidad para "Subir pago"
            }}
          />
        </Space>
      ),
    },
    {
      title: 'Ver Liquidación',
      key: 'ver_liquidacion',
      render: (text, record) => (
        <button
          style={{
            border: 'none', background: 'none', color: '#1890ff', cursor: 'pointer',
          }}
          onClick={() => handleOpenLink(record.urlliquidacion)}
        >
          Ver Liquidación
        </button>
      ),
    },
    {
      title: 'Ver Pago',
      key: 'ver_pago',
      render: (text, record) => (
        <button
          style={{
            border: 'none', background: 'none', color: '#1890ff', cursor: 'pointer',
          }}
          onClick={() => handleOpenLink(record.urlpago)}
        >
          Ver Pago
        </button>
      ),
    },

    // Añade aquí el resto de tus columnas...
  ];

  return (
    <>
      <Input placeholder="MFTO Number" onChange={handleSearch} />
      {role === 'admin' && (
        <Upload {...uploadProps}>
          <Button>
            <Spin spinning={isUploading}>
              <UploadOutlined />
              Subir archivo Excel
            </Spin>
          </Button>
        </Upload>
      )}
      <Table dataSource={data} columns={columns} />
      <Modal
        title={`Subir ${uploadType}`}
        open={uploadModalVisible}
        onCancel={handleCloseModal}
        onOk={handleConfirmUpload}
      >
        <Upload
          name="file"
          accept={uploadType === 'PDF' ? '.pdf' : 'image/*'}
          onChange={handleChange}
          fileList={fileList}
          listType="picture"
        >
          <Button>
            Seleccionar archivo
          </Button>
        </Upload>
      </Modal>
    </>
  );
};

export default Dashboard;
