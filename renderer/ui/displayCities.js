import { cleanContainer } from "../../utils/functions.js";
import { getWeather } from "../weatherCache.js";
import { handleLocationSelected } from '../ui/handlers.js';

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

export async function renderSearchResults (forecastSummaryContainer, searchedCitiesContainer, cityInput) {
   const searchBarContainer = document.getElementById('search-bar-container');
   let typingTimer;
   let lastRequestId = 0;
   const debounceDelay = 50;

   cityInput.addEventListener("input", () => {
     clearTimeout(typingTimer);
   
     const city = cityInput.value.trim();
   
     // Nettoie les anciens résultats
     document.querySelectorAll("search-result").forEach(el => el.remove());
   
     const requestId = ++lastRequestId;
   
     typingTimer = setTimeout(() => {
       if (city && city.length > 2) {
         window.weatherAPI.fetchCities(city)
         .then(response => {
           // Vérifie que c'est bien la dernière requête
           if (requestId !== lastRequestId) return;
           
           // Affichage de la liste déroulante des villes
           const searchResult = document.createElement('search-result');
           searchResult.data = response.features;
           
           searchBarContainer.appendChild(searchResult);
   
           searchResult.addEventListener("location-selected", (event) => {
            searchResult.remove();
            cityInput.value = "";

            handleLocationSelected(event, forecastSummaryContainer, searchedCitiesContainer);
           });
         })
         .catch(err => {
           console.error("Erreur data données ville:", err);
         });
       }
     }, debounceDelay);
   });
}