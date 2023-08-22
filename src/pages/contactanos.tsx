/* eslint-disable max-len */

import {
  Typography, Card, Form, Input, Button, Row, Col, Image, Space,
} from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Contactanos = () => (
  <div style={{
    padding: '2em',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh', // Aquí está el cambio
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
    {/* Aquí es donde insertaremos el mapa de Google */}

    {/* Resto de tu código... */}
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
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {/* Card para David */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/fredy.jpeg" // Aquí va la URL de la imagen de David
              alt="David, nuestro abogado"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Freddy Cordero</Title>
            <Text>Director comercial Zona Bogotá </Text>
            <Button type="primary" icon={<WhatsAppOutlined />} href="https://wa.me/573173666370" target="_blank">
              Contáctame!
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {/* Card para Juan */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/camimontoya.jpeg" // Aquí va la URL de la imagen de Juan
              alt="Juan, nuestro arquitecto"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Maria Camila Montoya</Title>
            <Text> Directora de zona Valle del cauca, Buenaventura, Pasto, Popayan</Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {/* Card para David */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/jairoliza.jpeg" // Aquí va la URL de la imagen de David
              alt="David, nuestro abogado"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Jairo Lizarazo</Title>
            <Text>Director comercial Zona costa y centro del pais </Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {/* Card para David */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/rosellon.jpeg" // Aquí va la URL de la imagen de David
              alt="David, nuestro abogado"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Sergio Rosellon </Title>
            <Text>Director de zona Cartagena, Barranquilla, Santa Marta y Santander </Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {/* Card para David */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/julian.jpeg" // Aquí va la URL de la imagen de David
              alt="David, nuestro abogado"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Julian Hernandez</Title>
            <Text>Director de zona magdalena medio y apoyo nacional </Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {/* Card para David */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/manuelsuarez.jpeg" // Aquí va la URL de la imagen de David
              alt="David, nuestro abogado"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Manuel Suarez</Title>
            <Text>Director de zona Bucaramanga </Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {/* Card para David */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/carolina.jpeg" // Aquí va la URL de la imagen de David
              alt="David, nuestro abogado"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Carolina Cortes</Title>
            <Text>Director de Zona Bogotá 2 </Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {/* Card para David */}
          <Space direction="vertical">
            <Image
              width={200}
              src="/yeni.jpeg" // Aquí va la URL de la imagen de David
              alt="David, nuestro abogado"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <Title level={3}>Yenifer Balza</Title>
            <Text>Director de zona Cordoba, Guajira </Text>
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
