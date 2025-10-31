import './components/ForecastSummary.js';
import './components/SearchResult.js';

const cityInput = document.getElementById('city-input');
const meteoContainer = document.getElementById('meteo-container');

let typingTimer;
const debounceDelay = 500;

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
  const city = cityInput.value.trim();
  if (city) {
    if (meteoContainer.hasChildNodes()) {
      meteoContainer.removeChild(meteoContainer.firstChild);
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      window.weatherAPI.getCities(city)
      .then(data => {
        let newList = document.createElement('ul');
      
        const searchResult = document.createElement('search-result');
        searchResult.data = data.features;

        newList.appendChild(searchResult);
        meteoContainer.appendChild(newList);
      })
      .catch(err => {
        console.error('Erreur:', err);
      });
    }, debounceDelay);
  }
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