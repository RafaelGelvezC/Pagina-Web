import { calcularDiasMensuales } from './diasMensuales';
import { calcularIntPeriodico } from './calcularIntPeriodico';

function obtenerDatosFormulario() {
  const datos = localStorage.getItem('formularioData');
  return datos ? JSON.parse(datos) : null;
}

const validarFechas = (fechaVencimiento, fechaPago) => {
  if (!fechaVencimiento || !fechaPago) {
    console.error("Faltan fechas obligatorias: fechaVencimiento o fechaPago.");
    return false;
  }
  const fechaV = new Date(fechaVencimiento);
  const fechaP = new Date(fechaPago);
  if (isNaN(fechaV) || isNaN(fechaP)) {
    console.error("Fechas inválidas. No se pueden convertir a objetos Date.", {
      fechaVencimiento,
      fechaPago
    });
    return false;
  }
  if (fechaV > fechaP) {
    console.error("La fecha de vencimiento no puede ser posterior a la fecha de pago.", {
      fechaVencimiento,
      fechaPago
    });
    return false;
  }
  return true;
};

function redondearMiles(valor) {
  return Math.round(valor / 1000) * 1000;
}

function valorInteres() {
  const formData = obtenerDatosFormulario();
  if (!formData || !formData.fechaVencimiento || !formData.fechaPago || isNaN(formData.valorImpuesto)) {
    console.error("Faltan datos obligatorios en formData.", formData);
    return 0;
  }

  const fechaVencimiento = formData.fechaVencimiento; // '2021-03-15'
  const fechaPago = formData.fechaPago; // '2022-03-20'
  const valorImpuesto = parseFloat(formData.valorImpuesto); // Obtener el valor del impuesto y convertirlo a número

  // Validar fechas
  if (!validarFechas(fechaVencimiento, fechaPago)) {
    return 0;
  }
  
  // Calcular los días mensuales
  const diasMensuales = calcularDiasMensuales(fechaVencimiento, fechaPago);
  
  // Calcular el interés periódico basado en el mes y año de la fecha de pago
  const interesPeriodico = calcularIntPeriodico(fechaPago);

  if (isNaN(diasMensuales) || isNaN(interesPeriodico)) {
    console.error("Error en los cálculos debido a valores no válidos.", {
      diasMensuales,
      interesPeriodico
    });
    return 0;
  }

  // Realizar el cálculo solicitado
  let resultado = diasMensuales * interesPeriodico; // Multiplicar días mensuales por interés periódico
  resultado *= valorImpuesto; // Multiplicar por el valor del impuesto

  // Redondear el resultado a miles
  resultado = redondearMiles(resultado);
  console.log("Resultado Final del Interés:", resultado);

  // Mostrar todos los datos relevantes
  console.log("Datos del formulario:", formData);
  console.log("Días mensuales:", diasMensuales);
  console.log("Interés periódico:", interesPeriodico);
  console.log("Valor del impuesto:", valorImpuesto);
  console.log("Resultado:", resultado);

  return resultado;
}

export default valorInteres;