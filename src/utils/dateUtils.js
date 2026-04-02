// dateUtils.js
import { format } from "date-fns";

export const formatDate = (isoString) => {
  if (!isoString){
    return "Fecha no disponible"
  }
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return "Fecha invalida"
  }
  return format(date, "dd/MM/yyyy") + "\n" + format(date, "HH:mm");  
};