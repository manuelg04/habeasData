/* eslint-disable react/jsx-indent */
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
        Somos una empresa dedicada a generar servicio en la modalidad de transporte de carga terrestre seca y a granel a nivel nacional, cien por ciento tercerizada. Contamos con personal idóneo para la prestación del servicio, comprometidos con la satisfacción de nuestros asociados de negocio en la cadena de abastecimiento y demás partes interesadas, así como el cumplimiento de los requisitos legales, normativos e internos aplicables, basándonos en las premisas de eficiencia, dedicación, puntualidad, calidad y seguridad; buscando siempre la mejora continua en cada uno de nuestros procesos ofreciendo soluciones rápidas, prácticas y oportunas.
        </Paragraph>
      </Panel>

      <Panel header="VISIÓN" key="2">
        <Paragraph className="text-lg leading-relaxed">
        En el 2025 TRANSPORTES MTM SERVICIOS TERCERIZADOS SAS, será reconocido en el mercado nacional en el transporte de carga terrestre por su cumplimiento y seguridad en la cadena de abastecimiento , enfocados en la consecución de vehículos adecuados para la prestación del servicio de manera oportuna, contando con asociados de negocio confiables que nos permitan mantener y mejorar la satisfacción de nuestros clientes. Nos proyectamos como una organización en crecimiento apoyados con la mejora continua de nuestros Sistema Integrado de Gestion en Seguridad BASC, Seguridad, salud en el trabajo y Seguridad Vial y el fortalecimiento de las competencias de nuestro personal para garantizar la eficacia en la operación.
        </Paragraph>
      </Panel>

      <Panel header="POLÍTICA DE SEGURIDAD" key="3">
        <Paragraph className="text-lg leading-relaxed">
        TRANSPORTES MTM SERVICIOS TERCERIZADOS S.A.S. empresa dedicada al transporte de carga terrestre seca y a granel a nivel nacional cien por ciento tercerizada, reconoce la importancia de mantener el control y la seguridad en la prestación del servicio; para lo cual desde la Gerencia y alta dirección nos comprometemos a:

Mantener la integridad de nuestros procesos, enfocados en la prevención de delitos de corrupción, soborno, lavado de activos y otros, que atenten contra la seguridad de la organización, la carga, trabajadores y nuestros asociados de negocio.
Identificar y Gestionar los riesgos propios de la organización en la prestación del servicio.
Cumplir con la normatividad nacional o requisitos legales vigentes aplicables a la organización y la prestación del servicio, incluidos los requisitos internos y código de ética conducta empresarial.
Orientar nuestros esfuerzos al mejoramiento continuo de nuestros procesos y del Sistema de Gestion de Control y Seguridad BASC- SGCS.
Adoptar y promover la seguridad en el uso de las tecnologías de información.
Proveer los recursos económicos, materiales y humanos para llevar a cabo las acciones planeadas desde Sistema de Gestion de Control y Seguridad BASC- SGCS.
Mantener la satisfacción de nuestros clientes y/o asociados de negocio y demás partes interesadas en la prestación del servicio.
Fortalecer las competencias y desempeño de nuestro personal y equipo de trabajo enfocado en el control interno y la seguridad en sus procesos.
La presente política tiene cobertura en todos sus centros de trabajo, dirigida a todos los trabajadores y asociados de negocio y es responsabilidad de cada uno cumplir con las normas y procedimientos establecidos.
        </Paragraph>
      </Panel>

      <Panel header="VALORES" key="4">
        <Paragraph className="text-lg leading-relaxed">
        Seguridad en las vías: Nos hemos especializado en ofrecer a nuestros clientes servicios seguros para todo tipo de mercancía pues cumplimos con los estándares y procedimientos  avalados por los entes de control, esto nos da toda las capacidades para ofrecer servicios que contribuyen a la seguridad vial.
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
