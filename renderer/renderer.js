import './components/ForecastSummary.js';
import './components/SearchResult.js';
import { handleOutsideClick } from '.././utils/functions.js';

const cityInput = document.getElementById('city-input');
const meteoContainer = document.getElementById('meteo-container');
const searchBarContainer = document.getElementById('search-bar-container');

let typingTimer;
let lastRequestId = 0;
const debounceDelay = 200;

// Gestion de l'affichage de la liste de ville quand on clique en dehors
document.addEventListener('click', (event) => {
  const searchResult = document.querySelector('search-result');
  if (searchResult) {
    handleOutsideClick(searchResult, cityInput, event, 'ul');
  }
});

// cityInput.addEventListener("input", (event) => {
//   const city = cityInput.value.trim();
//   if (city) {
//     if (meteoContainer.hasChildNodes()) {
//       meteoContainer.removeChild(meteoContainer.firstChild);
//     }
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(() => {
//       window.weatherAPI.getCurrentWeatherByCity(city)
//       .then(data => {
//         const forecastSummary = document.createElement('forecast-summary');

//         forecastSummary.data = {
//           icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
//           currentTemp: data.main.temp,
//           feelsLike: data.main.feels_like,
//           cityName: data.name,
//           weather: data.weather,
//           windSpeed: data.wind.speed,
//           humidity: data.main.humidity,
//           sunrise: data.sys.sunrise,
//           sunset: data.sys.sunset,
//           pressure: data.main.pressure,
//           country: data.sys.country
//         };

//         meteoContainer.appendChild(forecastSummary);
//         console.log(data)
//       })
//       .catch(err => {
//         console.error('Erreur:', err);
//       });
//     }, debounceDelay);
//   }
// });


cityInput.addEventListener("input", (event) => {
  clearTimeout(typingTimer);

  const city = cityInput.value.trim();

  // Nettoie les anciens résultats
  document.querySelectorAll("search-result").forEach(el => el.remove());

  const requestId = ++lastRequestId;

  typingTimer = setTimeout(() => {
    if (city && city.length > 2) {
      window.weatherAPI.getCities(city)
        .then(response => {
          // Vérifie que c'est la dernière requête
          if (requestId !== lastRequestId) return;

          const searchResult = document.createElement('search-result');
          searchResult.data = response.features;
          searchBarContainer.appendChild(searchResult);
          console.log(response);
        })
        .catch(err => {
          console.error("Erreur:", err);
        });
    }
  }, debounceDelay);
});


// Pour la construction du html
// window.weatherAPI.getCurrentWeatherByCity("Colmar")
//   .then(data => {
//     const forecastSummary = document.createElement('forecast-summary');

//     forecastSummary.data = {
//       icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
//       currentTemp: data.main.temp,
//       feelsLike: data.main.feels_like,
//       cityName: data.name,
//       weather: data.weather,
//       windSpeed: data.wind.speed,
//       humidity: data.main.humidity,
//       sunrise: data.sys.sunrise,
//       sunset: data.sys.sunset,
//       pressure: data.main.pressure,
//       country: data.sys.country
//     };

//     meteoContainer.appendChild(forecastSummary);
//     console.log(data)
//   })
//   .catch(err => {
//     console.error('Erreur:', err);
//   });

// window.weatherAPI.getFiveDaysForecastByCity("Colmar")
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.error('Erreur:', err);
//   });

// window.weatherAPI.fetchCoordinatesTest("Herrlisheim")
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.error('Erreur:', err);
//   });