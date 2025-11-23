import { cleanContainer, getDominantWeather } from "../../utils/functions.js";
import { getLastSavedCityInfo } from "../../services/citiesService.js";

// Permet d'afficher les données météo du localStorage pour un seul élément
export async function printData(dataName, component, containerToAppend) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   
   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      
      window.weatherAPI.getCurrentWeatherByCoords(lastCitySaved.lat, lastCitySaved.lon)
      .then(data => {
         const newComponent = document.createElement(component);
         console.log(lastCitySaved)
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

// Permet de récupérer les données météo de toutes les 3 heures des x prochains jours (au maximum 5 jours)
async function getHourlyForecastByCity(dataName) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   
   if (savedData.length != 0) {
      const lastCitySaved = getLastSavedCityInfo(savedData);
      
      try {
         const data = await window.weatherAPI.getFiveDaysForecastByCity(lastCitySaved.lat, lastCitySaved.lon);
         data.city.name = lastCitySaved.cityName;
         return data;
         
      } catch(err) {
         console.error(`Erreur data données météo avec la fonction getHourlyForecastByCity :`, err);
      }
   }
}

// Permet d'afficher les données météo de toutes les 3 heures des x prochains jours (au maximum 5 jours)
export async function renderHourlyForecastByCity(dataName, component, howManyDays) {
   const hourlyForecastContainer = document.getElementById('hourly-forecast-items');
   const hourlyForecastList = [];
   
   // Convertit le nombre de jours en paramètre en nombre d'éléménts
   howManyDays = howManyDays * 8 + 1;
   
   try {
      let data = await getHourlyForecastByCity(dataName);
      
      data = data.list.slice(0, howManyDays);
      
      data.forEach(element => {
         const newElement = document.createElement('li');
         const newComponent = document.createElement(component);
         
         newComponent.data = {
            icon: `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
            time: element.dt,
            currentTemp: element.main.temp,
            feelsLike: element.main.feels_like,
            timeZone: data.timeZone,
            weather: data.weather,
            lat: data.lat,
            lon: data.lon,
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

// Permet d'afficher les températures météo min et max des prochains jours (au maximum 4 jours)
export async function renderDailyMinMaxTemp(dataName, component, howManyDays) {
   const nextDaysForecastItems = document.getElementById('next-days-forecast-items');
   const nextDaysForecastContainer = document.getElementById('next-days-forecast-container');

   // Permet de calculer la correspondance entre le nombre de jours voulus et son équivalent en nombre d'éléments
   const elementsPerDay = 8; 
   const nbElements = howManyDays * elementsPerDay;
   const dailyMinMaxTempList = [];
   
   const currentDate = new Date();
   const today2359 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23, 59, 59, 999
   );

   try {
      let data = await getHourlyForecastByCity(dataName);
      
      // Convertir dt en ms, on garde uniquement les éléments > à today2359
      const filteredData = data.list.filter(e => e.dt * 1000 > today2359);
      
      // Saute de 8 en 8 dans le tableau car 8 éléments = 1 jour puis stocke chaque jour dans daySlice
      for (let i = 0; i < nbElements; i += elementsPerDay) {
         const daySlice = filteredData.slice(i, i + elementsPerDay);
         
         if (daySlice.length === 0) break;
         
         const minTemp = Math.round(Math.min(...daySlice.map(el => el.main.temp_min)));
         const maxTemp = Math.round(Math.max(...daySlice.map(el => el.main.temp_max)));
         const dominantWeather = getDominantWeather(daySlice);

         const newElement = document.createElement('li');
         const newComponent = document.createElement(component);

         const options = {
            weekday: "long",
            day: "numeric"
         }
         
         newComponent.data = {
            icon: `https://openweathermap.org/img/wn/${dominantWeather.weather[0].icon}@2x.png`,
            date: new Date(daySlice.at(0).dt * 1000).toLocaleDateString("fr-FR", options),
            minTemp: minTemp,
            maxTemp: maxTemp,
            weatherDesc: dominantWeather.weather[0].description
         };

         newElement.appendChild(newComponent);
         dailyMinMaxTempList.push(newElement);
      }
      cleanContainer(nextDaysForecastItems);
      if (nextDaysForecastContainer.firstElementChild?.nodeName === "H2") {
         nextDaysForecastContainer.firstElementChild.remove();
      }
      
      const title = document.createElement('h2');
      title.textContent = `Prévisions météo à ${data.city.name} pour les ${howManyDays} prochains jours`;
      title.classList.add('text-[22px]', 'font-semibold', 'mb-2')
      nextDaysForecastContainer.insertBefore(title, nextDaysForecastItems);

      dailyMinMaxTempList.forEach((dailyMinMax) => {
         nextDaysForecastItems.appendChild(dailyMinMax)
      });
      
   } catch(err) {
      console.error(`Erreur data données météo avec la fonction renderDailyMinMaxTemp:`, err);
   }
}