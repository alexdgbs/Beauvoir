import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      className="relative w-full h-screen" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/*<picture> para cambiar la imagen en responsivo*/}
      <picture className="h-screen md:h-auto">
        {/*Celular*/}
        <source
          media="(max-width: 640px)"
          srcSet="https://static.lefties.com/assets/public/29ec/f667/bbe949e7b47f/71c8e35c7ef3/A_1/A_1.webp?ts=1742890679497&w=1900"
        />
        {/*iPad/Tablet*/}
        <source
          media="(min-width: 641px) and (max-width: 1024px)"
          srcSet="https://static.lefties.com/assets/public/29ec/f667/bbe949e7b47f/71c8e35c7ef3/A_1/A_1.webp?ts=1742890679497&w=1900"
        />
        {/*Desktop*/}
        <img
          src="https://static.lefties.com/assets/public/e3bf/420e/e2ab448b893d/3778214ed8c6/S_1/S_1.jpg?ts=1742890681894&w=1900"
          alt="Imagen de contacto"
          className="w-full object-cover h-full md:h-auto"
        />
      </picture>

      {/*Overlay fijo*/}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-white text-4xl border-b font-bold">
            CONTÁCTANOS
          </h1>
          <p className="text-white mt-4 text-xs font-semibold">
            ¡ESTAMOS AQUI PARA AYUDARTE!
          </p>
          <div>
            <motion.button
              className="mt-4 md:mt-6 px-4 md:px-6 py-2 bg-white text-black text-xs md:text-sm font-medium hover:bg-black hover:text-white transition duration-300 tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              beavouir@gmail.com
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;