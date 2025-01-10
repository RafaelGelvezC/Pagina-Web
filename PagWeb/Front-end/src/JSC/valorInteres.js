import { calcularDiasMensuales } from './diasMensuales';
import { calcularIntPeriodico } from './calcularIntPeriodico';

function valorInteres(fechaPago) {
  const formData = JSON.parse(localStorage.getItem('formData'));

  if (!formData || !formData.fechaVencimiento || !formData.valorImpuesto) {
    console.error("Datos incompletos.");
    return 0;
  }

  const diasMensuales = calcularDiasMensuales(formData.fechaVencimiento, fechaPago);
  console.log("Días mensuales calculados:", diasMensuales);

  const interesPeriodico = calcularIntPeriodico(fechaPago);
  console.log("Interés periódico calculado:", interesPeriodico);

  const valorImpuesto = parseFloat(formData.valorImpuesto);
  console.log("Valor del impuesto convertido a número:", valorImpuesto);

  const resultado = diasMensuales * interesPeriodico * parseFloat(formData.valorImpuesto);
  console.log("Resultado antes del redondeo:", resultado);

  const resultadoRedondeado = Math.round(resultado / 1000) * 1000;
  console.log("Resultado final redondeado:", resultadoRedondeado);

  return resultadoRedondeado;
}

export default valorInteres;