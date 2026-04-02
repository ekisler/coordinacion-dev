// src/utils/dateUtils.js
export const parseTimestamp = (timestamp) => {
    // Validar que el timestamp no sea undefined o null
    if (!timestamp) {
      return 0; // Retornar un valor por defecto
    }
  
    // Intentar parsear el timestamp como formato ISO
    if (timestamp.includes('T')) {
      // Si el timestamp es en formato ISO (YYYY-MM-DDTHH:MM:SS.SSSZ)
      return new Date(timestamp).getTime(); // Convertir directamente a milisegundos
    }
  
    // Si no es formato ISO, intentar parsear como "DD/MM/YYYY HH:MM AM/PM"
    const timestampRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} [AP]M$/;
    if (!timestampRegex.test(timestamp)) {
      return 0; // Retornar un valor por defecto
    }
  
    // Suponiendo que el formato es "DD/MM/YYYY HH:MM AM/PM"
    const [date, time] = timestamp.split(' ');
    const [day, month, year] = date.split('/');
    const [hourMinute, period] = time.split(' ');
    const [hour, minute] = hourMinute.split(':');
  
    // Convertir a formato de 24 horas
    let hour24 = parseInt(hour, 10);
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    }
    if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
  
    // Crear una fecha en formato ISO (YYYY-MM-DDTHH:MM:SS)
    const isoDate = `${year}-${month}-${day}T${hour24.toString().padStart(2, '0')}:${minute}:00`;
    return new Date(isoDate).getTime(); // Convertir a milisegundos
  };