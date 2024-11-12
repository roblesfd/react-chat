// Muestra cuanto tiempo a entre una fecha indicada comparandola con la actual
// Ejemplo: Fecha ind: 21 Feb, Fecha act: 26 Feb
// Texto a mostrar: Hace 5 dias

/*
Salidas de acuerdo al tiempo transcurrido

Hioras: Hace x horas
Dias (1-7): Hace 7 dias
A partir de 1 semana: [Fecha-exacta]
*/

const timeUnits = [
  { label: "año", ms: 1000 * 60 * 60 * 24 * 365 },
  { label: "mes", ms: 1000 * 60 * 60 * 24 * 30 },
  { label: "día", ms: 1000 * 60 * 60 * 24 },
  { label: "hora", ms: 1000 * 60 * 60 },
  { label: "minuto", ms: 1000 * 60 },
  { label: "segundo", ms: 1000 },
];

const pluralizeTimeLabel = (label, amount) =>
  label + (amount > 1 ? (label === "mes" ? "es" : "s") : "");

const formatTimeDifference = (differenceMs: number) => {
  const unit = timeUnits.find(({ ms }) => differenceMs >= ms);
  if (!unit) return "Ahora";
  const amount = Math.floor(differenceMs / unit.ms);
  return `${amount} ${pluralizeTimeLabel(unit.label, amount)}`;
};

const getTimeElapsed = (pastDate, curDate) => {
  return formatTimeDifference(curDate - pastDate);
};

const formatDate = (date) =>
  date.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

const formatTime = (date) =>
  date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const formatDateTime = (date, time) => `${date} a las ${time}`;

const formatDateToMexican = (date) =>
  date.toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

export {
  getTimeElapsed,
  formatDateToMexican,
  formatDate,
  formatTime,
  formatDateTime,
};
