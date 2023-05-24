/* eslint-disable max-len */
// Contactanos.tsx
import {
  Typography, Card, Form, Input, Button,
} from 'antd';

const { Title, Text } = Typography;

const Contactanos = () => (
  <div style={{ padding: '2em' }}>
    <Title>Contáctanos</Title>
    <Text>
      Nuestra oficina principal está ubicada en la ciudad de Bucaramanga. Puedes contactarnos a través de nuestros teléfonos, correo electrónico o este formulario.
    </Text>
    <Text>
      Estaremos atentos a resolver tus inquietudes, quejas y reclamos.
    </Text>

    <Card style={{ marginTop: '2em' }}>
      <Title level={3}>Escríbenos</Title>
      <Text>
        Servicio al cliente:
        {' '}
        <a href="mailto:servicioalclientemtm@transportesmtm.com">servicioalclientemtm@transportesmtm.com</a>
      </Text>
      <Text>
        Director comercial:
        {' '}
        <a href="mailto:dircomercial@transportesmtm.com">dircomercial@transportesmtm.com</a>
      </Text>
    </Card>

    <Card style={{ marginTop: '2em' }}>
      <Form>
        <Form.Item
          name="nombre"
          rules={[{ required: true, message: 'Por favor, ingresa tu nombre.' }]}
        >
          <Input placeholder="Tu nombre" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor, ingresa tu correo electrónico.', type: 'email' }]}
        >
          <Input placeholder="Tu correo electrónico" />
        </Form.Item>
        <Form.Item
          name="mensaje"
          rules={[{ required: true, message: 'Por favor, escribe un mensaje.' }]}
        >
          <Input.TextArea placeholder="Tu mensaje" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar mensaje
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
);

export default Contactanos;
