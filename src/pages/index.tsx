/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
// @ts-ignore
import {
  CarTwoTone, SecurityScanTwoTone, SettingTwoTone,
} from '@ant-design/icons';
import {
  Typography, Row, Col, Image,
} from 'antd';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSpring, animated } from 'react-spring';
import styles from '../styles/Titles.module.css';

const { Title, Paragraph } = Typography;

const Index = () => {
  const titleProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500 });
  const textProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 900 });

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <animated.div style={titleProps}>
        <Title level={2} className="text-center text-blue-800" style={{ fontSize: '42px' }}>
          TRANSPORTES MTM SERVICIOS TERCERIZADOS S.A.S.
        </Title>
      </animated.div>
      <Row gutter={16} className="mt-16 justify-content-center align-items-center">
        <Col span={24} className="text-center">
          <animated.div style={textProps}>
            <Paragraph className={styles.paragraph}>
              ¡Hemos renovado nuestra certificación por un año más! Estamos encantados de seguir ofreciendo un servicio de calidad.
            </Paragraph>
          </animated.div>
        </Col>
      </Row>
      <Row className="mt-8 justify-content-center align-items-center">
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Image src="BASC2023.jpg" alt="Certificado" width="30%" />
        </Col>
      </Row>
      <Row className="mt-16">
        <Col span={24}>
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            <div>
              <img src="postes2.jpeg" alt="Imagen 1" />
              <p className="legend">Postes de concreto</p>
            </div>
            <div>
              <img src="carbon2.jpeg" alt="Imagen 2" />
              <p className="legend">Carbon</p>
            </div>
            <div>
              <img src="pres_mtm_1.jpg" alt="Imagen 3" />
              <p className="legend">Leyenda 3</p>
            </div>
          </Carousel>
        </Col>
      </Row>
      <Row className="mt-16">
        <Col span={24} className="text-center">
          <Title level={3} className="text-blue-800">
            <CarTwoTone className="h-6 w-6 inline-block mr-2 align-middle" />
            SOBRE MTM
          </Title>
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
          <Paragraph className="text-lg leading-relaxed">
            Transporte en todos los tipos de vehículos, contamos con experiencia en turbos, sencillos, dobletroques, patinetas, tractomulas y transporte especial en camabaja.
            {' '}

          </Paragraph>
        </Col>
      </Row>
      <Row className="mt-16">
        <Col span={24} className="text-center">
          <Title level={3} className="text-blue-800">
            NUESTROS CLIENTES
          </Title>
          <Slider
            dots
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={2000}
            cssEase="linear"
          >
            <div>
              <Image src="ternium.png" width={100} />
            </div>
            <div>
              <Image src="pretecor.png" width={100} />
            </div>
            <div>
              <Image src="femsa.png" width={100} />
            </div>
            <div>
              <Image src="capri.jpg" width={100} />
            </div>
            <div>
              <Image src="edinsa.jpg" width={100} />
            </div>
            <div>
              <Image src="haifa.png" width={100} />
            </div>
            <div>
              <Image src="diana.jpg" width={100} />
            </div>
          </Slider>
        </Col>
      </Row>

    </div>

  );
};

export default Index;
