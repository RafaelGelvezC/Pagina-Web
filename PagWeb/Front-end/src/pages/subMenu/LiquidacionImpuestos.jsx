import { useState } from 'react';
import FormularioLiquidacion from './FormularioLiquidacion';
import ResultadoInteres from './ResultadoInteres';
import { calcularInteres } from '../../JSC/calculadoraInteres';
import '../../Styles/Formulario.css';

const LiquidacionImpuestos = () => {
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
      <h2>Liquidación de Impuestos</h2>
      <FormularioLiquidacion 
        onSubmit={handleSubmit}
        onReset={handleReset}  // Asegúrate de que esto está presente
      />
      {result && (
        <ResultadoInteres
          titulo="Resultado de Liquidación"
          impuesto={result.impuesto}
          sancionOriginal={result.sancionOriginal}
          sancionCalculada={result.sancionCalculada}
          interes={result.interes}
          total={result.total}
        />
      )}
    </div>
  );
};

export default LiquidacionImpuestos;