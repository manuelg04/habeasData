/* eslint-disable max-len */
import {
  Typography, Card, Row, Col,
} from 'antd';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

const Servicios = () => (
  <div style={{
    padding: '2em',
    backgroundColor: '#f0f2f5',
    height: '100vh',
  }}
  >
    <Title style={{ color: '#003a8c' }}>Nuestros servicios</Title>
    <Paragraph style={{
      fontSize: '20px',
      lineHeight: '1.5',
    }}
    >
      Contamos con personal idóneo, capacitado y con toda la experiencia necesaria que se requiere para prestar el servicio público de transporte terrestre de carga a nivel nacional,  lo que contribuye al desarrollo tanto regional como nacional. Nos apoyamos en las últimas innovaciones tecnológicas para la capacitación constante y el aprendizaje de nuestro equipo.

      En MTM tenemos servicios idóneos para atender las necesidades de tu empresa. Podemos ofrecer soluciones en:
    </Paragraph>

    <Row gutter={[16, 16]} style={{ marginTop: '2em' }}>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
        >
          <Title level={3}>Carga general</Title>
          <Image src="/carga-general.jpg" alt="Carga general" width={500} height={300} />
          <Paragraph style={{
            fontSize: '18px',
            lineHeight: '1.5',
          }}
          >
            Transporte especializado en Camabajas, carga extradimensionada, carga extrapesada y transporte de maquinaria. Con experiencia y el total cumplimiento de las leyes que nos rigen.
          </Paragraph>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
        >
          <Title level={3}>Carga seca</Title>
          <Image src="/carga-seca.jpg" alt="Carga seca" width={500} height={300} />
          <Paragraph style={{
            fontSize: '18px',
            lineHeight: '1.5',
          }}
          >
            Transporte de carga seca, en sus diferentes formas  y con el cuidado necesario sin importar la delicadeza de esta.
          </Paragraph>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
        >
          <Title level={3}>Transporte portuario</Title>
          <Image src="/transporte-portuario.jpg" alt="Transporte portuario" width={500} height={300} />
          <Paragraph style={{
            fontSize: '18px',
            lineHeight: '1.5',
          }}
          >
            Transporte de contenedores desde el interior hacia los puertos y viceversa.
          </Paragraph>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Servicios;
