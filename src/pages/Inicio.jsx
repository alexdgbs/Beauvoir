import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();
  const handleProductNavigation = () => {
    navigate('/Productos');
  };

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
          srcSet="https://static.lefties.com/assets/public/69ff/3c6c/ea444e1590db/65bc5a92daac/A_1/A_1.webp?ts=1740485605654&w=1900"
        />
        {/*iPad/Tablet*/}
        <source
          media="(min-width: 641px) and (max-width: 1024px)"
          srcSet="https://static.lefties.com/assets/public/69ff/3c6c/ea444e1590db/65bc5a92daac/A_1/A_1.webp?ts=1740485605654&w=1900"
        />
        {/*Desktop*/}
        <img
          src="https://static.lefties.com/assets/public/5e16/bd95/04b346faafd1/f1670ba30eec/S_1/S_1.jpg?ts=1740485608161&w=1900"
          alt="Imagen principal"
          className="w-full object-cover h-full md:h-auto"
        />
      </picture>

      {/*Overlay*/}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            NOVEDADES
          </h1>
          <motion.button
            onClick={handleProductNavigation}
            className="rounded-full mt-4 md:mt-6 px-4 md:px-6 py-1.5 md:py-2 bg-white text-black text-xs md:text-sm font-medium hover:bg-black hover:text-white transition duration-300 tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VER AHORA
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Inicio;