export function calcularNIT(nit) {
    if (!nit) return ""; // Si el NIT está vacío, retorna una cadena vacía.
  
    // Convertir el NIT en una cadena con 15 dígitos (rellenar con ceros a la izquierda si es necesario)
    let nitStr = nit.toString().padStart(15, "0");
  
    // Calcular la sumatoria de los productos
    let suma = (parseInt(nitStr[14]) * 3) +
               (parseInt(nitStr[13]) * 7) +
               (parseInt(nitStr[12]) * 13) +
               (parseInt(nitStr[11]) * 17) +
               (parseInt(nitStr[10]) * 19) +
               (parseInt(nitStr[9]) * 23) +
               (parseInt(nitStr[8]) * 29) +
               (parseInt(nitStr[7]) * 37) +
               (parseInt(nitStr[6]) * 41) +
               (parseInt(nitStr[5]) * 43) +
               (parseInt(nitStr[4]) * 47) +
               (parseInt(nitStr[3]) * 53) +
               (parseInt(nitStr[2]) * 59) +
               (parseInt(nitStr[1]) * 67) +
               (parseInt(nitStr[0]) * 71);

    // Calcular el residuo de la sumatoria dividido por 11
    let residuo = suma % 11;

    // Aplicar la lógica para obtener el dígito de verificación
    let digitoVerificacion;
    if (residuo === 0) {
      digitoVerificacion = 0;
    } else if (residuo === 1) {
      digitoVerificacion = 1;
    } else {
      digitoVerificacion = 11 - residuo;
    }
  
    // Retornar el resultado
    return digitoVerificacion;
  }