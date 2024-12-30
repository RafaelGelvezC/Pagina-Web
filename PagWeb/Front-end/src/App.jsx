import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginRegister from './pages/LoginRegister';
import LiquidacionImpuestos from './pages/subMenu/LiquidacionImpuestos';
import LiquidacionPagos from './pages/subMenu/LiquidacionPagos';
import './global.css';

// Componente principal que define la estructura de la aplicación
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/producto/liquidacion-impuestos" element={<LiquidacionImpuestos />} />
        <Route path="/producto/liquidacion-pagos" element={<LiquidacionPagos />} />
      </Routes>
    </>
  );
};

export default App;

