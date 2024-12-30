import valorInteres from './valorInteres';

/**
 * Función para obtener los datos del formulario desde localStorage.
 * @returns {object|null} - Datos del formulario o null si no se encuentran.
 */
const obtenerDatosFormulario = () => {
  const datos = localStorage.getItem('formularioData');
  if (datos) {
    return JSON.parse(datos);
  }
  return null;
};

/**
 * Calcula el interés y el total a pagar.
 * @param {string} fechaPago - Fecha de pago del impuesto.
 * @returns {object} - Objeto con el interés calculado y el total a pagar.
 */
export const calcularInteres = (fechaPago) => {
  const formData = obtenerDatosFormulario(); 

  // Validar campos obligatorios básicos
  if (!formData || !formData.valorImpuesto || !formData.fechaVencimiento) {
    console.error("Faltan datos obligatorios en formData.", formData);
    return { interes: 0, total: 0 };
  }

  const { valorImpuesto, tieneSancion, valorSancion } = formData;
  const interes = valorInteres(fechaPago);
  const sancion = tieneSancion === 'si' ? parseFloat(valorSancion) || 0 : 0;
  const total = parseFloat(valorImpuesto) + sancion + interes;

  console.log('Resultado de calcularInteres:', { interes, total });
  return { interes, total };
};

export default calcularInteres;