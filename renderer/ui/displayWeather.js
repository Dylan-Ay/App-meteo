import { cleanContainer, getDominantWeather } from "../../utils/functions.js";
import { getLastSavedCityInfo } from "../../services/citiesService.js";

// Permet d'afficher les données météo du localStorage pour un seul élément
export async function printData(dataName, component, containerToAppend) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   
   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      
      window.weatherAPI.fetchCurrentWeatherByCoords(lastCitySaved.lat, lastCitySaved.lon)
      .then(data => {
         const newComponent = document.createElement(component);
         
         newComponent.data = {
            icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
            currentTemp: data.current.temp,
            feelsLike: data.current.feels_like,
            cityName: lastCitySaved.name,
            timeZone: lastCitySaved.timeZone,
            weather: data.current.weather,
            windSpeed: data.current.wind_speed,
            humidity: data.current.humidity,
            sunrise: data.current.sunrise,
            sunset: data.current.sunset,
            pressure: data.current.pressure,
            country: lastCitySaved.country
         };
         cleanContainer(containerToAppend);
         
         containerToAppend.appendChild(newComponent);
      })
      .catch(err => {
         console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
      });
   }
}

// Permet d'afficher les données météo de toutes les heures des x prochains jours (au maximum 2 jours)
export async function renderHourlyForecastByCity(dataName, component, howManyDays) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   const hourlyForecastContainer = document.getElementById('hourly-forecast-items');
   const hourlyForecastList = [];
   
   // Convertit le nombre de jours en paramètre en nombre d'éléménts
   howManyDays = howManyDays * 24 + 1;

   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
   
      try {
         let data = await window.weatherAPI.fetchHourlyForecastByCoords(lastCitySaved.lat, lastCitySaved.lon);
         const timeZone = data.timezone;
         const lat = data.lat;
         const lon = data.lon;
         
         data.hourly.slice(0, howManyDays).forEach(hour => {
            const newElement = document.createElement('li');
            const newComponent = document.createElement(component);
            
            newComponent.data = {
               icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
               time: hour.dt,
               currentTemp: hour.temp,
               feelsLike: hour.feels_like,
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
      cleanContainer(hourlyForecastContainer);
      
      hourlyForecastList.forEach(hourlyForecast => {
         hourlyForecastContainer.appendChild(hourlyForecast);
      });
   }
}

// Permet d'afficher les données météo des prochains jours (au maximum 8 jours)
export async function renderDailyForecastByCity(dataName, component, howManyDays) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   const dailyForecastItems = document.getElementById('daily-forecast-items');
   const dailyForecastContainer = document.getElementById('daily-forecast-container');
   const dailyForecastList = [];

   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      
      try {
         let data = await window.weatherAPI.fetchDailyForecastByCoords(lastCitySaved.lat, lastCitySaved.lon);
         const timeZone = data.timezone;
         const lat = data.lat;
         const lon = data.lon;

         const options = {
            weekday: "long",
            day: "numeric"
         }
         
         data.daily.slice(1, howManyDays + 1).forEach(day => {
            const newElement = document.createElement('li');
            const newComponent = document.createElement(component);

            newComponent.data = {
               icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
               date: new Date(day.dt * 1000).toLocaleDateString("fr-FR", options),
               minTemp: day.temp.min,
               maxTemp: day.temp.max,
               weatherDesc: day.weather[0].description
            };

            newElement.appendChild(newComponent);
            dailyForecastList.push(newElement);
         });

      } catch(err) {
         console.error(`Erreur data données météo avec la fonction renderDailyForecastByCity:`, err);
      }

      cleanContainer(dailyForecastItems);

      if (dailyForecastContainer.firstElementChild?.nodeName === "H2") {
         dailyForecastContainer.firstElementChild.remove();
      }

      const title = document.createElement('h2');
      title.textContent = `Prévisions météo à ${lastCitySaved.name} pour les ${howManyDays} prochains jours`;
      title.classList.add('text-[22px]', 'font-semibold', 'mb-2')
      dailyForecastContainer.insertBefore(title, dailyForecastItems);

      dailyForecastList.forEach((daily) => {
         dailyForecastItems.appendChild(daily)
      });
   }
}