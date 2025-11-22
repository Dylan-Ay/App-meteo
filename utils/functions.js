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

// Nettoie les informations d'un container
export function cleanContainer(container) {
   if (container.hasChildNodes()) {
      while (container.firstChild) {
         container.removeChild(container.firstChild);
      }
   };
}

export function getDominantWeather(data) {
   const map = new Map();
   // Récupère toutes les description de l'objet data
   const descriptionList = data.map(el => el.weather[0].description);
   
   // Compte le nombre d'occurence par description
   for (const description of descriptionList) {
      map.set(description, (map.get(description) ?? 0) + 1);
   }
   
   let dominantDescription = null;
   let highestCount = 0;
   
   // Récupère la météo dominante sur la journée
   for (const [element, count] of map.entries()) {
      if (count > highestCount) {
         highestCount = count;
         dominantDescription = element;
      }
   }
   
   let dominantWeather;
   
   // Récupère le tableau complet "weather" correspondant à la description dominante
   for (const day of data) {
      if (day.weather[0].description == dominantDescription) {
         dominantWeather = day;
      }
   }

   return dominantWeather;
}