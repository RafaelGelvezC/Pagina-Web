import PropTypes from 'prop-types';

const ResultadoInteres = ({ titulo, impuesto, sancion, interes, total }) => {
  return (
    <div>
      <h3>{titulo}</h3>
      <div>
        <label>Impuesto:</label>
        <span>{impuesto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
      </div>
      <div>
        <label>Interés:</label>
        <span>{interes.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
      </div>
      <div>
        <label>Sanción:</label>
        <span>{sancion.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
      </div>
      <div>
        <label>Total:</label>
        <span>{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
      </div>
    </div>
  );
};

ResultadoInteres.propTypes = {
  titulo: PropTypes.string.isRequired,
  impuesto: PropTypes.number.isRequired,
  sancion: PropTypes.number.isRequired,
  interes: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default ResultadoInteres;

