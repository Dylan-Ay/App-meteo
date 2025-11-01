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

export function isoCountryToFullName(isoCountry) {
  const isoCountryToFullName = new Intl.DisplayNames(["fr"], { type: "region" });

  return isoCountryToFullName.of(isoCountry);
}

export function handleOutsideClick(elementToHide, elementToClickToDisplay, event, child = false) {
  const targetElement = event.target;
  const elementToHideList = elementToHide.querySelector(child);

  if (!elementToHideList.contains(targetElement)) {
    elementToHide.classList.add('hidden');
  }

  if (targetElement == elementToClickToDisplay) {
    elementToHide.classList.remove('hidden');
  }
}