import { useState } from 'react';
import FormularioLiquidacion from './FormularioLiquidacion';
import ResultadoInteres from './ResultadoInteres';
import { calcularInteres } from '../../JSC/calculadoraInteres';

const LiquidacionPagos = () => {
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
      <h2>Liquidación de Pagos</h2>
      <FormularioLiquidacion onSubmit={handleSubmit} />
      {result && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {['Calcular Interés', 'Aplicación', 'Distribución'].map((titulo) => (
            <ResultadoInteres 
              key={titulo}
              titulo={titulo}
              impuesto={result.impuesto} 
              sancion={result.sancion} 
              interes={result.interes} 
              total={result.total} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LiquidacionPagos;
