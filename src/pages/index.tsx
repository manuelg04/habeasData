import {
  Form, Input, Button, Typography, Checkbox, Modal, message,
} from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { Usuario } from '../tipos';

const { Title } = Typography;

export default function FormularioHabeasData() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [formValues, setFormValues] = useState<Usuario>({});
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
        await axios.get('/api/users');
      } catch (error) {
        message.error('Hubo un error al obtener la información, por favor intente nuevamente');
      }
    };

    fetchData();
  }, []);

  const VerificarData = async () => {
    setIsConfirmModalVisible(false);
    try {
      message.success('Su información ha sido enviada, gracias por confiar en transportes mtm');
      form.resetFields();
      await axios.post('/api/saveUsers', formValues);
      await axios.post('/api/sendEmail', formValues);
    } catch (error) {
      message.error('Hubo un error al enviar la información, por favor intente nuevamente');
    }
  };

  const handleVerify = () => {
    setIsConfirmModalVisible(false);
  };

  const onFinish = (values: Usuario) => {
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
      <Title
        level={2}
      >
        Formulario para el control Política Tratamiento de datos - Habeas Data

      </Title>
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
        <Modal title="Confirmación de información" open={isConfirmModalVisible} onOk={VerificarData} onCancel={handleVerify}>
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
              <Button type="text" onClick={showModal} style={{ color: 'blue' }}>políticas de protección de datos personales</Button>
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
