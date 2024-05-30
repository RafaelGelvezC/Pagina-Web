import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import LiquidacionImpuestos from './pages/subMenu/LiquidacionImpuestos';
import LiquidacionPagos from './pages/subMenu/LiquidacionPagos'; // Asegúrate de importar el componente LiquidacionImpuestos
import LoginRegister from './pages/LoginRegister';
import './global.css';
// Importa otras páginas aquí

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/producto/liquidacion-impuestos" element={<LiquidacionImpuestos />} />
        <Route path="/producto/liquidacion-pagos" element={<LiquidacionPagos />} />
        {/* Define otras rutas aquí */}
      </Routes>
    </>
  );
};

export default App;

