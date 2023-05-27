/* eslint-disable max-len */
// SobreMTM.tsx
import {
  Typography, Card, Row, Col,
} from 'antd';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

const SobreMTM = () => (
  <div style={{
    padding: '2em',
    backgroundColor: '#f0f2f5',
    height: '100vh',
  }}
  >
    <Card style={{
      marginBottom: '1em',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    }}
    >
      <Title level={2}>MISIÓN</Title>
      <Row align="middle" justify="space-between">
        <Col xs={24} sm={24} md={10} lg={10} xl={8}>
          <Image src="/Mision.jpg" alt="Misión" width={500} height={300} />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={16} style={{ paddingLeft: '2em' }}>
          <Paragraph style={{
            backgroundColor: 'white',
            fontSize: '20px',
            lineHeight: '1.5',
          }}
          >
            Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
          </Paragraph>
        </Col>
      </Row>
    </Card>

    <Card style={{
      marginBottom: '1em',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    }}
    >
      <Title level={2}>VISION</Title>
      <Row align="middle" justify="space-between">
        <Col xs={24} sm={24} md={10} lg={10} xl={8}>
          <Image src="/Mision.jpg" alt="Misión" width={500} height={300} />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={16} style={{ paddingLeft: '2em' }}>
          <Paragraph style={{
            backgroundColor: 'white',
            fontSize: '20px',
            lineHeight: '1.5',
          }}
          >
            Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
          </Paragraph>
        </Col>
      </Row>
    </Card>
    <Card style={{
      marginBottom: '1em',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    }}
    >
      <Title level={2}>POLITICA DE SEGURIDAD</Title>
      <Row align="middle" justify="space-between">
        <Col xs={24} sm={24} md={10} lg={10} xl={8}>
          <Image src="/Mision.jpg" alt="Misión" width={500} height={300} />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={16} style={{ paddingLeft: '2em' }}>
          <Paragraph style={{
            backgroundColor: 'white',
            fontSize: '20px',
            lineHeight: '1.5',
          }}
          >
            Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
          </Paragraph>
        </Col>
      </Row>
    </Card>
    <Card style={{
      marginBottom: '1em',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    }}
    >
      <Title level={2}>VALORES</Title>
      <Row align="middle" justify="space-between">
        <Col xs={24} sm={24} md={10} lg={10} xl={8}>
          <Image src="/Mision.jpg" alt="Misión" width={500} height={300} />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={16} style={{ paddingLeft: '2em' }}>
          <Paragraph style={{
            backgroundColor: 'white',
            fontSize: '20px',
            lineHeight: '1.5',
          }}
          >
            Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
          </Paragraph>
        </Col>
      </Row>
    </Card>
    {/* El resto de las Cards siguen el mismo estilo... */}
  </div>
);

export default SobreMTM;
