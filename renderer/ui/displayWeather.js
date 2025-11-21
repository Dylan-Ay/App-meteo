import { cleanContainer } from "../../utils/functions.js";
import { getLastSavedCityInfo } from "../../services/citiesService.js";

// Permet d'afficher les données météo du localStorage pour un seul élément
export async function printData(dataName, component, containerToAppend) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   
   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      
      window.weatherAPI.getCurrentWeatherByCoords(lastCitySaved.lat, lastCitySaved.lon)
      .then(data => {
         const newComponent = document.createElement(component);
         
         newComponent.data = {
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            currentTemp: data.main.temp,
            feelsLike: data.main.feels_like,
            cityName: lastCitySaved.cityName,
            timeZone: lastCitySaved.timeZone,
            weather: data.weather,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            pressure: data.main.pressure,
            country: data.sys.country
         };
         cleanContainer(containerToAppend);
         
         containerToAppend.appendChild(newComponent);
      })
      .catch(err => {
         console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
      });
   }
}

// Permet de récupérer les données météo de toutes les 3 heures des x prochains jours (au maximum 5 jours)
export async function getHourlyForecastByCity(dataName, component, howManyDays) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   const hourlyForecastContainer = document.getElementById('hourly-forecast-items');

   // Convertit le nombre de jours en paramètre en nombre d'éléménts
   howManyDays = howManyDays * 8 + 1;

   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      const hourlyForecastList = [];
      
      try {
         let data = await window.weatherAPI.getFiveDaysForecastByCity(lastCitySaved.lat, lastCitySaved.lon);
         
         data = data.list.slice(0, howManyDays);
         
         data.forEach(element => {
            const newElement = document.createElement('li');
            const newComponent = document.createElement(component);
            
            newComponent.data = {
               icon: `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
               time: element.dt,
               currentTemp: element.main.temp,
               feelsLike: element.main.feels_like,
               timeZone: lastCitySaved.timeZone,
               weather: data.weather,
               lat: lastCitySaved.lat,
               lon: lastCitySaved.lon,
            };
            
            newElement.appendChild(newComponent);
            hourlyForecastList.push(newElement);
         });
         
      } catch(err) {
         console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
      }
      cleanContainer(hourlyForecastContainer);

      hourlyForecastList.forEach(hourlyForecast => {
         hourlyForecastContainer.appendChild(hourlyForecast);
      });
   }
}

export async function renderDailyMinMaxTemp(dataName, component, start, end) {
   let minTempPerDay = 0;
   let maxTempPerDay = 0;
   let listOfMinTempPerDay = [];
   let listOfMaxTempPerDay = [];
   
   try {
      const data = await window.weatherAPI.getFiveDaysForecastByCity(lat, lon);
      
      data.list.slice(start, end).forEach(item => {
         listOfMinTempPerDay.push(String(Math.round(item.main.temp_min)));
         listOfMaxTempPerDay.push(String(Math.round(item.main.temp_max)));
      });
      
      minTempPerDay = listOfMinTempPerDay.sort((a, b) => a - b).at(0);
      maxTempPerDay = listOfMaxTempPerDay.sort((a, b) => b - a).at(0);
      
      return {minTempPerDay, maxTempPerDay};
      
   } catch(err) {
      console.error(`Erreur data données météo avec la fonction getAverageTempMinAndMaxPerDay:`, err);
   }
}