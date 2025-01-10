import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { calcularNIT } from '../../JSC/DV';
import { calcularSancion } from '../../JSC/calcularSancion';
import '../../Styles/Formulario.css';

const FormularioLiquidacion = ({ onSubmit, onReset }) => {
  const initialState = {
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
    fechaPago: '',
    sancionCalculada: 0,
  };

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : initialState;
  });

  const [valoresFormateados, setValoresFormateados] = useState({
    valorImpuesto: '',
    valorSancion: ''
  });

  // Formateador para Peso Colombiano
  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    // Inicializar valores formateados al cargar
    if (formData.valorImpuesto) {
      setValoresFormateados(prev => ({
        ...prev,
        valorImpuesto: formatoMoneda.format(formData.valorImpuesto)
      }));
    }
    if (formData.valorSancion) {
      setValoresFormateados(prev => ({
        ...prev,
        valorSancion: formatoMoneda.format(formData.valorSancion)
      }));
    }
  }, []);

  useEffect(() => {
    if (formData.NIT) {
      const dv = calcularNIT(formData.NIT);
      setFormData((prev) => ({ ...prev, digitoVerificacion: dv.toString() }));
    }
  }, [formData.NIT]);

  useEffect(() => {
    if (
      formData.tieneSancion === 'si' &&
      formData.fechaPresentacion &&
      formData.fechaVencimiento &&
      formData.valorSancion
    ) {
      const sancionCalculada = calcularSancion(
        formData.fechaPresentacion,
        formData.fechaVencimiento,
        formData.tipoSancion,
        parseFloat(formData.valorSancion) || 0
      );

      setFormData((prev) => ({
        ...prev,
        sancionCalculada,
      }));
    }
  }, [
    formData.tieneSancion,
    formData.fechaPresentacion,
    formData.fechaVencimiento,
    formData.valorSancion,
    formData.tipoSancion,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'valorImpuesto' || name === 'valorSancion') {
      // Eliminar cualquier carácter que no sea número
      const numeroLimpio = value.replace(/\D/g, '');
      
      // Actualizar el estado con el valor numérico
      setFormData(prev => ({
        ...prev,
        [name]: numeroLimpio
      }));

      // Actualizar el valor formateado
      if (numeroLimpio) {
        const valorFormateado = formatoMoneda.format(numeroLimpio);
        setValoresFormateados(prev => ({
          ...prev,
          [name]: valorFormateado
        }));
      } else {
        setValoresFormateados(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    } else {
      // Para otros campos, mantener el comportamiento original
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    localStorage.setItem('formData', JSON.stringify({
      ...formData,
      [name]: name === 'valorImpuesto' || name === 'valorSancion' ? value.replace(/\D/g, '') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    try {
      setFormData(initialState);
      setValoresFormateados({
        valorImpuesto: '',
        valorSancion: ''
      });
      localStorage.removeItem('formData');
      // Verifica si onReset existe antes de llamarlo
      if (typeof onReset === 'function') {
        onReset();
      }
      console.log('Formulario restablecido.');
    } catch (error) {
      console.error('Error al restablecer el formulario:', error);
    }
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
        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
      </div>

      <div id="nit-dv-razon">
        <div>
          <label htmlFor="NIT">NIT:</label>
          <input
            type="text"
            name="NIT"
            value={formData.NIT}
            onChange={handleChange}
            required
            title="Número de Identificación Tributaria"
          />
        </div>

        <div>
          <label htmlFor="digitoVerificacion">D.V:</label>
          <input
            type="text"
            name="digitoVerificacion"
            value={formData.digitoVerificacion}
            readOnly
            title="Dígito de Verificación calculado automáticamente"
          />
        </div>

        <div>
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
      </div>

      <div id="valor-fecha-pago">
        <div>
          <label htmlFor="valorImpuesto">Valor del Impuesto:</label>
          <input
            type="text"
            name="valorImpuesto"
            value={valoresFormateados.valorImpuesto}
            onChange={handleChange}
            required
            title="Valor a pagar del impuesto"
            placeholder="$ 0"
          />
        </div>

        <div>
          <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
          <input
            type="date"
            name="fechaVencimiento"
            value={formData.fechaVencimiento}
            onChange={handleChange}
            required
            title="Fecha de vencimiento del impuesto"
          />
        </div>

        <div>
          <label htmlFor="fechaPago">Fecha de Pago del Impuesto:</label>
          <input
            type="date"
            name="fechaPago"
            value={formData.fechaPago}
            onChange={handleChange}
            title="Fecha de pago del impuesto"
          />
        </div>
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
          <div>
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
          </div>

          <div>
            <label htmlFor="fechaPresentacion">Fecha de Presentación:</label>
            <input
              type="date"
              name="fechaPresentacion"
              value={formData.fechaPresentacion}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="valorSancion">Valor de la Sanción:</label>
            <input
              type="text"
              name="valorSancion"
              value={valoresFormateados.valorSancion}
              onChange={handleChange}
              required
              placeholder="$ 0"
            />
          </div>
        </div>
      )}

      <div className="botones-container">
        <button className="Calcular" type="submit">Calcular Interés</button>
        <button className="Generar" type="button" onClick={handleReset}>Generar nueva consulta</button>
      </div>
    </form>
  );
};

FormularioLiquidacion.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired, // Nueva prop para manejar el reset
};

export default FormularioLiquidacion;