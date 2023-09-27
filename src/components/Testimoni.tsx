/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  FaHandshake, FaShieldAlt, FaRoute, FaMap,
} from 'react-icons/fa';

interface TestimoniProps {
  listTestimoni?: {
    name: string;
    image: string;
    city: string;
    country: string;
    rating: string;
    testimoni: string;
  }[];
}

const Testimoni: React.FC<TestimoniProps> = ({
  listTestimoni = [
    // Añade 3 tarjetas más para tener un total de 4
    {
      name: 'Compromiso',
      testimoni: 'Generamos la calidad, la seguridad y la excelencia en cada viaje realizado.',
    },
    {
      name: 'Polizas rc',
      testimoni: 'Gran cobertura en cada una de las polizas generando seguridad y respaldo en la operación.',
    },
    {
      name: 'Gerenciamos rutas',
      testimoni: 'Monitoreo GPS 24/7, reportes telefonicos, trazabilidad y transparencia.',
    },
    {
      name: 'Cobertura a nivel nacional',
      testimoni: '11 agencias repartidas en todo territorio colombiano.',
    },
  ],
}) => {
  const settings = {
    dots: true,
    customPaging(i: number) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all " />
        </a>
      );
    },
    dotsClass: 'slick-dots w-max absolute mt-20',
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Mostrar 4 tarjetas a la vez
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef<Slider | null>(null);

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={sliderRef}
        className="flex items-stretch justify-items-stretch"
      >
        {listTestimoni.map((listTestimonis, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-gray-500 hover:border-blue-500 transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  {listTestimonis.name === 'Compromiso' && <FaHandshake size={50} />}
                  {listTestimonis.name === 'Polizas rc' && <FaShieldAlt size={50} />}
                  {listTestimonis.name === 'Gerenciamos rutas' && <FaRoute size={50} />}
                  {listTestimonis.name === 'Cobertura a nivel nacional' && <FaMap size={50} />}
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-gray-600 capitalize">
                      {listTestimonis.name}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {listTestimonis.city}
                      ,
                      {listTestimonis.country}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-left text-gray-800">

                {listTestimonis.testimoni}

              </p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white-500 transition-all text-orange-500 cursor-pointer"
            onClick={() => sliderRef.current?.slickPrev()}
          />
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white-500 transition-all text-orange-500 cursor-pointer"
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>
      </div>
    </>
  );
};

export default Testimoni;
