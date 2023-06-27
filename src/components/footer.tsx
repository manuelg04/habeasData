import {
  Layout, Row, Col, Typography, Divider,
} from 'antd';
import Image from 'next/image';

const { Footer } = Layout;
const { Title, Text } = Typography;

const MyFooter = () => (
  <Footer style={{
    textAlign: 'center',
    padding: '50px 0',
    backgroundColor: '#0D3C61',
    color: '#fff',
  }}
  >
    <Row justify="center" gutter={[16, 16]} align="middle">
      <Col>
        <Image src="/mintransporte-logo.png" alt="Logo 2" width={200} height={50} />
      </Col>
      <Col>
        <Image src="/logodefi.png" alt="Logo 1" width={100} height={100} />
      </Col>
    </Row>
    <Divider style={{ borderColor: '#fff' }} />
    <Title level={4} style={{ color: '#fff' }}>
      TRANSPORTES M.T.M. SERVICIO TERCERIZADO S.A.S.
    </Title>
    <Text style={{ color: '#fff' }}>Tel: (607) 6854599</Text>
    <br />
    <Text style={{ color: '#fff' }}>Calle 16 24-35 Oficina 301 - 302</Text>
    <br />
    <Text style={{ color: '#fff' }}>Edificio MAQROLL</Text>
    <br />
    <Text style={{ color: '#fff' }}>Barrio San Francisco</Text>
    <br />
    <Text style={{ color: '#fff' }}>Bucaramanga - Colombia</Text>
    <Divider style={{ borderColor: '#fff' }} />
    <Text style={{ color: '#fff' }}>© 2023 MTM Transportes. All Rights Reserved.</Text>
  </Footer>
);

export default MyFooter;
