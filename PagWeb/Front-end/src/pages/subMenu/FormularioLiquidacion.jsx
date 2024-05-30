import { useState } from 'react';
import PropTypes from 'prop-types';

const FormularioLiquidacion = ({ onSubmit, children }) => {
  const [formData, setFormData] = useState({
    tipoImpuesto: '',
    año: '',
    periodo: '',
    fechaVencimiento: '',
    valorImpuesto: '',
    tieneSancion: '',
    tipoSancion: '',
    fechaPresentacion: '',
    valorSancion: '',
    fechaPago: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTieneSancionChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      tieneSancion: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="tipoImpuesto">Tipo de Impuesto:</label>
        <select name="tipoImpuesto" value={formData.tipoImpuesto} onChange={handleChange} required>
          <option value="">Selecciona...</option>
          <option value="impuesto1">Impuesto 1</option>
          <option value="impuesto2">Impuesto 2</option>
        </select>
      </div>
      <div>
        <label htmlFor="año">Año:</label>
        <input type="number" name="año" value={formData.año} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="periodo">Periodo:</label>
        <input type="number" name="periodo" min="1" max="12" value={formData.periodo} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
        <input type="date" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="valorImpuesto">Valor del Impuesto:</label>
        <input type="number" name="valorImpuesto" value={formData.valorImpuesto} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="tieneSancion">¿Tiene Sanción?</label>
        <div>
          <label>
            <input
              type="radio"
              name="tieneSancion"
              value="si"
              checked={formData.tieneSancion === 'si'}
              onChange={handleTieneSancionChange}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="tieneSancion"
              value="no"
              checked={formData.tieneSancion === 'no'}
              onChange={handleTieneSancionChange}
            />
            No
          </label>
        </div>
      </div>
      {formData.tieneSancion === 'si' && (
        <>
          <div>
            <label htmlFor="tipoSancion">Tipo de Sanción:</label>
            <select name="tipoSancion" value={formData.tipoSancion} onChange={handleChange} required>
              <option value="">Selecciona...</option>
              <option value="liquidacionPrivada">Liquidación Privada</option>
              <option value="liquidacionOficial">Liquidación Oficial</option>
            </select>
          </div>
          <div>
            <label htmlFor="fechaPresentacion">Fecha de Presentación:</label>
            <input type="date" name="fechaPresentacion" value={formData.fechaPresentacion} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="valorSancion">Valor de la Sanción:</label>
            <input type="number" name="valorSancion" value={formData.valorSancion} onChange={handleChange} required />
          </div>
        </>
      )}
      <div>
        <label htmlFor="fechaPago">Fecha de Pago del Impuesto:</label>
        <input type="date" name="fechaPago" value={formData.fechaPago} onChange={handleChange} required />
      </div>
      {children}
      <button type="submit">Calcular Interés</button>
    </form>
  );
};

FormularioLiquidacion.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default FormularioLiquidacion;
