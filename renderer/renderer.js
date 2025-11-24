import './components/ForecastSummary.js';
import './components/SearchResult.js';
import './components/SearchedCity.js';
import './components/HourlyForecast.js';
import './components/NextDayForecast.js';
import { handleOutsideClick } from '.././utils/functions.js';
import { renderHourlyForecastByCity, printData, renderDailyMinMaxTemp } from './ui/displayWeather.js';
import { printCitiesResults } from './ui/displayCities.js';
import { handleLocationSelected } from './ui/handlers.js';
import { toggleTheme, setLight, setDark } from './ui/theme.js';

const cityInput = document.getElementById('city-input');
const forecastSummaryContainer = document.getElementById('forecast-summary-container');
const searchBarContainer = document.getElementById('search-bar-container');
const searchedCitiesContainer = document.getElementById('searched-cities-container');
let typingTimer;
let lastRequestId = 0;
const debounceDelay = 50;

printData('searchedCitiesList', 'forecast-summary', forecastSummaryContainer);
printCitiesResults('searchedCitiesList', 'searched-city', searchedCitiesContainer);
renderHourlyForecastByCity('searchedCitiesList', 'hourly-forecast', 1);
// renderDailyMinMaxTemp('searchedCitiesList', 'next-day-forecast', 5);

// Observer pour attacher le listener aux searched-city à chaque création du composant
const observer = new MutationObserver(() => {
  const searchedCitiesList = document.querySelectorAll('searched-city');
  searchedCitiesList.forEach(city => {
    if (!city.dataset.listenerAttached) {
      city.addEventListener("location-selected", (event) => {
        handleLocationSelected(event, forecastSummaryContainer, searchedCitiesContainer);
      });
      city.dataset.listenerAttached = "true";
    }
  });
});

observer.observe(searchedCitiesContainer, { childList: true });

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

// Affichage des villes dans le menu déroulant de la barre de recherche
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