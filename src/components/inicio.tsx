/* eslint-disable max-len */
// Inicio.tsx
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Inicio = () => (
  <div style={{ padding: '2em' }}>
    <Card style={{ marginBottom: '1em' }}>
      <Title level={2}>Sobre MTM</Title>
      <Paragraph>
        Nos caracteriza nuestra responsabilidad y cumplimiento. Transportamos cualquier tipo de mercancía a nivel nacional, contamos con una amplia gama de vehículos y personal capacitado para tu servicio. Nuestra trayectoria y experiencia nos consolida en el mercado del transporte de carga terrestre.
      </Paragraph>
    </Card>
    <Card style={{ marginBottom: '1em' }}>
      <Title level={2}>Seguridad</Title>
      <Paragraph>
        En MTM contamos con una central de monitoreo satelital 24/7, nuestro personal realiza un riguroso seguimiento de la carga desde la partida hasta que llega a su destino.
      </Paragraph>
    </Card>
    <Card>
      <Title level={2}>Experiencia</Title>
      <Paragraph>
        Transporte en todos los tipos de vehículos, contamos con experiencia en turbos, sencillos, dobletroques, patinetas, tractomulas y transporte especial en camabaja.
      </Paragraph>
    </Card>
  </div>
);

export default Inicio;
