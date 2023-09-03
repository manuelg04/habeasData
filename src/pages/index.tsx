/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
// @ts-ignore

import {
  Typography, Image, Modal,
} from 'antd';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { fadeIn } from '../../variants';

const { Title, Paragraph } = Typography;

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="bg-primary/60 h-full">
      <Modal
        title={<div style={{ textAlign: 'center' }}>Información Importante</div>}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
      >
        <Image src="flota3.jpeg" alt="Información" width="100%" />
      </Modal>
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
          {/* title */}
          <motion.h1
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            TRANSPORTES MTM SERVICIOS
            {' '}
            <br />
            {' '}
            S.A.S.
            {' '}
            <span className="text-accent ">TERCERIZADOS </span>
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn('down', 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            ¡Hemos renovado nuestra certificación por un año más! Estamos encantados de seguir ofreciendo un servicio de calidad.
          </motion.p>
          {/* btn */}
          <div className="flex justify-center xl:hidden relative" />
          <motion.div
            variants={fadeIn('down', 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center py-10">
          <Title level={2} className="text-center">Nuestros Servicios</Title>
          <Paragraph className="text-center">
            Contamos con una amplia experiencia en el sector de transporte de carga y logística, ofreciendo servicios de calidad y seguridad.
          </Paragraph>

        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center py-10">
          <Title level={2} className="text-center">Sobre MTM</Title>
          <Paragraph className="text-center">
            Somos una empresa de transporte de carga y logística, con más de 10 años de experiencia en el sector. Contamos con una amplia flota de vehículos, que nos permite ofrecer un servicio de calidad y seguridad.
          </Paragraph>
        </div>
      </div>

    </div>

  );
};

export default Index;
