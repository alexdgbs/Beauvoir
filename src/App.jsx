// App.jsx
import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import NavbarInicio from './components/NavbarInicio';
import NavbarGeneral from './components/NavbarGeneral';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './App.css';

function App() {
  const location = useLocation();
  const isInicioOrContacto = location.pathname === "/" || location.pathname === "/Contacto"; 

  return (
    <div className="flex flex-col min-h-screen border">
       {isInicioOrContacto ? <NavbarInicio /> : <NavbarGeneral />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
