import { format, formatDistanceToNow, formatDistanceStrict, isToday, differenceInDays, differenceInHours } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (fecha) => {
  return format(new Date(fecha), "EEEE dd 'de' MMMM yyyy", { locale: es });
};

export const fechaRelativa = (fecha) => {
  const fechaFin = new Date(fecha);
  const ahora = new Date();

  if (isToday(fechaFin)) {
    return "Vence hoy";
  }

  const diffDays = differenceInDays(fechaFin, ahora);

  if (fechaFin < ahora) {
    const textoRelativo = formatDistanceToNow(fechaFin, {
      addSuffix: true,
      locale: es,
    });
    return `Venció ${textoRelativo}`;
  }

  if (diffDays <= 3) {
    const diffHours = differenceInHours(fechaFin, ahora);

    // Si faltan menos de 24 horas => mostrar en horas
    if (diffHours < 24) {
      const textoHoras = formatDistanceStrict(ahora, fechaFin, {
        unit: "hour",
        locale: es,
      });
      return `Vence pronto (${textoHoras})`;
    }

    // Si faltan más de 24 horas pero 3 días o menos => días
    const textoDias = formatDistanceStrict(ahora, fechaFin, {
      unit: "day",
      locale: es,
    });
    return `Vence pronto (${textoDias})`;
  }

  const textoRelativo = formatDistanceToNow(fechaFin, {
    addSuffix: false,
    locale: es,
  });
  return `Vence en ${textoRelativo}`;
};
