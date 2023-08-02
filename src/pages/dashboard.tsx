/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lonely-if */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import {
  Upload, Button, message, Table, Input, Space, Modal, Spin, Popconfirm, Pagination, Form,
} from 'antd';
import {
  DeleteOutlined,
  DollarCircleOutlined, EditOutlined, ExclamationCircleOutlined, FileAddOutlined, PlusOutlined, UploadOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  collection, doc, getDocs, limit, orderBy, query, startAfter, updateDoc, where, getCountFromServer, deleteDoc, setDoc,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import {
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import {
  uploadFile, db, uploadNonExcelFile, uploadAndAssignFile,
} from './api/controllers/firebase';
import { RootState } from '../redux/store';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [observationModalVisible, setObservationModalVisible] = useState(false);
  const [observation, setObservation] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [fileList, setFileList] = useState([]);
  const [mftoNumber, setMftoNumber] = useState('');
  const [searchPlaca, setSearchPlaca] = useState('');
  const [lastDoc, setLastDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const { role } = useSelector((state: RootState) => state.user.usuario);
  const documento = useSelector((state: RootState) => state.user.usuario.usuario);
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [updatedRecord, setUpdatedRecord] = useState({ ...selectedRecord }); // Crea un nuevo estado para manejar los cambios

  const PAGESIZE = 10;
  const handleInputChange = (e, field) => {
    setUpdatedRecord({ ...updatedRecord, [field]: e.target.value });
  };

  const handleObservationChange = (e) => {
    setObservation(e.target.value);
  };

  const handleAddObservation = (mfto) => {
    setMftoNumber(mfto);
    setObservationModalVisible(true);
  };

  const handleSaveObservation = async () => {
    try {
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

      // Update the document with new observation
      await updateDoc(doc(db, 'nombre_de_tu_colección', docSnap.id), {
        observaciones: observation,
      });

      message.success(`Observation saved successfully for MFTO number: ${mftoNumber}`);
      setObservationModalVisible(false);
    } catch (error) {
      message.error(`Error saving observation: ${error}`);
    }
  };

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

  const fetchData = async (newPage = false, mfto = '', placa = '') => {
    try {
      let q;

      if (newPage && lastDoc) {
        if (role === 'admin') {
          q = query(collection(db, 'nombre_de_tu_colección'), orderBy('MFTO'), startAfter(lastDoc), limit(PAGESIZE));
        } else {
          q = query(collection(db, 'nombre_de_tu_colección'), where('DOCUMENTO', '==', documento), orderBy('MFTO'), startAfter(lastDoc), limit(PAGESIZE));
        }
      } else if (role === 'admin') {
        q = query(collection(db, 'nombre_de_tu_colección'), orderBy('MFTO'), limit(PAGESIZE));
      } else {
        q = query(collection(db, 'nombre_de_tu_colección'), where('DOCUMENTO', '==', documento), orderBy('MFTO'), limit(PAGESIZE));
      }

      if (mfto !== '') {
        q = query(collection(db, 'nombre_de_tu_colección'), where('MFTO', '==', mfto));
      } else if (placa !== '') {
        // Consulta para PLACA
        q = query(collection(db, 'nombre_de_tu_colección'), where('PLACA', '==', placa));
      } else {
        // Consulta por defecto
        q = query(collection(db, 'nombre_de_tu_colección'), orderBy('MFTO'), limit(PAGESIZE));
      }

      const dataQuery = await getDocs(q);
      const docs: any[] = [];

      let lastDocument;
      dataQuery.forEach((doc: QueryDocumentSnapshot<Record<string, unknown>>) => {
        docs.push({ ...doc.data(), id: doc.id });
        lastDocument = doc;
      });

      setLastDoc(lastDocument);
      if (newPage) {
        setData(docs);
        setCurrentPage((currentPage) => currentPage + 1);
      } else {
        setData(docs);
        setCurrentPage(1);
      }

      const collectionRef = collection(db, 'nombre_de_tu_colección');
      const snapshot = await getCountFromServer(collectionRef);
      const { count } = snapshot.data();
      setTotalPages(Math.ceil(count / PAGESIZE));
    } catch (error) {
      message.error(`Error al cargar los datos: ${error}`);
    }
  };

  useEffect(() => {
    fetchData(lastDoc);
  }, []);

  const handleSearch = () => {
    if (searchTerm === '' && searchPlaca === '') {
      // Llama a fetchData sin parámetros de búsqueda para cargar todos los datos
      fetchData();
    } else {
      fetchData(false, searchTerm, searchPlaca);
    }
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

  const handleDeleteRecord = async (id) => {
    try {
      await deleteDoc(doc(db, 'nombre_de_tu_colección', id));
      message.success(`El registro con el ID ${id} fue eliminado correctamente.`);
    } catch (error) {
      message.error(`Error al eliminar el registro: ${error}`);
    }
  };

  const handleOpenModalForEdit = (id) => {
    const record = data.find((item) => item.id === id);
    setEditModalVisible(true);
    setSelectedRecord(record);
    setUpdatedRecord(record); // Llenar "updatedRecord" con los datos actuales
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };
  const handleSaveChanges = async () => {
    try {
      await setDoc(doc(db, 'nombre_de_tu_colección', selectedRecord.id), updatedRecord);
      message.success('Registro actualizado correctamente.');
      handleCloseEditModal();
      fetchData();
    } catch (error) {
      message.error(`Error al actualizar el registro: ${error}`);
    }
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'Document ID',
    },
    {
      title: 'Fecha Cargue',
      dataIndex: 'Fecha Despacho',
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
          <EditOutlined
            onClick={() => {
              handleOpenModalForEdit(record.id);
            }}
          />
          <Popconfirm
            title={`¿Estás seguro de eliminar el registro con id ${record.id}?`}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => {
              handleDeleteRecord(record.id);
            }}
            onCancel={() => ('Cancelado')}
            okText="Sí"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
          </Popconfirm>
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
    {
      title: 'Observaciones',
      dataIndex: 'observaciones',
      render: (text, record) => (
        <Space size="middle">
          {text}
          {role === 'admin' && (
          <Button
            onClick={() => handleAddObservation(record.MFTO)}
            icon={<PlusOutlined />}
          />
          )}
        </Space>
      ),
    },

    // Añade aquí el resto de tus columnas...
  ];

  const onFileChange = (event) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const validImageTypes = ['image/png', 'application/pdf'];
      const selectedFiles = [];

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const fileType = file.type;

        if (!validImageTypes.includes(fileType)) {
          setError(`Archivo inválido: ${file.name}. Por favor, suba un archivo PNG o PDF.`);
          return;
        }
        selectedFiles.push(file);
      }
      setError(null);
      setFiles(selectedFiles);
    }
  };

  const onUploadClick = async () => {
    if (!files.length) {
      alert('Por favor, seleccione al menos un archivo');
      return;
    }

    setIsLoading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await uploadAndAssignFile(file);
      }
      alert('Archivos subidos exitosamente');
    } catch (error) {
      setError(`Error al subir los archivos: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Input placeholder="MFTO" onChange={(e) => setSearchTerm(e.target.value)} />
      <Input placeholder="PLACA" onChange={(e) => setSearchPlaca(e.target.value)} />
      <Button onClick={handleSearch}>Buscar</Button>
      {role === 'admin' && (
        <Upload {...uploadProps}>
          <Button>
            <Spin spinning={isUploading}>
              <UploadOutlined />
              Subir archivo Excel
            </Spin>
          </Button>
          <input type="file" accept=".png,.pdf" multiple onChange={onFileChange} />
          <button onClick={onUploadClick} disabled={isLoading}>
            {isLoading ? 'Subiendo...' : 'Subir nota vieja'}
          </button>
          {error && (
          <p>
            Error:
            {' '}
            {error}
          </p>
          )}
        </Upload>
      )}
      <Table dataSource={data} columns={columns} pagination={false} />
      <Pagination
        current={currentPage}
        total={totalPages * PAGESIZE}
        pageSize={PAGESIZE}
        onChange={(page) => {
          fetchData(true);
        }}
      />
      <Modal title="Editar Registro" open={editModalVisible} onOk={handleSaveChanges} onCancel={handleCloseEditModal}>
        {updatedRecord ? (
          <Form>
            <Form.Item label="MFTO">
              <Input value={updatedRecord.MFTO} onChange={(e) => handleInputChange(e, 'MFTO')} />
            </Form.Item>

            <Form.Item label="PLACA">
              <Input value={updatedRecord.PLACA} onChange={(e) => handleInputChange(e, 'PLACA')} />
            </Form.Item>

            <Form.Item label="PROPIETARIO">
              <Input value={updatedRecord.PROPIETARIO} onChange={(e) => handleInputChange(e, 'PROPIETARIO')} />
            </Form.Item>

            <Form.Item label="DOCUMENTO">
              <Input value={updatedRecord.DOCUMENTO} onChange={(e) => handleInputChange(e, 'DOCUMENTO')} />
            </Form.Item>

            <Form.Item label="FLETE PAGADO">
              <Input value={updatedRecord['FLETE PAGADO']} onChange={(e) => handleInputChange(e, 'FLETE PAGADO')} />
            </Form.Item>

            <Form.Item label="ANTICIPOS">
              <Input value={updatedRecord.ANTICIPOS} onChange={(e) => handleInputChange(e, 'ANTICIPOS')} />
            </Form.Item>

            <Form.Item label="RETENCIONES ICA 5*1000 / FUENTE 1%">
              <Input value={updatedRecord['RETENCIONES ICA 5*1000 / FUENTE 1%']} onChange={(e) => handleInputChange(e, 'RETENCIONES ICA 5*1000 / FUENTE 1%')} />
            </Form.Item>

            <Form.Item label="POLIZA / ESTAMPILLA">
              <Input value={updatedRecord['POLIZA / ESTAMPILLA']} onChange={(e) => handleInputChange(e, 'POLIZA / ESTAMPILLA')} />
            </Form.Item>

            <Form.Item label="FALTANTE / O DAÑO EN LA MERCANCIA">
              <Input value={updatedRecord['FALTANTE / O DAÑO EN LA MERCANCIA']} onChange={(e) => handleInputChange(e, 'FALTANTE / O DAÑO EN LA MERCANCIA')} />
            </Form.Item>

            <Form.Item label="VR. SALDO CANCELAR">
              <Input value={updatedRecord['VR. SALDO CANCELAR']} onChange={(e) => handleInputChange(e, 'VR. SALDO CANCELAR')} />
            </Form.Item>

            <Form.Item label="FECHA CONSIGNACION SALDO">
              <Input value={updatedRecord['FECHA CONSIGNACION SALDO']} onChange={(e) => handleInputChange(e, 'FECHA CONSIGNACION SALDO')} />
            </Form.Item>

          </Form>
        ) : null}
      </Modal>

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
      <Modal
        title="Agregar observación"
        open={observationModalVisible}
        onCancel={() => setObservationModalVisible(false)}
        okButtonProps={{ style: { backgroundColor: 'blue', borderColor: 'blue', color: 'white' } }} // Aquí se añade el estilo
        onOk={handleSaveObservation}
      >
        <Input
          placeholder="Observaciones"
          value={observation}
          onChange={handleObservationChange}
        />
      </Modal>

    </>
  );
};

export default Dashboard;
