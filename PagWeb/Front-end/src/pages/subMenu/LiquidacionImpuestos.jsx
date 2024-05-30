import { useState } from 'react';
import FormularioLiquidacion from './FormularioLiquidacion';
import ResultadoInteres from './ResultadoInteres';

const LiquidacionImpuestos = () => {
  const [result, setResult] = useState(null);

  const calcularInteres = (impuesto, sancion) => {
    return impuesto * 0.05 + sancion * 0.1;
  };

  const handleSubmit = (formData) => {
    const impuesto = parseFloat(formData.valorImpuesto);
    const sancion = formData.tieneSancion ? parseFloat(formData.valorSancion) : 0;
    const interes = calcularInteres(impuesto, sancion);
    const total = impuesto + sancion + interes;

    setResult({ impuesto, sancion, interes, total });
  };

  return (
    <div>
      <h2>Liquidación de Impuestos</h2>
      <FormularioLiquidacion onSubmit={handleSubmit} />
      {result && (
        <ResultadoInteres 
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