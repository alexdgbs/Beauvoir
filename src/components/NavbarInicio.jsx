import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavbarInicio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    const initialCount = localStorage.getItem('cartCount') || 0;
    setCartCount(initialCount ? parseInt(initialCount) : 0);

    const handleCartUpdate = (event) => {
      setCartCount(event.detail.count);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      mobileMenuRef.current?.contains(event.target) ||
      toggleButtonRef.current?.contains(event.target)
    ) {
      return;
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const isActive = (path) =>
    location.pathname === path ?  'text-red-500' : 'text-black';

  const clearCart = () => {
    localStorage.setItem('cartCount', '0');
    localStorage.removeItem('cart');
    setCartCount(0);
    const cartEvent = new CustomEvent('cartUpdated', { detail: { count: 0 } });
    window.dispatchEvent(cartEvent);
    const resetInventoryEvent = new CustomEvent('inventoryReset');
    window.dispatchEvent(resetInventoryEvent);
  };

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const isAuthenticated = !!localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  return (
    <>
      <nav className="bg-transparent fixed w-full top-0 left-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 text-4xl tracking-wide">
          </div>
          {/*Menú escritorio*/}
          <div className="hidden md:flex items-center justify-between w-full">
            {/*Enlaces de navegación*/}
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  to="/"
                  className={`text-sm font-semibold text-white transition duration-200 flex items-center ${isActive(
                    '/'
                  )}`}
                >
                  INICIO
                </Link>
              </li>
              <li>
                <Link
                  to="/Productos"
                  className={`text-sm font-semibold text-white transition duration-200 flex items-center ${isActive(
                    '/Productos'
                  )}`}
                >
                  HOMBRE
                </Link>
              </li>
              <li>
                <Link
                  to="/Contacto"
                  className={`text-sm font-semibold text-white transition duration-200 flex items-center ${isActive(
                    '/Contacto'
                  )}`}
                >
                  CONTACTO
                </Link>
              </li>
            </ul>
            {/*Opciones de usuario y carrito*/}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold uppercase text-white">
                  {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-white transition duration-200"
                    title="CERRAR SESIÓN"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  to="/Login"
                  className="flex items-center text-white font-semibold transition duration-200"
                  title="Iniciar sesión"
                >
                  <span className="text-sm">INICIAR SESIÓN</span>
                </Link>
              )}
              <div className="h-6 w-px bg-white"></div>
              <div className="flex items-center">
                <button
                  className="relative flex items-center cursor-pointer"
                  onClick={clearCart}
                  onKeyDown={(e) => e.key === 'Enter' && clearCart()}
                  title="Vaciar carrito"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white transition duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="ml-1 text-white font-bold w-2 h-5 flex items-center justify-center text-sm">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/*Opciones para responsivo*/}
          <div className="md:hidden flex items-center">
            <button
  ref={toggleButtonRef}
  onClick={toggleMenu}
  className="p-1 focus:outline-none relative w-8 h-8 flex items-center justify-center"
  aria-label="Toggle menu"
  aria-expanded={isMenuOpen}
>
  <span
    className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${
      isMenuOpen ? 'rotate-45' : 'translate-y-1.5'
    }`}
    style={{ transformOrigin: 'center' }}
  ></span>
  <span
    className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${
      isMenuOpen ? '-rotate-45' : '-translate-y-1.5'
    }`}
    style={{ transformOrigin: 'center' }}
  ></span>
</button> 
<button
              className="relative flex items-center ml-2 cursor-pointer"
              onClick={clearCart}
              aria-label="Vaciar carrito"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="ml-1 text-white font-bold w-2 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>


          </div>
        </div>

        {/*Menú responsivo*/}
        <div
          ref={mobileMenuRef}
          className={`fixed md:hidden left-0 bottom-0 w-full transition-transform duration-300 transform ${
            isMenuOpen ? 'translate-y-0' : 'translate-y-full'
          } bg-white shadow-lg rounded-t-xl z-40`}
        >
          <ul className="flex flex-col p-4">
            <li className="py-3 border-b border-gray-100">
              <Link
                to="/"
                className={`block text-xs font-medium hover:text-gray-800 transition duration-200 ${isActive(
                  '/'
                )} flex items-center`}
                onClick={toggleMenu}
              >
                INICIO
              </Link>
            </li>
            <li className="py-3 border-b border-gray-100">
              <Link
                to="/Productos"
                className={`block text-xs font-medium hover:text-gray-800 transition duration-200 ${isActive(
                  '/Productos'
                )} flex items-center`}
                onClick={toggleMenu}
              >
               HOMBRE
              </Link>
            </li>
            <li className="py-3 border-b border-gray-100">
              <Link
                to="/Contacto"
                className={`block text-xs font-medium hover:text-gray-800 transition duration-200 ${isActive(
                  '/Contacto'
                )} flex items-center`}
                onClick={toggleMenu}
              >
                CONTACTO
              </Link>
            </li>
            <li className="py-3 mt-2">
              {isAuthenticated ? (
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-semibold text-gray-500 mb-3 flex items-center">
                    {userName}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center text-gray-500 hover:text-gray-800 transition duration-200 bg-gray-100 py-2 px-4 rounded-md"
                    title="Cerrar sesión"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="text-xs">CERRAR SESIÓN</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/Login"
                  className="flex items-center text-gray-500 hover:text-gray-800 transition duration-200 bg-gray-100 py-2 px-4 rounded-md"
                  title="Iniciar sesión"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-xs">INICIAR SESIÓN</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div className="hidden md:block"></div>
    </>
  );
};

export default NavbarInicio;
