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

// Gestion du  thème
export function toggleTheme() {
  const isDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.body.classList.toggle("dark", isDark);
}

export function setLight() {
  localStorage.theme = "light";
  document.body.classList.remove("dark");
}

export function setDark() {
  localStorage.theme = "dark";
  document.body.classList.add("dark");
}

export function setSystem() {
  localStorage.removeItem("theme");
  toggleTheme();
}

export function printSavedData(dataName, component, containerToAppend) {
  const savedData = JSON.parse(localStorage.getItem(dataName)) || [];

  if (savedData.length != 0) {
    const forecastSummary = document.createElement(component);
    
    forecastSummary.data = {
      icon: `https://openweathermap.org/img/wn/${savedData.weather[0].icon}@2x.png`,
      currentTemp: savedData.main.temp,
      feelsLike: savedData.main.feels_like,
      cityName: savedData.name,
      weather: savedData.weather,
      windSpeed: savedData.wind.speed,
      humidity: savedData.main.humidity,
      sunrise: savedData.sys.sunrise,
      sunset: savedData.sys.sunset,
      pressure: savedData.main.pressure,
      country: savedData.sys.country
    };

    containerToAppend.appendChild(forecastSummary);
  }
}