import { useState } from 'react';
import FormularioLiquidacion from './FormularioLiquidacion';
import ResultadoInteres from './ResultadoInteres';
import { calcularInteres } from '../../JSC/calculadoraInteres';

const LiquidacionImpuestos = () => {
  const [result, setResult] = useState(null);

  const handleSubmit = (formData) => {
    const impuesto = parseFloat(formData.valorImpuesto) || 0;
    const sancion = formData.tieneSancion === 'si' ? parseFloat(formData.valorSancion) || 0 : 0;
    const fechaPago = formData.fechaPago;

    if (isNaN(impuesto) || isNaN(sancion)) {
      console.error("Valores de impuesto o sanción no válidos.");
      return;
    }

    const { interes, total } = calcularInteres(impuesto, sancion, fechaPago);
    setResult({ impuesto, sancion, interes, total });
  };

  return (
    <div>
      <h2>Liquidación de Impuestos</h2>
      <FormularioLiquidacion onSubmit={handleSubmit} />
      {result && (
        <ResultadoInteres 
          titulo="Resultado de Liquidación" 
          impuesto={result.impuesto} 
          sancion={result.sancion} 
          interes={result.interes} 
          total={result.total} 
        />
      )}
    </div>
  );
};

export default LiquidacionImpuestos;
