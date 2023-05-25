import { Layout, Row, Col, Typography } from 'antd';
import Image from 'next/image';

const { Footer } = Layout;
const { Title, Text } = Typography;

const MyFooter = () => (
  <Footer style={{ textAlign: 'center', padding: '50px 0' }}>
    <Row justify="center" gutter={[16, 16]}>
      <Col>
        <Image src="/basc-logo.png" alt="Logo 1" width={100} height={100} />
      </Col>
      <Col>
        <Image src="/mintransporte-logo.png" alt="Logo 2" width={400} height={100} />
      </Col>
    </Row>
    <Title level={4}>TRANSPORTES M.T.M. SERVICIO TERCERIZADO S.A.S.</Title>
    <Text>Tel: (607) 6854599</Text>
    <br />
    <Text>Calle 16 24-35 Oficina 301 - 302</Text>
    <br />
    <Text>Edificio MAQROLL</Text>
    <br />
    <Text>Barrio San Francisco</Text>
    <br />
    <Text>Bucaramanga - Colombia</Text>
  </Footer>
);

export default MyFooter;
