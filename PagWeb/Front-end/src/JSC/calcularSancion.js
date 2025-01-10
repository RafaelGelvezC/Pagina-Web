import historicoIpc from './historicoIpc';

export const calcularSancion = (fechaPresentacion, fechaVencimiento, tipoSancion, valorSancion) => {
    // Convertir las fechas a objetos Date
    const fechaInicio = new Date(fechaPresentacion);
    const fechaFin = new Date(fechaVencimiento);
    let añoInicial = fechaInicio.getFullYear();
    
    // Si es liquidación privada, sumar un año al inicial
    if (tipoSancion === 'liquidacionPrivada') {
        fechaInicio.setFullYear(fechaInicio.getFullYear() + 1);
        añoInicial = fechaInicio.getFullYear();
    }
    
    const añoFinal = fechaFin.getFullYear();
    
    // Función para verificar si un año es bisiesto
    const esBisiesto = (año) => {
        return (año % 4 === 0 && año % 100 !== 0) || año % 400 === 0;
    };
    
    let valorSancionActual = valorSancion; // Variable para mantener el valor actualizado de la sanción
    let sumaTotalSancion = 0;
    
    // Iterar por cada año
    for (let año = añoInicial; año <= añoFinal; año++) {
        const diasTotalesAño = esBisiesto(año) ? 366 : 365;
        let diasRestantes;
        
        // Calcular días restantes según el año
        if (año === añoInicial) {
            // Para el primer año, desde la fecha de inicio hasta fin de año
            const finAño = new Date(año, 11, 31);
            diasRestantes = Math.ceil((finAño - fechaInicio) / (1000 * 60 * 60 * 24)) - 1;
        } else {
            // Para todos los demás años (incluyendo el último), año completo
            diasRestantes = diasTotalesAño;
        }
        
        // Obtener IPC del año
        const ipcAño = historicoIpc[año.toString()];
        if (!ipcAño) {
            throw new Error(`No se encontró el IPC para el año ${año}`);
        }
        
        // Convertir IPC a porcentaje
        const ipcPorcentaje = ipcAño / 100;

        // Calcular el factor diario para el año actual
        const factorDiario = (ipcPorcentaje / diasTotalesAño);
        const factorRedondeado = Number((factorDiario).toFixed(7));
        const factorBase = 1 + factorRedondeado;
        
        // Calcular la potencia para los días del año actual
        const potencia = Math.pow(factorBase, diasRestantes);
        
        // Calcular el valor de la sanción para el año actual usando el valorSancionActual
        const sancionActualizada = valorSancionActual * potencia;
        const incrementoAño = sancionActualizada - valorSancionActual;
        const incrementoRedondeado = Math.round(incrementoAño / 1000) * 1000;
        
        // Actualizar el valor de la sanción para el siguiente año
        valorSancionActual += incrementoRedondeado;
        
        // Opcional: para debugging
        console.log(`Año ${año}: Días=${diasRestantes}, IPC=${ipcAño}, Incremento=${incrementoRedondeado}, valorSancionActual=${valorSancionActual}`);
        console.log(`Factor base=${factorBase}, Potencia=${potencia}, incv=${incrementoAño}`);
    }
    
    return valorSancionActual;
};
