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
          srcSet="https://static.lefties.com/assets/public/8094/23d5/23254f86886c/33793ecd95bd/A_1/A_1.webp?ts=1741189350992&w=1900"
        />
        {/*iPad/Tablet*/}
        <source
          media="(min-width: 641px) and (max-width: 1024px)"
          srcSet="https://static.lefties.com/assets/public/8094/23d5/23254f86886c/33793ecd95bd/A_1/A_1.webp?ts=1741189350992&w=1900"
        />
        {/*Desktop*/}
        <img
          src="https://static.lefties.com/assets/public/bb02/7c12/4b2041179191/e67967725f32/S_1/S_1.jpg?ts=1741189352522&w=1900"
          alt="Imagen de contacto"
          className="w-full object-cover h-full md:h-auto"
        />
      </picture>

      {/*Overlay fijo*/}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            CONTÁCTANOS
          </h1>
          <p className="text-white mt-4 text-sm">
            ¡Estamos aquí para ayudarte!
          </p>
          <div>
            <motion.button
              className="rounded-full mt-4 md:mt-6 px-4 md:px-6 py-1.5 md:py-2 bg-white text-black text-xs md:text-sm font-medium hover:bg-black hover:text-white transition duration-300 tracking-wider"
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