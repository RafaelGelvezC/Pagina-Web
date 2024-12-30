import HistoricoTasas from './HistoricoTasas';

class FechaInteres {
  constructor(fechaVencimiento, fechaPago, mes, dias, año, tasa) {
    this.fechaVencimiento = fechaVencimiento; 
    this.fechaPago = fechaPago;               
    this.mes = mes;
    this.dias = dias;
    this.año = año;
    this.tasa = tasa;
  }

  static esBisiesto(año) {
    return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
  }

  static obtenerDiasDelMes(mes, año) {
    const diasPorMes = [
      31,
      FechaInteres.esBisiesto(año) ? 29 : 28,
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    return diasPorMes[mes - 1];
  }

  static obtenerFechaInteres(año, mes, fechaVencimiento, fechaPago) {
    const dias = FechaInteres.obtenerDiasDelMes(mes, año);
    const tasa = HistoricoTasas[`${año}-${mes}`] || 0;

    // Crear una nueva instancia de FechaInteres utilizando fechaVencimiento y fechaPago
    return new FechaInteres(fechaVencimiento, fechaPago, mes, dias, año, tasa);
  }

  static cargarDesdeLocalStorage() {
    const datos = localStorage.getItem('formularioData');
    if (datos) {
      const formData = JSON.parse(datos);
  
      // Verificar que los campos esenciales estén presentes y válidos
      if (formData.fechaVencimiento && formData.fechaPago) {
        const fechaVencimiento = formData.fechaVencimiento;
        const fechaPago = formData.fechaPago;
        const año = new Date(fechaVencimiento).getFullYear();
        const mes = new Date(fechaVencimiento).getMonth() + 1;
  
        // Crear una instancia de FechaInteres
        return FechaInteres.obtenerFechaInteres(año, mes, fechaVencimiento, fechaPago);
      }
    }
  
    console.warn("No se encontraron datos válidos en localStorage.");
    return null; // Devolver null si los datos no son válidos o no existen
  }
}

// Ejemplo de uso
const fechaInteres = FechaInteres.cargarDesdeLocalStorage();
if (fechaInteres) {
  console.log("Fecha de Interés:", fechaInteres);
  console.log("Tasa de interés:", fechaInteres.tasa);
}

export default FechaInteres;