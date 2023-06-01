/* eslint-disable max-len */
/* eslint-disable consistent-return */
import {
  Form, Input, Button, Typography, Checkbox, Modal, message, Card, DatePicker, Row, Col,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
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
      message.error('Error al comprobar el usuario');
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
      message.success('Su información ha sido enviada, gracias por confiar en transportes mtm');
      await axios.post('/api/sendEmail', dataForm);
    } catch (error) {
      message.error('Hubo un error al enviar la información, por favor intente nuevamente');
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '1em',
    }}
    >
      <Title level={2} style={{ color: '#003a8c', marginBottom: '2em' }}>Formulario para el control Política Tratamiento de datos - Habeas Data</Title>
      <Card
        style={{
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          borderRadius: '15px',
        }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true, fecha: dayjs() }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Fecha y Hora"
            name="fecha"
            style={{ marginBottom: '3em' }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  disabled
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>

          </Form.Item>
          <Form.Item
            label="Nombre completo"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre completo!' }]}
            style={{ marginBottom: '5em' }}
          >
            <Input />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
              <Form.Item
                label="Cedula"
                name="cedula"
                rules={[{ required: true, message: 'Por favor ingresa tu número de cedula!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
              <Form.Item
                label="Celular"
                name="celular"
                rules={[{ required: true, message: 'Por favor ingresa tu número de celular!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
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
            </Col>
          </Row>
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
              style={{ marginBottom: '1em' }}
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Debes aceptar las políticas de protección de datos personales'))),
                },
              ]}
            >
              <Checkbox>
                Al dar click en este recuadro, usted autoriza a Transportes MTM para el tratamiento de sus datos personales de acuerdo con la Ley Estatutaria 1581 de 2012 de Habeas Data en Colombia. Mediante este consentimiento, reconozco y acepto que Transportes MTM recolecte, almacene, procese y utilice mis datos personales con el propósito específico de brindar servicios de transporte.

                Entiendo que mis datos personales serán tratados de manera confidencial y segura, garantizando la privacidad y protección de mis derechos como titular de los datos. Asimismo, comprendo que tengo el derecho de acceder, rectificar, actualizar y suprimir mis datos personales, así como el derecho de oponerme al tratamiento de los mismos, de acuerdo con lo establecido en la Ley 1581 de 2012. Para ejercer estos derechos, podré contactar a Transportes MTM a través de los datos de contacto proporcionados en su política de habeas data.

                Declaro que los datos proporcionados son veraces, completos y actualizados, y que he sido debidamente informado sobre los fines y el alcance del tratamiento de mis datos personales por parte de Transportes MTM. Acepto que cualquier cambio en mis datos personales deberá ser notificado de manera oportuna a la empresa.

                En caso de tener alguna duda o inquietud acerca de la política de habeas data o del tratamiento de mis datos personales por parte de Transportes MTM, me comprometo a contactar a la empresa para obtener la información y aclaraciones necesarias.

                Por tanto, al marcar este recuadro y continuar con el uso de los servicios de Transportes MTM, autorizo expresamente a la empresa para el tratamiento de mis datos personales de acuerdo con lo establecido en la Ley Estatutaria 1581 de 2012 de Habeas Data en Colombia y en la política de privacidad correspondiente.
                {' '}
                <Button type="text" onClick={showModal} style={{ color: 'blue' }}>políticas de protección de datos personales</Button>
              </Checkbox>
            </Form.Item>
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
        </Form>
      </Card>
      <Modal title="Políticas de protección de datos personales" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
}
