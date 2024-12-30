import HistoricoTasas from './HistoricoTasas';

function esBisiesto(año) {
  return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
}

function obtenerDiasDelAño(año) {
  return esBisiesto(año) ? 366 : 365;
}

export function calcularIntPeriodico(fechaPago) {
  const fechaP = new Date(fechaPago);

  if (isNaN(fechaP.getTime())) {
    console.warn("La fecha de pago es inválida. Se usará una tasa predeterminada de 0.");
    return 0;
  }

  const año = fechaP.getFullYear();
  const mes = fechaP.getMonth() + 1; // Los meses son 0-indexed

  const clave = `${año}-${mes}`;
  const tasa = HistoricoTasas[clave];

  if (tasa === undefined) {
    console.warn(`No se encontró la tasa para ${clave}. Se usará una tasa predeterminada de 0.`);
    return 0;
  }

  const tasaDecimal = tasa / 100;
  const diasDelAño = obtenerDiasDelAño(año); // Usar la función para obtener los días del año
  
  // Calcular el interés periódico
  const intPeriodico = tasaDecimal / diasDelAño;

  // Mostrar todos los datos utilizados al final
  console.log("Datos utilizados para calcular el interés periódico:");
  console.log("Fecha de Pago:", fechaPago);
  console.log("Año:", año);
  console.log("Mes:", mes);
  console.log("Clave de tasa:", clave);
  console.log("Tasa encontrada:", tasa);
  console.log("Interés periódico calculado:", intPeriodico);

  return parseFloat(intPeriodico.toFixed(8));
}

export default calcularIntPeriodico;