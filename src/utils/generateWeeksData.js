import { startOfWeek, addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

const weekDaysMap = {
  0: 'd',  // Domingo
  1: 'l',  // Lunes
  2: 'm',  // Martes
  3: 'mi', // Miércoles
  4: 'j',  // Jueves
  5: 'v',  // Viernes
  6: 's',  // Sábado
};

const generateWeekData = () => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Asegura que siempre empiece en lunes

  return Array.from({ length: 7 }, (_, i) => {
    const currentDate = addDays(startDate, i); // Usa `addDays` para evitar mutaciones incorrectas

    return {
      date: currentDate,
      dateValue: new Date(currentDate),
      day: weekDaysMap[currentDate.getDay()], // Asigna correctamente según el mapa
      fullDay: format(currentDate, 'EEEE', { locale: es }), // Formato en español
    };
  });
};

export default generateWeekData;
