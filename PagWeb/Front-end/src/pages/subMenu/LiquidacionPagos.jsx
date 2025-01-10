import { useState } from 'react';
import FormularioLiquidacion from './FormularioLiquidacion';
import ResultadoInteres from './ResultadoInteres';
import { calcularInteres } from '../../JSC/calculadoraInteres';

const LiquidacionPagos = () => {
  const [result, setResult] = useState(null);

  // Función para manejar el envío del formulario
  const handleSubmit = (formData) => {
    const { interes, sancionOriginal, sancionCalculada, total } = calcularInteres(formData.fechaPago);
    
    setResult({ 
      impuesto: parseFloat(formData.valorImpuesto),
      sancionOriginal,
      sancionCalculada,
      interes,
      total
    });
  };

  // Función para manejar el reinicio del formulario
  const handleReset = () => {
    setResult(null); // Resetea el estado de los resultados
    console.log('Formulario y resultados reiniciados');
  };


  return (
    <div>
      <h2>Liquidación de Pagos</h2>
      <FormularioLiquidacion 
          onSubmit={handleSubmit}
          onReset={handleReset}  // Asegúrate de que esto está presente
      />
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
