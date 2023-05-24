/* eslint-disable max-len */
// Servicios.tsx
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Servicios = () => (
  <div style={{ padding: '2em' }}>
    <Title>Nuestros servicios</Title>
    <Paragraph>
      Contamos con personal idóneo, capacitado y con toda la experiencia necesaria que se requiere para prestar el servicio público de transporte terrestre de carga a nivel nacional...
    </Paragraph>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2em' }}>
      <Card style={{ width: '30%' }}>
        <Title level={3}>Carga general</Title>
        <Paragraph>
          Transporte especializado en Camabajas, carga extradimensionada, carga extrapesada y transporte de maquinaria...
        </Paragraph>
      </Card>
      <Card style={{ width: '30%' }}>
        <Title level={3}>Carga seca</Title>
        <Paragraph>
          Transporte de carga seca, en sus diferentes formas y con el cuidado necesario sin importar la delicadeza de esta.
        </Paragraph>
      </Card>
      <Card style={{ width: '30%' }}>
        <Title level={3}>Transporte portuario</Title>
        <Paragraph>
          Transporte de contenedores desde el interior hacia los puertos y viceversa.
        </Paragraph>
      </Card>
    </div>
  </div>
);

export default Servicios;
