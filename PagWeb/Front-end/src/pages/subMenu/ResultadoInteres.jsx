const ResultadoInteres = ({ 
  titulo, 
  impuesto, 
  sancionOriginal,
  sancionCalculada, 
  interes, 
  total 
}) => {
  return (
    <div className="resultado-interes">
      <h3>{titulo}</h3>
      <div>
        <p>Impuesto: ${impuesto.toLocaleString()}</p>
        {sancionOriginal > 0 && (
          <>
            <p>Sanción Actualizada: ${sancionCalculada.toLocaleString()}</p>
          </>
        )}
        <p>Intereses: ${interes.toLocaleString()}</p>
        <p><strong>Total a Pagar: ${total.toLocaleString()}</strong></p>
      </div>
    </div>
  );
};

export default ResultadoInteres;

