/* eslint-disable max-len */
import {
  Typography, Card, Row, Col,
} from 'antd';

const { Title, Paragraph } = Typography;

const Index: React.FC = () => {
  const cardStyle = {
    margin: '50px auto',
    maxWidth: '500px',
    height: '400px',
    backgroundColor: '#4169E1',
    color: 'white',
    border: '3px solid #000080',
    borderRadius: '15px',
  };
  return (
    <div style={{ padding: '0 50px', marginTop: 64 }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        TRANSPORTES MTM SERVICIOS TERCERIZADOS S.A.S.
      </Title>

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Contamos con:"
            bordered
            style={cardStyle}
            headStyle={{ color: 'white' }}
          >
            <Paragraph style={{ color: 'white' }}>
              BASC -Business Alliance for Secure Commerce-,
              es una alianza empresarial internacional que
              promueve un comercio seguro en cooperación
              con gobiernos y organismos internacionales.
            </Paragraph>

            <ul style={{ color: 'white' }}>
              <li>PÓLIZAS de Mercancías y (RC) Responsabilidad Civil.</li>
              <li>SEGURIDAD 24/7 los 365 días del año.</li>
              <li>Mejoramiento Continuo.</li>
              <li>Calidad de Servicio</li>
              <li>Integridad Total</li>
              <li>Transparencia en todos nuestros procesos.</li>
              <li>Línea directa para servicio al cliente (607-6854599)</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="¿Quiénes Somos?"
            bordered
            style={cardStyle}
            headStyle={{ color: 'white' }}
          >
            <Paragraph style={{ color: 'white' }}>
              Somos una empresa 100% tercerizada ya que no contamos con flota propia, dedicada al
              transporte terrestre a nivel nacional de carga seca y a granel. Contando con una amplia
              gama de vehículos como: Turbos, Sencillos, Doble Troques, Patinetas, Tracto mulas, y
              Transportes Especial en Cama Bajas. Contando con sello de seguridad y confiabilidad en
              el mercado.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Index;
