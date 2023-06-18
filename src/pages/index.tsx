/* eslint-disable max-len */
import {
  CarTwoTone, CheckCircleTwoTone, SecurityScanTwoTone, SettingTwoTone,
} from '@ant-design/icons';
import {
  Typography, Card, Row, Col, Image,
} from 'antd';

const { Title, Paragraph } = Typography;

const Index = () => (
  <div className="p-8 mt-16">
    <Title level={2} className="text-center text-blue-800">
      TRANSPORTES MTM SERVICIOS TERCERIZADOS S.A.S.
    </Title>
    <Row gutter={16} className="mt-8">
      <Col span={12}>
        <Card
          title="Contamos con:"
          bordered
          className="mx-auto w-full h-full bg-blue-600 text-white border-4 border-blue-800 rounded-lg text-lg"
          headStyle={{ color: 'white' }}
          bodyStyle={{ overflowY: 'auto', height: '250px' }}
        >
          <Paragraph className="text-white text-xl leading-relaxed">
            BASC -Business Alliance for Secure Commerce-, es una alianza empresarial internacional que promueve un comercio seguro en cooperación con gobiernos y organismos internacionales.
          </Paragraph>

          <ul className="text-white">
            <li>
              <CheckCircleTwoTone />
              {' '}
              PÓLIZAS de Mercancías y (RC) Responsabilidad Civil.
            </li>
            <li>
              <CheckCircleTwoTone />
              {' '}
              SEGURIDAD 24/7 los 365 días del año.
            </li>
            <li>
              <CheckCircleTwoTone />
              {' '}
              Mejoramiento Continuo.
            </li>
            <li>
              <CheckCircleTwoTone />
              {' '}
              Calidad de Servicio
            </li>
            <li>
              <CheckCircleTwoTone />
              {' '}
              Integridad Total
            </li>
            <li>
              <CheckCircleTwoTone />
              {' '}
              Transparencia en todos nuestros procesos.
            </li>
            <li>
              <CheckCircleTwoTone />
              {' '}
              Línea directa para servicio al cliente (607-6854599)
            </li>
          </ul>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="¿Quiénes Somos?"
          bordered
          className="mx-auto w-full h-full bg-blue-600 text-white border-4 border-blue-800 rounded-lg text-lg"
          headStyle={{ color: 'white' }}
        >
          <Paragraph className="text-white text-xl leading-relaxed">
            Somos una empresa 100% tercerizada ya que no contamos con flota propia, dedicada al transporte terrestre a nivel nacional de carga seca y a granel. Contando con una amplia gama de vehículos como: Turbos, Sencillos, Doble Troques, Patinetas, Tracto mulas, y Transportes Especial en Cama Bajas. Contando con sello de seguridad y confiabilidad en el mercado.
          </Paragraph>
        </Card>
      </Col>
    </Row>
    <Row className="mt-16">
      <Col span={24} className="text-center">
        <Title level={3} className="text-blue-800">
          <CarTwoTone className="h-6 w-6 inline-block mr-2 align-middle" />
          SOBRE MTM
        </Title>
        <Image src="/pres_mtm_1.jpg" alt="Sobre MTM" className="object-cover w-full h-64 mb-4 rounded-lg shadow-md" width={1200} />
        <Paragraph className="text-lg leading-relaxed">
          Nos caracteriza nuestra responsabilidad y cumplimiento. Transportamos cualquier tipo de mercancía a nivel nacional, contamos con una amplia gama de vehículos y personal capacitado para tu servicio. Nuestra trayectoria y experiencia nos consolida en el mercado del transporte de carga terrestre.
        </Paragraph>
      </Col>
    </Row>
    <Row className="mt-16">
      <Col span={24} className="text-center">
        <Title level={3} className="text-blue-800">
          <SecurityScanTwoTone className="h-6 w-6 inline-block mr-2 align-middle" />
          SEGURIDAD
          {' '}

        </Title>
        <Image src="/manuelsegu.jpeg" alt="Seguridad" className="object-cover w-full h-64 mb-4 rounded-lg shadow-md" width={1200} />
        <Paragraph className="text-lg leading-relaxed">
          En MTM contamos con una central de monitoreo satelital 24/7, nuestro personal realiza un riguroso seguimiento de la carga desde la partida hasta que llega a su destino.
          Los vehículos cuentan con un sistema de rastreo GPS que nos permite ubicar su ruta. La carga llegará segura y a tiempo en su destino.
          {' '}

        </Paragraph>
      </Col>
    </Row>
    <Row className="mt-16">
      <Col span={24} className="text-center">
        <Title level={3} className="text-blue-800">
          <SettingTwoTone className="h-6 w-6 inline-block mr-2 align-middle" />
          EXPERIENCIA
          {' '}

        </Title>
        <Image src="/pres_mtm_2.jpg" alt="Seguridad" className="object-cover w-full h-64 mb-4 rounded-lg shadow-md" width={1200} />
        <Paragraph className="text-lg leading-relaxed">
          Transporte en todos los tipos de vehículos, contamos con experiencia en turbos, sencillos, dobletroques, patinetas, tractomulas y transporte especial en camabaja.
          {' '}

        </Paragraph>
      </Col>
    </Row>
  </div>
);

export default Index;
