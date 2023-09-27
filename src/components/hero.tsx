/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-children-prop */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ButtonPrimary from './misc/ButtonPrimary';
import getScrollAnimation from '../utils/getScrollAnimation';
import ScrollAnimationWrapper from './layout/ScrollAnimationWrapper';

const Hero = ({
  listUser = [
    {
      name: 'Conductores de Flota tercerizada',
      number: '100',
      icon: '/heroicons_sm-user.svg',
    },
    {
      name: 'Agencias de Cobertura nivel nacional',
      number: '11',
      icon: '/gridicons_location.svg',
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
      id="about"
    >
      <ScrollAnimationWrapper className={undefined}>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              TRANSPORTES MTM S.A.S.
              {' '}
              <strong>TERCERIZADOS</strong>
              .
            </h1>
            <p className="text-gray-500 mt-4 mb-6">
              Somos una empresa de transporte de carga y logística, con más de 10 años de experiencia en el sector. Contamos con una amplia flota de vehículos, que nos permite ofrecer un servicio de calidad y seguridad.
            </p>
            <ButtonPrimary addClass={undefined}>Consultar Viajes</ButtonPrimary>
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src="/logodefi.png"
                alt="MTM"
                quality={100}
                width={512}
                height={300}
                layout="responsive"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
        <ScrollAnimationWrapper
          className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10"
        >
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  <img src={listUsers.icon} className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-gray-700 font-bold">
                    {listUsers.number}
                    +
                  </p>
                  <p className="text-lg text-gray-800">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: 'blur(114px)' }}
        />
      </div>
    </div>
  );
};

export default Hero;
