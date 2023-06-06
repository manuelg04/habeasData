/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-len */
// SobreMTM.tsx
import { PlusCircleTwoTone } from '@ant-design/icons';
import {
  Typography, Collapse, Button,
} from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const SobreMTM = () => (
  <div className="p-8 bg-gray-200 min-h-screen">
    <Title className="text-blue-800">Sobre MTM</Title>
    <Collapse
      defaultActiveKey={['1']}
      className="mt-4 bg-white rounded shadow-md"
      expandIcon={({ isActive }) => <PlusCircleTwoTone className={`transition-transform ${isActive ? 'transform rotate-180' : ''} w-5 h-5 text-blue-800`} />}
    >
      <Panel header="MISIÓN" key="1">
        <Paragraph className="text-lg leading-relaxed">
          Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
        </Paragraph>
      </Panel>

      <Panel header="VISIÓN" key="2">
        <Paragraph className="text-lg leading-relaxed">
          Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
        </Paragraph>
      </Panel>

      <Panel header="POLÍTICA DE SEGURIDAD" key="3">
        <Paragraph className="text-lg leading-relaxed">
          Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
        </Paragraph>
      </Panel>

      <Panel header="VALORES" key="4">
        <Paragraph className="text-lg leading-relaxed">
          Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre...
        </Paragraph>
      </Panel>

      {/* Puedes agregar más Panels si lo necesitas... */}
    </Collapse>
    <div className="text-center mt-8">
      <Button
        type="primary"
        shape="round"
        size="large"
        onClick={() => window.open('https://drive.google.com/file/d/1xtdWGBcE9Tfmab6_nflZRAL-eAhTq0yY/view?usp=drive_link', '_blank')}
        className="text-white bg-blue-800 hover:bg-blue-700 transition-colors"
      >
        Conoce nuestro portafolio
      </Button>
    </div>
  </div>
);

export default SobreMTM;
