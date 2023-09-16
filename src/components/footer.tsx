import {
  Layout, Row, Typography, Divider, Col, Card,
} from 'antd';

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
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12} md={8}>
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
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Title level={4} style={{ color: '#fff' }}>CERTIFICACIONES</Title>
        <img src="/basc-logo.png" alt="Certification Logo" style={{ paddingLeft: '180px' }} />
        <br />
      </Col>
    </Row>
    <Divider style={{ borderColor: '#fff' }} />
    <Text style={{ color: '#fff' }}>© 2023 MTM Transportes. All Rights Reserved.</Text>
  </Footer>
);

export default MyFooter;
