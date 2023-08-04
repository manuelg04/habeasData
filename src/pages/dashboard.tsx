/* eslint-disable no-nested-ternary */
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
  Upload, Button, message, Table, Input, Space, Modal, Spin, Popconfirm, Pagination, Form, DatePicker,
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
import Swal from 'sweetalert2';
import {
  uploadFile, db, uploadNonExcelFile, uploadAndAssignFile,
} from './api/controllers/firebase';
import { RootState } from '../redux/store';
import { COLECCION_MAIN } from '../constantes';

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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [updatedRecord, setUpdatedRecord] = useState({ ...selectedRecord }); // Crea un nuevo estado para manejar los cambios
  const [form] = Form.useForm();
  const [isUploadingExcel, setIsUploadingExcel] = useState(false);
  const [isUploadingLiquidacion, setIsUploadingLiquidacion] = useState(false);
  const [isUploadingPago, setIsUploadingPago] = useState(false);
  const PAGESIZE = 10;

  const handleUploadExcel = async (file) => {
    setIsUploadingExcel(true);
    try {
      if (!file) {
        message.error('No se ha seleccionado ningún archivo para subir.');
        return;
      }
      if (file && (file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))) {
        const fileUrl = await uploadFile(file);

        // Query the collection where 'MFTO' field matches the input 'mftoNumber'
        const q = query(collection(db, COLECCION_MAIN), where('MFTO', '==', mftoNumber));
        const querySnapshot = await getDocs(q);

        // If no such document exist, show error message
        if (querySnapshot.empty) {
          message.error(`No se encontró un documento con el número MFTO: ${mftoNumber}`);
          return;
        }

        // Assuming 'MFTO' field is unique within the collection, use the first document
        const docSnap = querySnapshot.docs[0];

        // Update the document with new file url
        await updateDoc(doc(db, COLECCION_MAIN, docSnap.id), {
          // Assuming that Excel files are used for 'urlliquidacion' field
          urlliquidacion: fileUrl,
        });

        message.success(`El archivo Excel se cargó correctamente. URL del archivo: ${fileUrl}`);
      } else {
        message.error('El archivo seleccionado no es un archivo Excel.');
      }
    } catch (error) {
      message.error(`Error al subir el archivo Excel: ${error}`);
    } finally {
      setIsUploadingExcel(false);
    }
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
      const q = query(collection(db, COLECCION_MAIN), where('MFTO', '==', mftoNumber));
      const querySnapshot = await getDocs(q);

      // If no such document exist, show error message
      if (querySnapshot.empty) {
        message.error(`No se encontró un documento con el número MFTO: ${mftoNumber}`);
        return;
      }

      // Assuming 'MFTO' field is unique within the collection, use the first document
      const docSnap = querySnapshot.docs[0];

      // Update the document with new observation
      await updateDoc(doc(db, COLECCION_MAIN, docSnap.id), {
        observaciones: observation,
      });

      message.success(`Observation saved successfully for MFTO number: ${mftoNumber}`);
      setObservationModalVisible(false);
    } catch (error) {
      message.error(`Error saving observation: ${error}`);
    }
  };

  const handleOpenModalForUpload = (type, mfto) => {
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

  const handleUploadLiquidacion = async (file, mfto) => {
    try {
      setIsUploading(true);
      if (!file) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se ha seleccionado ningún archivo para subir.',
        });
        return;
      }
      if (file.type === 'application/pdf') {
        const fileUrl = await uploadNonExcelFile(file);

        // Query the collection where 'MFTO' field matches the input 'mfto'
        const q = query(collection(db, COLECCION_MAIN), where('MFTO', '==', mfto));
        const querySnapshot = await getDocs(q);

        // If no such document exist, show error message
        if (querySnapshot.empty) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `No se encontró un documento con el número MFTO: ${mfto}`,
          });
          return;
        }

        // Assuming 'MFTO' field is unique within the collection, use the first document
        const docSnap = querySnapshot.docs[0];

        // Update the document with new file url
        await updateDoc(doc(db, COLECCION_MAIN, docSnap.id), {
          urlliquidacion: fileUrl,
        });

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La liquidación se cargó correctamente',
        });
      } else {
        message.error('El archivo seleccionado no es un PDF.');
      }
    } catch (error) {
      message.error(`Error al subir la liquidación: ${error}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadPago = async (file, pago) => {
    try {
      setIsUploadingPago(true);
      if (!file) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se ha seleccionado ningún archivo para subir.',
        });
        return;
      }
      if (file.type.startsWith('image/')) {
        const fileUrl = await uploadNonExcelFile(file);

        // Query the collection where 'MFTO' field matches the input 'mfto'
        const q = query(collection(db, COLECCION_MAIN), where('MFTO', '==', pago));
        const querySnapshot = await getDocs(q);

        // If no such document exist, show error message
        if (querySnapshot.empty) {
          message.error(`No se encontró un documento con el número MFTO: ${pago}`);
          return;
        }

        // Assuming 'MFTO' field is unique within the collection, use the first document
        const docSnap = querySnapshot.docs[0];

        // Update the document with new file url
        await updateDoc(doc(db, COLECCION_MAIN, docSnap.id), {
          // Assuming that image files are used for 'urlpago' field
          urlpago: fileUrl,
        });

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La liquidación se cargó correctamente',
        });
      } else {
        message.error('El archivo seleccionado no es una imagen.');
      }
    } catch (error) {
      message.error(`Error al subir el pago: ${error}`);
    } finally {
      setIsUploadingPago(false);
    }
  };

  const fetchData = async (newPage = false, mfto = '', placa = '') => {
    try {
      let q;

      if (newPage && lastDoc) {
        if (role === 'admin') {
          q = query(collection(db, COLECCION_MAIN), orderBy('MFTO'), startAfter(lastDoc), limit(PAGESIZE));
        } else {
          q = query(collection(db, COLECCION_MAIN), where('DOCUMENTO', '==', documento), orderBy('MFTO'), startAfter(lastDoc), limit(PAGESIZE));
        }
      } else if (role === 'admin') {
        q = query(collection(db, COLECCION_MAIN), orderBy('MFTO'), limit(PAGESIZE));
      } else {
        q = query(collection(db, COLECCION_MAIN), where('DOCUMENTO', '==', documento), orderBy('MFTO'), limit(PAGESIZE));
      }
      if (mfto !== '') {
        q = query(collection(db, COLECCION_MAIN), where('MFTO', '==', mfto));
      } else if (placa !== '') {
        // Consulta para PLACA
        q = query(collection(db, COLECCION_MAIN), where('PLACA', '==', placa));
      } else {
        // Consulta por defecto
        q = query(collection(db, COLECCION_MAIN), orderBy('MFTO'), limit(PAGESIZE));
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

      const collectionRef = collection(db, COLECCION_MAIN);
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

  const handleDeleteRecord = async (viaje) => {
    try {
      await deleteDoc(doc(db, COLECCION_MAIN, viaje.id));
      message.success(`El registro con el Manifiesto ${viaje.MFTO} fue eliminado correctamente.`);
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
    const values = form.getFieldsValue();
    try {
      const docRef = doc(db, COLECCION_MAIN, values.id);
      await updateDoc(docRef, values);
      message.success('Registro actualizado exitosamente');
    } catch (error) {
      message.error('Error al actualizar el registro');
    }
    setEditModalVisible(false);
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
      render: (text, record) => (
        <Space size="middle">
          {role === 'admin' && (
          <>
            <Upload
              name="file"
              accept=".pdf"
              customRequest={({ file }) => {
                handleUploadLiquidacion(file, record.MFTO);
              }}
              showUploadList={false}
            >
              <FileAddOutlined />
            </Upload>
            <Upload
              name="file"
              accept="image/*"
              customRequest={({ file }) => {
                handleUploadPago(file, record.MFTO);
              }}
              showUploadList={false}
            >
              <DollarCircleOutlined />
            </Upload>
          </>
          )}
          <EditOutlined
            onClick={() => {
              handleOpenModalForEdit(record.id);
            }}
          />
          <Popconfirm
            title={`¿Estás seguro de eliminar el registro del manifiesto ${record.MFTO}?`}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => {
              handleDeleteRecord(record);
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

  return (
    <>
      <Input placeholder="MFTO" onChange={(e) => setSearchTerm(e.target.value)} />
      <Input placeholder="PLACA" onChange={(e) => setSearchPlaca(e.target.value)} />
      <Button onClick={handleSearch}>Buscar</Button>
      {role === 'admin' && (
        <Upload
          accept=".xls,.xlsx"
          beforeUpload={(file) => {
            handleUploadExcel(file);
            return false; // return false so file won't auto upload
          }}
        >
          <Button>
            <Spin spinning={isUploading}>
              <UploadOutlined />
              Subir archivo Excel
            </Spin>
          </Button>
          {/* <input type="file" accept=".png,.pdf" multiple onChange={onFileChange} />
          <button onClick={onUploadClick} disabled={isLoading}>
            {isLoading ? 'Subiendo...' : 'Subir nota vieja'}
          </button>
          {error && (
          <p>
            Error:
            {' '}
            {error}
          </p>
          )} */}
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
        {updatedRecord && (
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSaveChanges}
            initialValues={updatedRecord}
          >
            <Form.Item hidden label="id" name="id" rules={[{ required: true, message: 'Por favor ingresa el MFTO.' }]}>
              <Input hidden />
            </Form.Item>
            <Form.Item label="Fecha Despacho" name="Fecha Despacho" rules={[{ required: true, message: 'Por favor ingresa la fecha despacho.' }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item label="MFTO" name="MFTO" rules={[{ required: true, message: 'Por favor ingresa el MFTO.' }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item label="PLACA" name="PLACA" rules={[{ required: true, message: 'Por favor ingresa la placa.' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="PROPIETARIO" name="PROPIETARIO" rules={[{ required: true, message: 'Por favor ingresa el nombre.' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="ANTICIPOS" name="ANTICIPOS" rules={[{ required: true, message: 'Por favor ingresa el anticipo.' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="FLETE PAGADO" name="FLETE PAGADO" rules={[{ required: true, message: 'Por favor ingresa el saldo.' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="RETENCIONES ICA 5*1000 / FUENTE 1%" name="RETENCIONES" rules={[{ required: true, message: 'Por favor ingresa el saldo.' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="POLIZA / ESTAMPILLA" name="POLIZA" rules={[{ required: true, message: 'Por favor ingresa el saldo.' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="FALTANTE / O DAÑO EN LA MERCANCIA" name="FALTANTE" rules={[{ required: true, message: 'Por favor ingresa si hubo daño a mercancia.' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="VR.SALDO CANCELAR" name=" VR. SALDO CANCELAR " rules={[{ required: true, message: 'Por favor ingresa el saldo cancelar' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="FECHA CONSIGNACION SALDO" name="FECHA CONSIGNACION SALDO" rules={[{ required: true, message: 'Por favor ingresa la fecha consignacion.' }]}>
              <Input />
            </Form.Item>

          </Form>
        ) }
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
