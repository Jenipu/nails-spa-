const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');

// Get timezone offset in ISO format (+hh:mm or -hh:mm)
const getTimezoneOffset = (date) => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  return diff + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);
};

const toISOStringWithTimezone = (date) => {
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    getTimezoneOffset(date);
};

// const dbTime = "2024-11-05T17:00:00.000Z"
// const dbTimeWithTimezone = toISOStringWithTimezone(
//   new Date(dbTime)
// );

export const formatDate = (date = new Date()) => {
  const dateIsoWithTimezone = toISOStringWithTimezone(date)

  return new Intl.DateTimeFormat('es', {
    //dateStyle: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    //day: '2-digit',
    hour: 'numeric',
    //hour: '2-digit',
    minute: 'numeric',
    //minute: '2-digit',
    second: 'numeric',
    //second: '2-digit',
    hour12: true,
    //hour12: false,
    // timeZoneName: 'short',
  }).format(new Date(dateIsoWithTimezone))
}