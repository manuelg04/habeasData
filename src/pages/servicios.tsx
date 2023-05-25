/* eslint-disable max-len */
// Servicios.tsx
import { Typography, Card } from 'antd';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

const Servicios = () => (
  <div style={{ padding: '2em' }}>
    <Title>Nuestros servicios</Title>
    <Paragraph>
      Contamos con personal idóneo, capacitado y con toda la experiencia necesaria que se requiere para prestar el servicio público de transporte terrestre de carga a nivel nacional,  lo que contribuye al desarrollo tanto regional como nacional. Nos apoyamos en las últimas innovaciones tecnológicas para la capacitación constante y el aprendizaje de nuestro equipo.

      En MTM tenemos servicios idóneos para atender las necesidades de tu empresa. Podemos ofrecer soluciones en:
    </Paragraph>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2em' }}>
      <Card style={{ width: '30%' }}>
        <Title level={3}>Carga general</Title>
        <Image src="/carga-general.jpg" alt="Misión" width={500} height={300} />
        <Paragraph>
          Transporte especializado en Camabajas, carga extradimensionada, carga extrapesada y transporte de maquinaria...
        </Paragraph>
      </Card>
      <Card style={{ width: '30%' }}>
        <Title level={3}>Carga seca</Title>
        <Image src="/carga-seca.jpg" alt="Misión" width={500} height={300} />
        <Paragraph>
          Transporte de carga seca, en sus diferentes formas y con el cuidado necesario sin importar la delicadeza de esta.
        </Paragraph>
      </Card>
      <Card style={{ width: '30%' }}>
        <Title level={3}>Transporte portuario</Title>
        <Image src="/transporte-portuario.jpg" alt="Misión" width={500} height={300} />
        <Paragraph>
          Transporte de contenedores desde el interior hacia los puertos y viceversa.
        </Paragraph>
      </Card>
    </div>
  </div>
);

export default Servicios;
