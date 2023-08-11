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
  const [formValues, setFormValues] = useState<Usuario>({
    nombre: '',
    cedula: '',
    celular: '',
    correo: '',
    acepto: false,
    autorizo: false,
  });
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
      const response = await axios.get(`/api/controllers/verifyUsers?cedula=${data.cedula}`);
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
      await axios.post('/api/models/saveUsers', data);
      message.success('Usuario creado correctamente');
    } catch (error) {
      message.error('Error al crear el usuario');
    }
  };

  const sendEmail = async (dataForm) => {
    try {
      message.success('Su información ha sido enviada, gracias por confiar en transportes mtm');
      await axios.post('/api/helpers/sendEmail', dataForm);
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
      autorizo: values.autorizo,
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
      <Typography.Text style={{ color: '#003a8c', fontSize: '20px', textAlign: 'center' }}>TRANSPORTES MTM</Typography.Text>
      <Typography.Text style={{ color: '#003a8c', fontSize: '20px', textAlign: 'center' }}>SERVICIOS TERCERIZADOS S.A.S.</Typography.Text>
      <Typography.Text style={{ color: '#003a8c', fontSize: '20px', textAlign: 'center' }}>Nit 900.773.684 - 9</Typography.Text>
      <Typography.Text style={{
        color: '#003a8c', fontSize: '16px', textAlign: 'center', marginBottom: '1em',
      }}
      >
        Más información: servicioalclientemtm@transportesmtm.com
      </Typography.Text>
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
            hidden
          >
            <Row gutter={{
              xs: 8, sm: 16, md: 24, lg: 32,
            }}
            >
              <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  disabled
                  style={{ width: '100%', marginTop: '3em' }}
                />
              </Col>
            </Row>

          </Form.Item>
          <Form.Item
            label="Nombre completo"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre completo!' }]}
            style={{ marginBottom: '2em' }}
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
            okButtonProps={{ style: { backgroundColor: 'blue', borderColor: 'blue', color: 'white' } }}
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
            <p>
              Autorización a tomas de pruebas de alcoholemia y control antidoping:
              {' '}
              {formValues.autorizo ? 'Sí' : 'No'}
              {' '}
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
                {/*  */}
                {' '}
                <Button type="text" onClick={showModal} style={{ color: 'blue' }}>políticas de protección de datos personales</Button>
              </Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="autorizo"
            valuePropName="checked"
            style={{ marginBottom: '1em' }}
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Debes autorizar la toma de pruebas de alcoholemia y control antidoping'))),
              },
            ]}
          >
            <Checkbox>
              Autorización a tomas de pruebas de alcoholemia y control antidoping
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
              style={{
                marginTop: '2em',
                backgroundColor: '#1890ff', // o el color que desees para el fondo
                borderColor: '#1890ff', // o el color que desees para el borde
                color: '#fff',
              }}
            >
              Confirmar
            </Button>

          </Form.Item>
        </Form>
      </Card>
      <Modal title="Políticas de protección de datos personales" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>
          Al dar click en este recuadro, usted autoriza a Transportes MTM para el tratamiento de sus datos personales de acuerdo con la Ley Estatutaria 1581 de 2012 de Habeas Data en Colombia. Mediante este consentimiento, reconozco y acepto que Transportes MTM recolecte, almacene, procese y utilice mis datos personales con el propósito específico de brindar servicios de transporte.
        </p>

        <p>
          Al generar la presente autoriza y con el envió de documentos para el estudio de seguridad correspondiente, se entenderá igualmente la autorizacion por parte del propietario y/o poseedor del vehiculo, para el tratamiento de datos personales, con fines de consulta ante los diferentes entes de control y listas de seguridad.
        </p>

        <p>
          Entiendo que mis datos personales serán tratados de manera confidencial y segura, garantizando la privacidad y protección de mis derechos como titular de los datos. Asimismo, comprendo que tengo el derecho de acceder, rectificar, actualizar y suprimir mis datos personales, así como el derecho de oponerme al tratamiento de los mismos, de acuerdo con lo establecido en la Ley 1581 de 2012. Para ejercer estos derechos, podré contactar a Transportes MTM a través de los datos de contacto proporcionados en su política de habeas data.
        </p>
        <p>
          Declaro que los datos proporcionados son veraces, completos y actualizados, y que he sido debidamente informado sobre los fines y el alcance del tratamiento de mis datos personales por parte de Transportes MTM. Acepto que cualquier cambio en mis datos personales deberá ser notificado de manera oportuna a la empresa.
        </p>
        <p>
          En caso de tener alguna duda o inquietud acerca de la política de habeas data o del tratamiento de mis datos personales por parte de Transportes MTM, me comprometo a contactar a la empresa para obtener la información y aclaraciones necesarias.
        </p>
        <p>
          Por tanto, al marcar este recuadro y continuar con el uso de los servicios de Transportes MTM, autorizo expresamente a la empresa para el tratamiento de mis datos personales de acuerdo con lo establecido en la Ley Estatutaria 1581 de 2012 de Habeas Data en Colombia y en la política de privacidad correspondiente.
        </p>
      </Modal>

    </div>
  );
}
