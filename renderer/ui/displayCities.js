import { cleanContainer } from "../../utils/functions.js";

// Permet d'afficher l'historique des 5 dernières villes recherchées
export async function renderCitiesHistory(dataName, component, containerToAppend, howMany = 5) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   
   if (savedData.length != 0) {
      const citiesToAppend = [];
      const firstFourCities = savedData.slice(0, howMany);
      
      for (const element of firstFourCities) {
         const cityName = element.name;
         const timeZone = element.timezone;
         const country = element.country;
         
         try {
            const data = await window.weatherAPI.fetchWeather(element.lat, element.lon);
            
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
               lat: element.lat,
               lon: element.lon,
            };
            
            li.appendChild(newComponent);
            citiesToAppend.push(li);
            
         } catch(err) {
            console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
         }
      }
      cleanContainer(containerToAppend);
      
      citiesToAppend.forEach((element) => {
         containerToAppend.appendChild(element);
      });
   }
}