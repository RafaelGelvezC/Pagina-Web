import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initMenu } from './Menuinte/menuInteractivo'; // Importación de initMenu desde el archivo menuInteractivo
import '../Styles/Navb.css'; // Importación del archivo CSS para los estilos del Navbar

const Navbar = () => {
  // Definición del estado para controlar qué submenús están desplegados
  const [dropdowns, setDropdowns] = useState({
    productos: false,  // Estado inicial para el menú "Productos"
    tramites: false,   // Estado inicial para el menú "Trámites Fáciles"
    cultura: false     // Estado inicial para el menú "Cultura Tributaria"
  });

  // Función para alternar el estado de un submenú cuando se hace clic en él
  const toggleDropdown = (menu) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],  // Cambia el estado del menú especificado
    }));
  };

  // Función para cerrar todos los submenús
  const closeAllDropdowns = () => {
    setDropdowns({
      productos: false,
      tramites: false,
      cultura: false,
    });
  };

  // Llamada a la función initMenu para inicializar el menú interactivo
  initMenu();

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Función que cierra los submenús si se hace clic fuera del navbar
    const handleClickOutside = (event) => {
      // Verifica si el clic no se realizó dentro del elemento <nav>
      if (!event.target.closest('nav')) {
        closeAllDropdowns(); // Cierra todos los submenús
      }
    };

    // Añade un listener para detectar clics en cualquier parte del documento
    document.addEventListener('click', handleClickOutside);
    
    // Limpia el listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Dependencias vacías para que el efecto se ejecute solo una vez al montar

  return (
    <nav>
      <div>
        <div>Logo</div> 
      </div>
      <div>{/* Contenedor del logo */}
        <ul>
          <li>
            <Link to="/">Inicio</Link> {/* Enlace al inicio */}
          </li>
          <li onClick={() => toggleDropdown('productos')}> {/* Activa/desactiva el menú "Productos" */}
            <span>Productos</span>
            {dropdowns.productos && (
              <ul>
                {/* Submenú de "Productos" */}
                <li><Link to="/producto/liquidacion-impuestos">Liquidación de Impuestos</Link></li>
                <li><Link to="/producto/liquidacion-pagos">Liquidación de Pagos</Link></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown('tramites')}> {/* Activa/desactiva el menú "Trámites Fáciles" */}
            <span>Trámites Fáciles</span>
            {dropdowns.tramites && (
              <ul>
                {/* Submenú de "Trámites Fáciles" */}
                <li><Link to="/tramites/impuestos">Impuestos</Link></li>
                <li><Link to="/tramites/buzon-pqrs">Buzón y PQRS</Link></li>
                <li><Link to="/tramites/rut-tips">RUT Tips</Link></li>
                <li><Link to="/tramites/devoluciones-compensaciones">Devoluciones y Compensaciones</Link></li>
                <li><Link to="/tramites/facilidades-sucesiones">Facilidades y Sucesiones</Link></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown('cultura')}> {/* Activa/desactiva el menú "Cultura Tributaria" */}
            <span>Cultura Tributaria</span>
            {dropdowns.cultura && (
              <ul>
                {/* Submenú de "Cultura Tributaria" */}
                <li><Link to="/cultura/dejas-inquietudes">Deja tus Inquietudes</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/login">Inicio de Sesión</Link> {/* Enlace a la página de inicio de sesión */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
