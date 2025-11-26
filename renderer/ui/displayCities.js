import { cleanContainer } from "../../utils/functions.js";
import { getWeather } from "../weatherCache.js";

// Permet d'afficher l'historique des 5 dernières villes recherchées
export async function renderCitiesHistory(dataName, component, containerToAppend, howMany = 5) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   
   if (savedData.length != 0) {
      const citiesToAppend = [];
      
      for (const city of savedData.slice(0, howMany)) {
         const cityName = city.name;
         const timeZone = city.timezone;
         const country = city.country;
         
         try {
            const data = await getWeather(city.lat, city.lon);
            
            const newComponent = document.createElement(component);
            const li = document.createElement("li");
            
            newComponent.data = {
               icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
               currentTemp: data.current.temp,
               feelsLike: data.current.feels_like,
               cityName: cityName,
               timeZone: timeZone,
               weather: data.current.weather,
               windSpeed: data.current.wind_speed,
               humidity: data.current.humidity,
               sunrise: data.current.sunrise,
               sunset: data.current.sunset,
               pressure: data.current.pressure,
               country: country,
               lat: city.lat,
               lon: city.lon,
            };
            
            li.appendChild(newComponent);
            citiesToAppend.push(li);
            
         } catch(err) {
            console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
         }
      }
      cleanContainer(containerToAppend);
      
      citiesToAppend.forEach((city) => {
         containerToAppend.appendChild(city);
      });
   }
}