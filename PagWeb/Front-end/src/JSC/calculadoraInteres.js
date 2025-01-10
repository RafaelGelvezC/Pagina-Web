import valorInteres from './valorInteres';
import { calcularSancion } from './calcularSancion';

export const calcularInteres = (fechaPago) => {
  const formData = JSON.parse(localStorage.getItem('formData')) || {};

  if (!formData.valorImpuesto || !formData.fechaVencimiento) {
    console.error('Datos incompletos para el cálculo.');
    return { 
      interes: 0, 
      sancionOriginal: 0,
      sancionCalculada: 0, 
      total: 0 
    };
  }

  const interes = valorInteres(fechaPago);
  
  let sancionOriginal = 0;
  let sancionCalculada = 0;

  if (formData.tieneSancion === 'si') {
    sancionOriginal = parseFloat(formData.valorSancion) || 0;
    // Calcular la sanción actualizada
    sancionCalculada = calcularSancion(
      formData.fechaPresentacion,
      formData.fechaVencimiento,
      formData.tipoSancion,
      sancionOriginal
    );
  }
    
  // Calcular el total usando la sanción calculada
  const total = parseFloat(formData.valorImpuesto) + interes + sancionCalculada;

  // Para debugging
  console.log('Datos usados en el cálculo:', {
    valorImpuesto: parseFloat(formData.valorImpuesto),
    sancionOriginal,
    sancionCalculada,
    interes,
    total,
    tipoSancion: formData.tipoSancion
  });

  return { 
    interes,
    sancionOriginal,
    sancionCalculada,
    total
  };
};