/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
// @ts-ignore

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { fadeIn } from '../../variants';

const Index = () => (
  <div className="bg-primary/90 h-full">
    <div className="w-full h-full bg-gradient-to-r text-yellow-400">
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
          <span className="text-yellow-400 ">TERCERIZADOS </span>
        </motion.h1>
        {/* subtitle */}
        <motion.p
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 text-white"
        >
          Somos una empresa de transporte de carga y logística, con más de 10 años de experiencia en el sector. Contamos con una amplia flota de vehículos, que nos permite ofrecer un servicio de calidad y seguridad.
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
      <div className="px-5 py-9 text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
        <motion.h1
          variants={fadeIn('down', 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h1"
        >
          CONOCE ALGUNOS DE NUESTROS
          {' '}
          <br />
          {' '}
          <span className="text-yellow-400 ">CLIENTES </span>
        </motion.h1>
        <div className="flex space-x-4">
          <Image
            className="flex-1 bg-inherit"
            src="/femsatest.png"
            alt="Picture of the author"
            width={300}
            height={100}
          />
          <Image
            className="flex-1 bg-inherit"
            src="/pretecorbg.png"
            alt="Picture of the author"
            width={300}
            height={100}
          />
          <Image
            className="flex-1 bg-inherit"
            src="/trafigurabg.png"
            alt="Picture of the author"
            width={300}
            height={100}
          />
          <Image
            className="flex-1 bg-inherit"
            src="/expocafebg.png"
            alt="Picture of the author"
            width={300}
            height={100}
          />
        </div>

      </div>
      <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
        {/* title */}
        <motion.h1
          variants={fadeIn('down', 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h1"
        >
          PORQUÉ ELEGIRNOS
          {' '}
          <br />
          {' '}

        </motion.h1>
        {/* subtitle */}
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
      <div className="flex flex-wrap justify-around">
        <div className="m-4 bg-white rounded-lg shadow-lg w-64">
          <div className="p-4">
            <h2 className="font-bold text-lg">LÍDERES EN EL SECTOR TRANSPORTE</h2>
            <p className="text-sm">Descripción o contenido del card.</p>
          </div>
        </div>
        <div className="m-4 bg-white rounded-lg shadow-lg w-64">
          <div className="p-4">
            <h2 className="font-bold text-lg">NUESTRAS CIFRAS NOS RESPALDAN</h2>
            <p className="text-sm">Descripción o contenido del card.</p>
          </div>
        </div>
        <div className="m-4 bg-white rounded-lg shadow-lg w-64">
          <div className="p-4">
            <h2 className="font-bold text-lg">TRASPASAMOS FRONTERAS</h2>
            <p className="text-sm">Descripción o contenido del card.</p>
          </div>
        </div>
        <div className="m-4 bg-white rounded-lg shadow-lg w-64">
          <div className="p-4">
            <h2 className="font-bold text-lg">COMPROMETIDOS CON EL CLIENTE</h2>
            <p className="text-sm">Descripción o contenido del card.</p>
          </div>
        </div>
        <div className="m-4 bg-white rounded-lg shadow-lg w-64">
          <div className="p-4">
            <h2 className="font-bold text-lg">GARANTIZAMOS NUESTRO SERVICIO</h2>
            <p className="text-sm">Descripción o contenido del card.</p>
          </div>
        </div>
        <div className="m-4 bg-white rounded-lg shadow-lg w-64">
          <div className="p-4">
            <h2 className="font-bold text-lg">GERENCIAMOS RUTAS</h2>
            <p className="text-sm">Descripción o contenido del card.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default Index;
