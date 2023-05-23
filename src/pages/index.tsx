/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */

import {
  Form, Input, Button, Typography, Checkbox, Modal, message,
} from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

const { Title } = Typography;

export default function FormularioHabeasData() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users');
        console.log(response.data);
      } catch (error) {
        console.error('Hubo un error al recuperar los datos del usuario: ', error);
      }
    };

    fetchData();
  }, []);

  const VerificarData = async (values) => {
    console.log(values);
    form.submit();
    setIsConfirmModalVisible(false);
    try {
      message.success('Su información ha sido enviada, gracias por confiar en transportes mtm');
      form.resetFields();
      const responseSaveUser = await axios.post('/api/saveUsers', formValues);
      console.log('Datos del usuario guardados: ', responseSaveUser.data);
      const responseEmail = await axios.post('/api/sendEmail', formValues);
      console.log('Correo electrónico enviado: ', responseEmail.data);
    } catch (error) {
      console.error('Error al guardar los datos del usuario: ', error);
    }
  };

  const handleVerify = () => {
    setIsConfirmModalVisible(false);
  };

  const onFinish = (values) => {
    const data = {
      nombre: values.nombre,
      cedula: values.cedula,
      celular: values.celular,
      correo: values.correo,
      acepto: values.acepto,
    };

    setFormValues(data);
    setIsConfirmModalVisible(true);
  };

  return (

    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <Title level={2}>Formulario para el control Política Tratamiento de datos - Habeas Data</Title>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Nombre completo"
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingresa tu nombre completo!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Cedula"
          name="cedula"
          rules={[{ required: true, message: 'Por favor ingresa tu número de cedula!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Celular"
          name="celular"
          rules={[{ required: true, message: 'Por favor ingresa tu número de celular!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Correo electrónico"
          name="correo"
          rules={[
            {
              type: 'email',
              message: 'El correo electrónico no es válido!',
            },
            {
              required: true,
              message: 'Por favor ingresa tu correo electrónico!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Modal title="Confirmación de información" visible={isConfirmModalVisible} onOk={VerificarData} onCancel={handleVerify}>
          <p>
            Nombre completo:
            {' '}
            {formValues.nombre}
          </p>
          <p>
            Cedula:
            {' '}
            {formValues.cedula}
          </p>
          <p>
            Celular:
            {' '}
            {formValues.celular}
          </p>
          <p>
            Correo electrónico:
            {' '}
            {formValues.correo}
          </p>
        </Modal>

        <Form.Item>

          <Form.Item
            name="acepto"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Debes aceptar las políticas de protección de datos personales'))),
              },
            ]}
          >
            <Checkbox>
              Acepto las
              {' '}
              <a href="#" onClick={showModal} style={{ color: 'blue' }}>políticas de protección de datos personales</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
      <Modal title="Políticas de protección de datos personales" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {/* Aquí puedes poner el contenido de tu modal */}
      </Modal>
    </div>
  );
}
