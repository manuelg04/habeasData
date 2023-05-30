/* eslint-disable consistent-return */
import {
  Form, Input, Button, Typography, Checkbox, Modal, message, Card,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';
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

  const verificarUsuario = async (data) => {
    try {
      const response = await axios.get(`/api/verifyUsers?cedula=${data.cedula}`);
      // console.log('🚀 ~ response:', response);
      if (response.data) {
        message.error('El usuario ya se encuentra registrado');
        // console.log('verificando: entro por que era diferente de null');
        return true;
      }
      // console.log('verificando: entro por defecto');
      return false;
    } catch (error) {
      // message.error('Error al comprobar el usuario');
    }
  };

  const crearUsuario = async (data) => {
    // console.log('Ejecutando crear usuario');
    try {
      await axios.post('/api/saveUsers', data);
      message.success('Usuario creado correctamente');
    } catch (error) {
      message.error('Error al crear el usuario');
    }
  };

  const sendEmail = async (dataForm) => {
    try {
      // message.success('Su información ha sido enviada, gracias por confiar en transportes mtm');
      await axios.post('/api/sendEmail', dataForm);
    } catch (error) {
      // message.error('Hubo un error al enviar la información, por favor intente nuevamente');
    }
  };

  const VerificarData = async () => {
    form.submit();
    setIsConfirmModalVisible(false); // Cerrar modal
  };

  const handleVerify = () => {
    setIsConfirmModalVisible(false);
  };

  const confirmarDatos = () => {
    setFormValues(form.getFieldsValue());
    setIsConfirmModalVisible(true);
  };
  const onFinish = async (values: Usuario) => {
    // console.log('Ejecutando OnFinish');
    const existe = await verificarUsuario(values);
    // console.log('🚀 ~ existe:', existe);
    // Siempre enviar el correo
    // console.log('Se envia el email ahora se va verificar si existe el usuario o no');
    if (existe === false) {
      // console.log('El usuario no existe por lo tanto se crea');
      await crearUsuario(values);
    }
    await sendEmail(values);

    const data = {
      nombre: values.nombre,
      cedula: values.cedula,
      celular: values.celular,
      correo: values.correo,
      acepto: values.acepto,
    };

    setFormValues(data);
    setIsConfirmModalVisible(true);
    // form.resetFields();
    // generatePdf(data);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5',
    }}
    >
      <Title level={2} style={{ color: '#003a8c', marginBottom: '2em' }}>Formulario para el control Política Tratamiento de datos - Habeas Data</Title>
      <Card style={{ width: '60%', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '15px' }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          layout="vertical"
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
          <Modal
            title="Confirmación de información"
            open={isConfirmModalVisible}
            onOk={VerificarData}
            onCancel={handleVerify}
            cancelText="Cancelar"
            okText="Enviar"
          >
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
              <Button
                type="primary"
                block
                onClick={() => {
                  form.validateFields()
                    .then(() => {
                      confirmarDatos();
                      return null;
                    }).catch(() => null);
                }}
                style={{ marginTop: '2em' }}
              >
                Confirmar
              </Button>

            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
      <Modal title="Políticas de protección de datos personales" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {/* Aquí puedes poner el contenido de tu modal */}
      </Modal>
    </div>
  );
}
