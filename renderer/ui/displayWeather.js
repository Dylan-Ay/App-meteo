import { cleanContainer } from "../../utils/functions.js";
import { getLastSavedCityInfo } from "../../services/citiesService.js";

// Permet d'afficher les données météo actuelles
export async function renderCurrentForecastByCity(dataName, component, containerToAppend, data) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   
   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      const newComponent = document.createElement(component);
      
      newComponent.data = {
         icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
         currentTemp: data.temp,
         feelsLike: data.feels_like,
         cityName: lastCitySaved.name,
         timeZone: lastCitySaved.timezone,
         weather: data.weather,
         windSpeed: data.wind_speed,
         humidity: data.humidity,
         sunrise: data.sunrise,
         sunset: data.sunset,
         pressure: data.pressure,
         country: lastCitySaved.country
      };
      cleanContainer(containerToAppend);
      
      containerToAppend.appendChild(newComponent);
   }
}

// Permet d'afficher les données météo de toutes les heures des x prochains jours (au maximum 2 jours)
export async function renderHourlyForecastByCity(dataName, component, howManyDays, data) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   const hourlyForecastContainer = document.getElementById('hourly-forecast-items');
   const hourlyForecastList = [];
   
   // Convertit le nombre de jours en paramètre en nombre d'éléménts
   howManyDays = howManyDays * 24 + 1;

   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      
      data.slice(0, howManyDays).forEach(hour => {
         const newElement = document.createElement('li');
         const newComponent = document.createElement(component);
         
         newComponent.data = {
            icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
            time: hour.dt,
            currentTemp: hour.temp,
            feelsLike: hour.feels_like,
            timeZone: lastCitySaved.timezone,
            weather: data.weather,
            lat: lastCitySaved.lat,
            lon: lastCitySaved.lon,
         };
         
         newElement.appendChild(newComponent);
         hourlyForecastList.push(newElement);
      });
         
      cleanContainer(hourlyForecastContainer);
      
      hourlyForecastList.forEach(hourlyForecast => {
         hourlyForecastContainer.appendChild(hourlyForecast);
      });
   }
}

// // Permet d'afficher les données météo des prochains jours (au maximum 8 jours)
export async function renderDailyForecastByCity(dataName, component, howManyDays, data) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   const dailyForecastItems = document.getElementById('daily-forecast-items');
   const dailyForecastContainer = document.getElementById('daily-forecast-container');
   const dailyForecastList = [];

   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      
      const options = {
         weekday: "long",
         day: "numeric"
      }
      
      data.slice(1, howManyDays + 1).forEach(day => {
         const newElement = document.createElement('li');
         const newComponent = document.createElement(component);

         newComponent.data = {
            icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            date: new Date(day.dt * 1000).toLocaleDateString("fr-FR", options),
            maxTemp: day.temp.max,
            minTemp: day.temp.min,
            weatherDesc: day.weather[0].description,
            timezone: lastCitySaved.timezone,
            sunrise: day.sunrise,
            sunset: day.sunset
         };

         newElement.appendChild(newComponent);
         dailyForecastList.push(newElement);
      });

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