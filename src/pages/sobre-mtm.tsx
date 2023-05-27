/* eslint-disable max-len */
// SobreMTM.tsx
import {
  Typography, Collapse,
} from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const SobreMTM = () => (
  <div style={{
    padding: '2em',
    backgroundColor: '#f0f2f5',
    height: '100vh',
  }}
  >
    <Title style={{ color: '#003a8c' }}>Sobre MTM</Title>
    <Collapse
      defaultActiveKey={['1']}
      style={{
        marginTop: '1em',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      }}
    >
      <Panel header="MISIÓN" key="1">
        <Paragraph style={{
          fontSize: '20px',
          lineHeight: '1.5',
        }}
        >
          Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
        </Paragraph>
      </Panel>

      <Panel header="VISIÓN" key="2">
        <Paragraph style={{
          fontSize: '20px',
          lineHeight: '1.5',
        }}
        >
          Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
        </Paragraph>
      </Panel>

      <Panel header="POLÍTICA DE SEGURIDAD" key="3">
        <Paragraph style={{
          fontSize: '20px',
          lineHeight: '1.5',
        }}
        >
          Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
        </Paragraph>
      </Panel>

      <Panel header="VALORES" key="4">
        <Paragraph style={{
          fontSize: '20px',
          lineHeight: '1.5',
        }}
        >
          Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
        </Paragraph>
      </Panel>

      {/* Puedes agregar más Panels si lo necesitas... */}
    </Collapse>
  </div>
);

export default SobreMTM;
