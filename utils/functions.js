export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function mSecToKmSec(value) {
  return value * 3.6;
}

export function epochToLocaleTimeString(value) {
  const date = new Date(value * 1000);
  const heureMinute = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  
  return heureMinute; 
}