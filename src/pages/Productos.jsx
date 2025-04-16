import React, { useState, useEffect } from 'react';

function Productos() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [notification, setNotification] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [drawerError, setDrawerError] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');

  const initialProducts = [
    {
      id: 1,
      name: "LENTES RECT",
      category: "lentes",
      description: "Lentes de sol de cristal rectangular y montura de pasta con relieve.",
      price: "$199.00",
      numericPrice: 749.00,
      image: "https://static.lefties.com/assets/public/a03e/86e9/e39c40ff8239/0e2cc5a7de9b/01362509800-03-A9/01362509800-03-A9.jpg?ts=1741618315157&w=700&f=auto",
      // Agregamos colores disponibles
      colors: [
        { name: "NEGRO", code: "#000000" },
        { name: "GRIS", code: "#808080" },
        { name: "ROJO", code: "#FF0000" }
      ]
    },
    {
      id: 2,
      name: "PLAYERA CROCHET",
      category: "playeras",
      description: "Es de corte ligeramente holgado y está confeccionado en un tejido de textura crochet.",
      price: "$379.00",
      numericPrice: 1200.00,
      image: "https://static.lefties.com/assets/public/3b87/793e/1ca043f089f1/1a47e5762997/01012507251-02-A9/01012507251-02-A9.jpg?ts=1741335448732&w=700&f=auto",
      colors: [
        { name: "BLANCO", code: "#FFFFFF" },
        { name: "CREMA", code: "#FFFDD0" },
        { name: "ROSA", code: "#FFC0CB" }
      ]
    },
    {
      id: 3,
      name: "BERMUDA SLIM",
      category: "bermudas",
      description: "Bermuda tipo slim con cierre de botón y cremallera, es de corte ajustado.",
      price: "$399.00",
      numericPrice: 399.00,
      image: "https://static.lefties.com/assets/public/2154/a667/2b6747ed96fb/5ae7f59a8764/01992507707-02-a9/01992507707-02-a9.jpg?ts=1741622467640&w=524&f=auto",
      colors: [
        { name: "BLANCO", code: "#FFFFFF" },
        { name: "BEIGE", code: "#F5F5DC" },
        { name: "NEGRO", code: "#000000" }
      ]
    },
    {
      id: 4,
      name: "PANTALÓN JOGGER",
      category: "pantalones",
      description: "Pantalón tipo jogger con cintura elástica y cordón de ajuste a tono, cuenta con dos bolsillos laterales y uno trasero.",
      price: "$499.00",
      numericPrice: 499.00,
      image: "https://static.lefties.com/assets/public/c697/b837/d3274af18ee1/4b895133b162/01922507507-01-a9/01922507507-01-a9.jpg?ts=1741338839909&w=524&f=auto",
      colors: [
        { name: "GRIS", code: "#808080" },
        { name: "NEGRO", code: "#000000" },
        { name: "VERDE", code: "#A8D5BA" }
      ]
    },
    {
      id: 5,
      name: "PLAYERA OVERSIZE",
      category: "playeras",
      description: "Playera de manga corta y cuello redondo con estampados de bordado.",
      price: "$299.00",
      numericPrice: 299.00,
      image: "https://static.lefties.com/assets/public/01df/0f82/3ae74ac6bf77/d539ebda190c/01002537636-02-A9/01002537636-02-A9.jpg?ts=1741338075841&w=394&f=auto",
      colors: [
        { name: "BLANCO", code: "#FFFFFF" },
        { name: "NEGRO", code: "#000000" },
        { name: "ROSA", code: "#FFC0CB" }
      ]
    },
    {
      id: 6,
      name: "PANTALÓN CHINO",
      category: "pantalones",
      description: "Pantalón tipo chino con cierre frontal de botón y cremallera, cuenta con dos bolsillos laterales y dos traseros.",
      price: "$339.00",
      numericPrice: 339.00,
      image: "https://static.lefties.com/assets/public/f9e4/c280/b61e495f8b35/287cacdf755b/01922527712-01-A9/01922527712-01-A9.jpg?ts=1741335507991&w=700&f=auto",
      colors: [
        { name: "BEIGE", code: "#F5F5DC" },
        { name: "BLANCO", code: "#FFFFFF" },
        { name: "VERDE OLIVA", code: "#808000" }
      ]
    },
    {
      id: 7,
      name: "PANTALÓN BAGGY",
      category: "pantalones",
      description: "Pantalón largo de vestir de pernera ancha, cuenta con cierre frontal de botón y cremallera metálica.",
      price: "$649.00",
      numericPrice: 649.00,
      image: "https://static.lefties.com/assets/public/f71d/5112/6ad64cb7a26b/c2df407596ad/05921595800-03-A9/05921595800-03-A9.jpg?ts=1741336028911&w=700&f=auto",
      colors: [
        { name: "NEGRO", code: "#000000" },
        { name: "GRIS OSCURO", code: "#404040" },
        { name: "BLANCO", code: "#FFFFFF" }
      ]
    },
  ];

  const categories = [
    { id: "todos", label: "TODOS" },
    { id: "bermudas", label: "BERMUDAS" },
    { id: "pantalones", label: "PANTALONES" },
    { id: "playeras", label: "PLAYERAS" },
    { id: "lentes", label: "LENTES" }
  ];

  const [products] = useState(initialProducts);

  const filteredProducts = selectedCategory === "todos"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const openDrawer = (prod) => {
    setSelectedProductId(prod.id);
    setDrawerOpen(true);
    setQuantity(1);
    setDrawerError('');
    setSelectedSize('M'); 
    setSelectedColor(prod.colors && prod.colors.length > 0 ? prod.colors[0].name : '');
  };

  const currentProduct = products.find(p => p.id === selectedProductId);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setSelectedProductId(null);
      setQuantity(1);
      setDrawerError('');
    }, 300);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const addToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setDrawerError("Por favor, inicia sesión para agregar productos al carrito.");
      return;
    }

    if (!selectedColor && currentProduct?.colors?.length > 0) {
      setDrawerError("Por favor, selecciona un color.");
      return;
    }

    if (currentProduct && quantity > 0) {
      const existingItemIndex = cartItems.findIndex(
        item => item.id === currentProduct.id && 
               item.size === selectedSize && 
               item.color === selectedColor
      );
      
      if (existingItemIndex !== -1) {
        const newCartItems = [...cartItems];
        newCartItems[existingItemIndex].quantity += quantity;
        setCartItems(newCartItems);
      } else {
        setCartItems([...cartItems, {
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          numericPrice: currentProduct.numericPrice,
          image: currentProduct.image,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor
        }]);
      }
      
      closeDrawer();
      setNotification(`${quantity} ${currentProduct.name} ${selectedColor} AGREGADO AL CARRITO`);
      setTimeout(() => setNotification(''), 3000);
    } else {
      setDrawerError("LA CANTIDAD SELECCIONADA NO ES VÁLIDA.");
    }
  };
  
  useEffect(() => {
    if (notification) {
      setToastVisible(true);
      const timer = setTimeout(() => {
        setToastVisible(false);
        setTimeout(() => setNotification(''), 300);
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem('cartCount', totalItems.toString());
    const event = new CustomEvent('cartUpdated', { detail: { count: totalItems } });
    window.dispatchEvent(event);
  }, [cartItems]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [drawerOpen]);

  return (
    <div className="bg-white min-h-screen pt-16 relative">
      {/*Toast de notificación*/}
      {notification && (
        <div 
          className={`fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 
          bg-gray-800 text-white text-sm md:text-xs px-4 py-3 rounded-md shadow-lg z-50 
          max-w-sm mx-auto md:mx-0 flex items-center justify-center text-center
          transform transition-opacity duration-300 ease-in-out
          ${toastVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {notification}
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 pb-12">
        {/*Categorías para escritorio*/}
        <header className="hidden md:flex items-center py-4">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-10 h-10 text-black mr-4"
          >
            <div className="w-5 h-0.5 bg-black mb-2"></div>
            <div className="w-5 h-0.5 bg-black"></div>
          </button>
          {menuOpen &&
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => { setSelectedCategory(category.id); setMenuOpen(false); }}
                className={`rounded-full py-2 px-3 text-xs font-semibold hover:bg-black hover:text-white transition mr-4 ${selectedCategory === category.id ? "bg-black text-white" : "text-black"}`}
              >
                {category.label}
              </button>
            ))
          }
        </header>
        
        {/*Dropdown de categorías para responsivo*/}
        <div className="md:hidden py-4 relative">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMenu}
              className="w-full flex justify-between items-center px-4 py-2 bg-white border-1 rounded-full border-gray-700 text-xs"
            >
              <span>CATEGORÍA - {categories.find(cat => cat.id === selectedCategory)?.label}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${menuOpen ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          
          {menuOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${selectedCategory === category.id ? 'bg-gray-100 font-semibold' : ''}`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/*Grid de productos*/}
        <section className={`grid grid-cols-2 md:grid-cols-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {filteredProducts.map((prod) => (
            <button
              key={prod.id}
              onClick={() => openDrawer(prod)}
              className="cursor-pointer text-left bg-white overflow-hidden"
            >
              <img className="w-full h-auto object-covers" src={prod.image} alt={prod.name} />
              <div className="mb-2 p-2 mt-1">
                <p className="text-xs font-semibold text-black">{prod.name}</p>
                <p className="text-xs text-black font-sans">{prod.price}</p>
                {prod.colors && prod.colors.length > 0 && (
     <div className="flex mt-1 space-x-1 items-center">
      {prod.colors.slice(0, 2).map((color) => (
      <div 
        key={`color-preview-${color.name}`}
        className="w-3 h-3 rounded-full border border-gray-300" 
        style={{ backgroundColor: color.code }}
        title={color.name}
      ></div>
    ))}
    {prod.colors.length > 2 && (
      <div className="text-xs text-gray-500 flex items-center">+{prod.colors.length - 2}</div>
    )}
  </div>
)}
              </div>
            </button>
          ))}
        </section>

        {/*Overlay y Side Drawer!*/}
        <button 
          className={`fixed inset-0 bg-gray-50 bg-opacity-50 z-40 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
          onClick={closeDrawer}
        ></button>
        <div 
          className={`fixed inset-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}
        >
          {currentProduct && (
            <>
              {/*Header del Drawer*/}
              <div>
                <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center h-16">
                  <h3 className="text-sm font-medium text-black">
                    {currentProduct.name}
                  </h3>
                  <button 
                    onClick={closeDrawer} 
                    className="flex items-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-700 hover:text-gray-800" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/*Contenido*/}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-screen-xl mx-auto px-4">
                  <div className="h-64 md:h-80 bg-gray-white">
                    <img 
                      className="w-full h-full object-contain" 
                      src={currentProduct.image} 
                      alt={currentProduct.name} 
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase text-black mb-4">{currentProduct.description}</p>
                    <div className="text-xs font-sans text-black mb-6">{currentProduct.price}</div>
                    
                    {/*Selección de colores*/}
                    {currentProduct.colors && currentProduct.colors.length > 0 && (
                      <div className="mb-6">
                        <p className="block text-xs mb-2">COLOR: {selectedColor}</p>
                        <div className="flex flex-wrap gap-2">
                          {currentProduct.colors.map((color, index) => (
                            <button
                              key={`color-${color.name}`}
                              onClick={() => setSelectedColor(color.name)}
                              className={`w-6 h-6 rounded-full border-2 transition ${selectedColor === color.name ? 'border-black' : 'border-gray-300'}`}
                              style={{ backgroundColor: color.code }}
                              title={color.name}
                            ></button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/*Selección de tallas*/}
                    <div className="mb-4">
                      <p className="block text-xs font-semibold mb-1">Talla:</p>
                      <div className="flex space-x-2">
                        {["S", "M", "L", "XL"].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-2 py-1 text-xs border transition hover:bg-black hover:text-white ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/*Mensaje de error*/}
                    {drawerError && (
                      <div className="mb-4 text-xs text-red-600 uppercase">
                        {drawerError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/*Footer del Drawer*/}
              <div className="border-t">
                <div className="max-w-screen-xl mx-auto px-4 p-4 bg-white">
                  <div className="flex items-center mb-6">
                    <span className="text-xs font-semibold mr-4">CANTIDAD:</span>
                    <div className="text-xs font-semibold flex items-center border-b border-gray-700">
                      <button 
                        onClick={decreaseQuantity}
                        className="px-3 py-2 text-black hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-2">{quantity}</span>
                      <button 
                        onClick={increaseQuantity}
                        className="px-3 py-1 text-black hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={addToCart}
                    className=" rounded-full w-full text-xs bg-black text-white py-2 px-4 transition"
                  >
                    AGREGAR AL CARRITO
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Productos;