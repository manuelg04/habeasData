/* eslint-disable max-len */
// SobreMTM.tsx
import {
  Typography, Card, Row, Col,
} from 'antd';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

const SobreMTM = () => (
  <div style={{ padding: '2em' }}>
    <Card style={{ marginBottom: '1em' }}>
      <Title level={2}>MISIÓN</Title>
      <Row align="middle" justify="space-between">
        <Col xs={24} sm={24} md={10} lg={10} xl={8}>
          <Image src="/Mision.jpg" alt="Misión" width={500} height={300} />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={16} style={{ paddingLeft: '0em' }}>
          <Paragraph style={{ fontSize: '24px' }}>
            Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre seca y a granel a nivel nacional, cien por ciento tercerizada. Contamos con personal idóneo para la prestación del servicio, comprometidos con la satisfacción de nuestros asociados de negocio en la cadena de abastecimiento y demás partes interesadas, así como el cumplimiento de los requisitos legales, normativos e internos aplicables, basándonos en las premisas de eficiencia, dedicación, puntualidad, calidad y seguridad; buscando siempre la mejora continua en cada uno de nuestros procesos ofreciendo soluciones rápidas, prácticas y oportunas.
          </Paragraph>
        </Col>
      </Row>
    </Card>
    <Card style={{ marginBottom: '1em' }}>
      <Title level={2}>VISIÓN</Title>
      <Image src="/Vision.jpg" alt="Misión" width={500} height={300} />
      <Paragraph>
        En el 2025 TRANSPORTES MTM SERVICIOS TERCERIZADOS SAS, será reconocido en el mercado nacional...
      </Paragraph>
    </Card>
    <Card style={{ marginBottom: '1em' }}>
      <Title level={2}>POLÍTICA DE SEGURIDAD</Title>
      <Image src="/seguridad.jpg" alt="Misión" width={500} height={300} />
      <Paragraph>
        Avisos de seguridad...
      </Paragraph>
    </Card>
    <Card>
      <Title level={2}>VALORES</Title>
      <Paragraph>
        Seguridad en las vías...
      </Paragraph>
      <Paragraph>
        Responsabilidad...
      </Paragraph>
      <Paragraph>
        Calidad en el servicio...
      </Paragraph>
    </Card>
  </div>
);

export default SobreMTM;
