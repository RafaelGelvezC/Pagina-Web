import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { calcularNIT } from '../../JSC/DV';
import '../../Styles/Formulario.css';


const FormularioLiquidacion = ({ onSubmit }) => {
  const [formData, setFormData] = useState(() => {

    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      NIT: '',
      digitoVerificacion: '',
      razonSocial: '',
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
    };
  });

  useEffect(() => {
    if (formData.NIT) {
      const dv = calcularNIT(formData.NIT);
      setFormData((prevData) => ({
        ...prevData,
        digitoVerificacion: dv.toString()
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        digitoVerificacion: ''
      }));
    }
  }, [formData.NIT]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);

    // Guardar los datos en localStorage cada vez que hay un cambio
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // Opción para limpiar el localStorage si se requiere
    // localStorage.removeItem('formData');
  };

  const getYearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2007;
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="año-periodo-tipo-impuesto">
        <label htmlFor="año">Año:</label>
        <select
          name="año"
          value={formData.año}
          onChange={handleChange}
          required
          title="Año gravable"
        >
          <option value="">Selecciona el año...</option>
          {getYearsOptions().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="periodo">Periodo:</label>
        <input
          type="number"
          name="periodo"
          min="1"
          max="12"
          value={formData.periodo}
          onChange={handleChange}
          required
          title="Periodo gravable"
        />

        <label htmlFor="tipoImpuesto">Tipo de Impuesto:</label>
        <select
          name="tipoImpuesto"
          value={formData.tipoImpuesto}
          onChange={handleChange}
          required
          title="Tipo de impuesto a liquidar"
        >
          <option value="">Selecciona...</option>
          <option value="Renta">Renta</option>
          <option value="Renta CREE">Renta CREE 2</option>
          <option value="Ventas">Ventas</option>
          <option value="Consumo">Consumo</option>
          <option value="Retención">Retención</option>
          <option value="Retención CREE">Retención CREE</option>
          <option value="Patrimonio">Patrimonio</option>
          <option value="Riqueza">Riqueza</option>
          <option value="GMF">GMF</option>
          <option value="Sanción">Sanción</option>
        </select>
      </div>

      <div id="nit-dv">
        <label htmlFor="NIT">NIT:</label>
        <input
          type="text"
          name="NIT"
          value={formData.NIT}
          onChange={handleChange}
          required
          title="Número de Identificación Tributaria"
        />

        <label htmlFor="digitoVerificacion">D.V:</label>
        <input
          type="text"
          name="digitoVerificacion"
          value={formData.digitoVerificacion}
          readOnly
          title="Dígito de Verificación calculado automáticamente"
        />
      </div>

      <div id="razon-social">
        <label htmlFor="razonSocial">Razón Social:</label>
        <input
          type="text"
          name="razonSocial"
          value={formData.razonSocial}
          onChange={handleChange}
          required
          title="Nombre o razón social del contribuyente"
        />
      </div>

      <div id="valor-impuesto">
        <label htmlFor="valorImpuesto">Valor del Impuesto:</label>
        <input
          type="number"
          name="valorImpuesto"
          value={formData.valorImpuesto}
          onChange={handleChange}
          required
          title="Valor a pagar del impuesto"
        />
      </div>

      <div id="fechas">
        <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
        <input
          type="date"
          name="fechaVencimiento"
          value={formData.fechaVencimiento}
          onChange={handleChange}
          required
          title="Fecha de vencimiento del impuesto"
        />

        <label htmlFor="fechaPago">Fecha de Pago del Impuesto:</label>
        <input
          type="date"
          name="fechaPago"
          value={formData.fechaPago}
          onChange={handleChange}
          title="Fecha de pago del impuesto"
        />
      </div>

      <div id="tiene-sancion">
        <label htmlFor="tieneSancion">¿Tiene Sanción?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="tieneSancion"
              value="si"
              checked={formData.tieneSancion === 'si'}
              onChange={handleChange}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="tieneSancion"
              value="no"
              checked={formData.tieneSancion === 'no'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      {formData.tieneSancion === 'si' && (
        <div id="sancion-detalles">
          <label htmlFor="tipoSancion">Tipo de Sanción:</label>
          <select
            name="tipoSancion"
            value={formData.tipoSancion}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona...</option>
            <option value="liquidacionPrivada">Liquidación Privada</option>
            <option value="liquidacionOficial">Liquidación Oficial</option>
          </select>

          <label htmlFor="fechaPresentacion">Fecha de Presentación:</label>
          <input
            type="date"
            name="fechaPresentacion"
            value={formData.fechaPresentacion}
            onChange={handleChange}
            required
          />

          <label htmlFor="valorSancion">Valor de la Sanción:</label>
          <input
            type="number"
            name="valorSancion"
            value={formData.valorSancion}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <button type="submit">
        Calcular Interés
      </button>
    </form>
  );
};

FormularioLiquidacion.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default FormularioLiquidacion;
// Mostrar los datos del formulario que están en el localStorage
console.log('Datos del formulario en localStorage:', localStorage.getItem('formData'));