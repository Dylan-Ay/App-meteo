import './components/ForecastSummary.js';
import './components/SearchResult.js';
import { handleOutsideClick, toggleTheme, setLight, setDark } from '.././utils/functions.js';

const cityInput = document.getElementById('city-input');
const meteoContainer = document.getElementById('meteo-container');
const searchBarContainer = document.getElementById('search-bar-container');
let typingTimer;
let lastRequestId = 0;
const debounceDelay = 200;

// Gestion du thème
window.addEventListener('DOMContentLoaded', () => {
  toggleTheme();
  
  const checkbox = document.getElementById("darkSwitch");
  if (!checkbox) return;

  checkbox.checked = document.body.classList.contains('dark');

  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      setDark();
    } else {
      setLight();
    }
  });
});


// Gestion de l'affichage de la liste de ville quand on clique en dehors
document.addEventListener('click', (event) => {
  const searchResult = document.querySelector('search-result');
  if (searchResult) {
    handleOutsideClick(searchResult, cityInput, event, 'ul');
  }
});

// Affichage des villes dans mon menu déroulant
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
        // Vérifie que c'est bien la dernière requête
        if (requestId !== lastRequestId) return;
        
        // Affichage de la liste déroulante des villes
        const searchResult = document.createElement('search-result');
        searchResult.data = response.features;

        searchBarContainer.appendChild(searchResult);
        
        // Affichage du résultat de la ville sélectionnée
        searchResult.addEventListener("location-selected", (event) => {
          const { lat, lon, cityName } = event.detail;

          // Nettoyage
          searchResult.remove();
          cityInput.value = "";

          if (meteoContainer.hasChildNodes()) {
            meteoContainer.removeChild(meteoContainer.firstChild);
          }

          window.weatherAPI.getCurrentWeatherByCoords(lat, lon)
            .then(data => {
              const forecastSummary = document.createElement("forecast-summary");

              forecastSummary.data = {
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                currentTemp: data.main.temp,
                feelsLike: data.main.feels_like,
                cityName: cityName,
                weather: data.weather,
                windSpeed: data.wind.speed,
                humidity: data.main.humidity,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                pressure: data.main.pressure,
                country: data.sys.country
              };

              meteoContainer.appendChild(forecastSummary);
            })
            .catch(err => {
              console.error('Erreur data données méteo:', err);
            });
          });
        })
      .catch(err => {
        console.error("Erreur data données ville:", err);
      });
    }
  }, debounceDelay);
});