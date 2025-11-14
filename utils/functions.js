export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function mSecToKmSec(value) {
  return value * 3.6;
}

export function epochToLocaleTimeString(value, timeZone = 'Europe/Paris') {
  const date = new Date(value * 1000);
  const time = date.toLocaleTimeString([], {
    hour: '2-digit', 
    minute: '2-digit',
    timeZone
  });
  
  return time; 
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

export function cleanContainer(container) {
  if (container.hasChildNodes()) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };
}

export async function printData(dataName, component, containerToAppend, isList = false) {
  const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
  cleanContainer(containerToAppend);

  if (savedData.length != 0) {
    if (!isList) {
      const lastCitySaved = savedData[savedData.length - 1];
      const lat = lastCitySaved.coord.lat;
      const lon = lastCitySaved.coord.lon;
      const timeZone = savedData[savedData.length - 1].timezone;
      const cityName = lastCitySaved.name;
      
      window.weatherAPI.getCurrentWeatherByCoords(lat, lon)
        .then(data => {
          const newComponent = document.createElement(component);
  
          newComponent.data = {
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            currentTemp: data.main.temp,
            feelsLike: data.main.feels_like,
            cityName: cityName,
            timeZone: timeZone,
            weather: data.weather,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            pressure: data.main.pressure,
            country: data.sys.country
          };
          
          containerToAppend.appendChild(newComponent);
        })
        .catch(err => {
        console.error(`Erreur data données méteo avec le composant ${component} et le storage ${dataName} :`, err);
      });

    } else {
      const citiesToAppend = [];
      const firstFourCities = savedData.slice(0,5);
      
      for (const element of firstFourCities) {
        const cityName = element.name;
        const timeZone = element.timezone;
        
        try {
            const data = await window.weatherAPI.getCurrentWeatherByCoords(element.coord.lat, element.coord.lon);
            
            const newComponent = document.createElement(component);
            
            newComponent.data = {
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              currentTemp: data.main.temp,
              feelsLike: data.main.feels_like,
              cityName: cityName,
              timeZone: timeZone,
              weather: data.weather,
              windSpeed: data.wind.speed,
              humidity: data.main.humidity,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
              pressure: data.main.pressure,
              country: data.sys.country,
              lat: element.coord.lat,
              lon: element.coord.lon,
            };
            
            citiesToAppend.push(newComponent);

          } catch(err) {
            console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
          }
      }
      citiesToAppend.forEach((element) => {
        containerToAppend.appendChild(element);
      });
    }
  }
} 

export function saveNewCity(dataName, newCityData) {
  const savedData = JSON.parse(localStorage.getItem(dataName)) || [];

  // Supprime la ville si elle est déjà présente dans la liste
  const indexOfExistingCity = savedData.findIndex(city => city.name === newCityData.name);
  if (indexOfExistingCity !== -1) {
    savedData.splice(indexOfExistingCity, 1);
  }

  if (savedData && savedData.length < 5) {
    savedData.push(newCityData);
    localStorage.setItem(dataName, JSON.stringify(savedData));
  } else {
    savedData.shift();
    savedData.push(newCityData);
    localStorage.setItem(dataName, JSON.stringify(savedData));
  }
}

export async function handleLocationSelected(event, meteoContainer,searchedCitiesContainer) {
  const { lat, lon, cityName, timeZone } = event.detail;
  
  window.weatherAPI.getCurrentWeatherByCoords(lat, lon)
    .then(async data => {
      data.name = cityName;
      data.timezone = timeZone;
      
      // Update du localStorage avec la dernière ville recherchée
      saveNewCity('searchedCitiesList', data);

      // Affichage de la météo pour la ville sélectionnée
      await printData('searchedCitiesList', 'forecast-summary', meteoContainer, false);
      
      // Update des villes recherchées
      await printData('searchedCitiesList', 'searched-city', searchedCitiesContainer, true);
    })
    .catch(err => {
      console.error('Erreur data données méteo:', err);
    });
}
