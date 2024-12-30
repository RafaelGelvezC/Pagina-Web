/**
 * Calcula los días mensuales entre la fecha de vencimiento y la fecha de pago.
 * @param {string} fechaVencimientoStr - Fecha de vencimiento del impuesto.
 * @param {string} fechaPagoStr - Fecha de pago del impuesto.
 * @returns {number} - Total de días mensuales calculados.
 */
export const calcularDiasMensuales = (fechaVencimientoStr, fechaPagoStr) => {
  const fechaVencimiento = new Date(fechaVencimientoStr);
  const fechaPago = new Date(fechaPagoStr);

  // Validar que las fechas sean correctas
  if (isNaN(fechaVencimiento.getTime()) || isNaN(fechaPago.getTime())) {
    console.error("Una de las fechas es inválida.");
    return NaN;
  }

  // Calcular la diferencia en milisegundos
  const diferenciaMilisegundos = fechaPago - fechaVencimiento;

  // Convertir la diferencia a días
  const diasDiferencia = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

  console.log("Total de Días Mensuales Calculados:", diasDiferencia);

  return diasDiferencia;
};

