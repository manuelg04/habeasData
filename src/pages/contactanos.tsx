/* eslint-disable max-len */

import {
  Typography, Card, Form, Input, Button, Row, Col, Image, Space,
} from 'antd';

const { Title, Text } = Typography;

const Contactanos = () => (
  <div style={{
    padding: '2em',
    backgroundColor: '#f0f2f5',
    height: '100vh',
  }}
  >
    <Title style={{ color: '#003a8c' }}>Contáctanos</Title>
    <Text style={{
      fontSize: '20px',
      lineHeight: '1.5',
    }}
    >
      Nuestra oficina principal está ubicada en la ciudad de Bucaramanga...
    </Text>
    <Card
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        textAlign: 'center',
        margin: '2em 0',
      }}
    >
      <Row justify="space-around" align="middle">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {/* Card para David */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/corporativo.jpg" // Aquí va la URL de la imagen de David
              alt="David, nuestro abogado"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>David</Title>
            <Text>¡Nuestro Abogado!</Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {/* Card para Juan */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/messi.jpg" // Aquí va la URL de la imagen de Juan
              alt="Juan, nuestro arquitecto"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Juan</Title>
            <Text>¡Nuestro Arquitecto!</Text>
          </Space>
        </Col>
      </Row>
    </Card>

    <Text style={{
      fontSize: '20px',
      lineHeight: '1.5',
    }}
    >
      Estaremos atentos a resolver tus inquietudes...
    </Text>

    <Row gutter={[16, 16]} style={{ marginTop: '2em' }}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
        >
          <Title level={3}>Escríbenos</Title>
          <Text style={{
            fontSize: '18px',
            lineHeight: '1.5',
          }}
          >
            Servicio al cliente:
            {' '}
            <a href="mailto:servicioalclientemtm@transportesmtm.com">servicioalclientemtm@transportesmtm.com</a>
          </Text>
          <Text style={{
            fontSize: '18px',
            lineHeight: '1.5',
          }}
          >
            Director comercial:
            {' '}
            <a href="mailto:dircomercial@transportesmtm.com">dircomercial@transportesmtm.com</a>
          </Text>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
        >
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
      </Col>
    </Row>
  </div>
);

export default Contactanos;
