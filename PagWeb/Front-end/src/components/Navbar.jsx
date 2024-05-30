import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [dropdowns, setDropdowns] = useState({
    productos: false,
    tramites: false,
    cultura: false
    });

    const toggleDropdown = (menu) => {
    setDropdowns({
        ...dropdowns,
        [menu]: !dropdowns[menu]
    });
    };

    const closeDropdown = (menu) => {
    setDropdowns({
        ...dropdowns,
        [menu]: false
    });
    };

    return (
    <nav>
        <div className="logo">Logo</div>
        <ul>
        <li>
            <Link to="/">Inicio</Link>
        </li>
        <li onMouseEnter={() => toggleDropdown('productos')} onMouseLeave={() => closeDropdown('productos')}>
            Productos
            {dropdowns.productos && (
            <ul>
                <li><Link to="/producto/liquidacion-impuestos">Liquidación de Impuestos</Link></li>
                <li><Link to="/producto/liquidacion-pagos">Liquidación de Pagos</Link></li>
            </ul>
            )}
        </li>
        <li onMouseEnter={() => toggleDropdown('tramites')} onMouseLeave={() => closeDropdown('tramites')}>
            Trámites Fáciles
            {dropdowns.tramites && (
            <ul>
                <li><Link to="/tramites/impuestos">Impuestos</Link></li>
                <li><Link to="/tramites/buzon-pqrs">Buzón y PQRS</Link></li>
                <li><Link to="/tramites/rut-tips">RUT Tips</Link></li>
                <li><Link to="/tramites/devoluciones-compensaciones">Devoluciones y Compensaciones</Link></li>
                <li><Link to="/tramites/facilidades-sucesiones">Facilidades y Sucesiones</Link></li>
            </ul>
            )}
        </li>
        <li onMouseEnter={() => toggleDropdown('cultura')} onMouseLeave={() => closeDropdown('cultura')}>
            Cultura Tributaria
            {dropdowns.cultura && (
            <ul>
                <li><Link to="/cultura/dejas-inquietudes">Deja tus Inquietudes</Link></li>
            </ul>
            )}
        </li>
        <li>
            <Link to="/login">Inicio de Sesión</Link>
        </li>
        </ul>
    </nav>
    );
};

export default Navbar;