import { useState } from 'react';
import FormularioLiquidacion from './FormularioLiquidacion';
import ResultadoInteres from './ResultadoInteres';

const LiquidacionPagos = () => {
  const [result, setResult] = useState(null);

  const handleSubmit = (formData) => {
    const impuesto = parseFloat(formData.valorImpuesto);
    const sancion = formData.tieneSancion === 'si' ? parseFloat(formData.valorSancion) : 0;
    const interes = impuesto * 0.05 + sancion * 0.1;
    const total = impuesto + sancion + interes;

    setResult({ impuesto, sancion, interes, total });
  };

  return (
    <div>
      <h2>Liquidación de Pagos</h2>
      <FormularioLiquidacion onSubmit={handleSubmit} />
      {result && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ResultadoInteres 
            titulo="Calcular Interés"
            impuesto={result.impuesto} 
            sancion={result.sancion} 
            interes={result.interes} 
            total={result.total} 
          />
          <ResultadoInteres 
            titulo="Aplicación"
            impuesto={result.impuesto} 
            sancion={result.sancion} 
            interes={result.interes} 
            total={result.total} 
          />
          <ResultadoInteres 
            titulo="Distribución"
            impuesto={result.impuesto} 
            sancion={result.sancion} 
            interes={result.interes} 
            total={result.total} 
          />
        </div>
      )}
    </div>
  );
};

export default LiquidacionPagos;
