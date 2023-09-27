/* eslint-disable no-use-before-define */
import Image from 'next/image';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import getScrollAnimation from '../utils/getScrollAnimation';
import ScrollAnimationWrapper from './layout/ScrollAnimationWrapper';

const features = [
  'Mejora Continua.',
  'Compromiso y Puntualidad.',
  'Transparencia en los procesos.',
  'Comunicacion abierta y asertiva.',
];

const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/BASC2023.jpg"
              alt="VPN Illustrasi"
              layout="responsive"
              quality={100}
              height={414}
              width={508}
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>

          <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
              SOMOS BASC
            </h3>
            <p className="my-2 text-gray-800">
              8 años consecutivos prestando un servicio de alta calidad
            </p>
            <ul className="text-black-500 self-start list-inside ml-8">
              {features.map((feature, index) => (
                <motion.li
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={feature}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  <div className="flex items-center">
                    {' '}
                    {/* Contenedor flex */}
                    <FaCheck className="mr-2 text-green-500" />
                    {' '}
                    {/* Ícono de check */}
                    {feature}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Feature;