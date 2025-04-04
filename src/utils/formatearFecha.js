import { format, formatDistanceToNow, isToday } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (fecha) => {
  return format(new Date(fecha), "EEEE dd 'de' MMMM yyyy", { locale: es });
};

export const fechaRelativa = (fecha) => {
  const fechaFin = new Date(fecha);
  const ahora = new Date();

  if (isToday(fechaFin)) {
    return "vence hoy";
  }

  const textoRelativo = formatDistanceToNow(fechaFin, {
    addSuffix: true,
    locale: es,
  });

  if (fechaFin < ahora) {
    return `Venció hace ${textoRelativo.replace("hace ", "")}`; // Venció hace 4 días
  } else {
    return `Vence en ${textoRelativo.replace("en ", "")}`; // Vence en 10 días
  }
};
