import { cleanContainer } from "../../utils/functions.js";

// Permet d'afficher les données météo du localStorage pour un seul élément
export async function printData(dataName, component, containerToAppend) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   cleanContainer(containerToAppend);
   
   if (savedData.length != 0) {
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
         console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
      });
   }
}

// Permet de récupérer les données météo de toutes les 3 heures des x prochains jours (au maximum 5 jours)
export async function getHourlyForecastByCity(dataName, component, howMany = false) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   const hourlyForecastContainer = document.getElementById('hourly-forecast-items');
   cleanContainer(hourlyForecastContainer);
   
   if (savedData.length != 0) {
      const lastCitySaved = savedData[savedData.length - 1];
      const lat = lastCitySaved.coord.lat;
      const lon = lastCitySaved.coord.lon;
      const timeZone = savedData[savedData.length - 1].timezone;
      const hourlyForecastList = [];
      
      try {
         let data = await window.weatherAPI.getFiveDaysForecastByCity(lat, lon);
         if (howMany) {
            data = data.list.slice(0, howMany);
         } else {
            data = data.list;
         }
         
         data.forEach(element => {
            const newElement = document.createElement('li');
            const newComponent = document.createElement(component);
            
            newComponent.data = {
               icon: `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
               time: element.dt,
               currentTemp: element.main.temp,
               feelsLike: element.main.feels_like,
               timeZone: timeZone,
               weather: data.weather,
               lat: lat,
               lon: lon,
            };
            
            newElement.appendChild(newComponent);
            hourlyForecastList.push(newElement);
         });
         
      } catch(err) {
         console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
      }
      
      hourlyForecastList.forEach(hourlyForecast => {
         hourlyForecastContainer.appendChild(hourlyForecast);
      });
   }
}