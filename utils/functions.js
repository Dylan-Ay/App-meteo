export function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1)
}

export function mSecToKmSec(value) {
   return value * 3.6;
}

export function epochToLocaleTimeString(value, timeZone = 'Europe/Paris', minutes = true) {
   const date = new Date(value * 1000);
   
   return date.toLocaleTimeString([], {
      hour: '2-digit',
      ...(minutes && { minute : "2-digit" }),
      timeZone
   })
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

export function cleanContainer(container) {
   if (container.hasChildNodes()) {
      while (container.firstChild) {
         container.removeChild(container.firstChild);
      }
   };
}

export function formatMinutesSeconds(ms) {
    if (ms <= 0) return "cache expiré";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}min ${seconds}s`;
}