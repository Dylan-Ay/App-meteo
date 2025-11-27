import './components/ForecastSummary.js';
import './components/SearchResult.js';
import './components/SearchedCity.js';
import './components/HourlyForecast.js';
import './components/DailyForecast.js';
import { handleOutsideClick } from '.././utils/functions.js';
import { renderCurrentForecastByCity, renderHourlyForecastByCity, renderDailyForecastByCity } from './ui/displayWeather.js';
import { renderCitiesHistory } from './ui/displayCities.js';
import { handleLocationSelected } from './ui/handlers.js';
import { getLastSavedCityInfo } from '../services/citiesService.js';
import { getWeather } from './weatherCache.js';

const cityInput = document.getElementById('city-input');
const forecastSummaryContainer = document.getElementById('forecast-summary-container');
const searchBarContainer = document.getElementById('search-bar-container');
const searchedCitiesContainer = document.getElementById('searched-cities-container');
let typingTimer;
let lastRequestId = 0;
const debounceDelay = 50;

async function init() {
  const savedData = JSON.parse(localStorage.getItem('searchedCitiesList')) || [];

  if (savedData.length != 0) {
    const lastCitySaved = getLastSavedCityInfo(savedData);
    const data = await getWeather(lastCitySaved.lat, lastCitySaved.lon);
    
    renderCitiesHistory('searchedCitiesList', 'searched-city', searchedCitiesContainer, 5);
    renderCurrentForecastByCity('searchedCitiesList', 'forecast-summary', forecastSummaryContainer, data.current);
    renderHourlyForecastByCity('searchedCitiesList', 'hourly-forecast', 1, data.hourly);
    renderDailyForecastByCity('searchedCitiesList', 'daily-forecast', 7, data.daily); 
  }
}

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

// Gestion des fonctions à lancer au rechargement
window.addEventListener('DOMContentLoaded', () => {
  init();
  const savedTheme = localStorage.getItem("theme");
  const toggleTheme = document.getElementById("darkSwitch");

  if (savedTheme == 'dark') {
    toggleTheme.checked = true;
  }
  
  toggleTheme.addEventListener("change", () => {
    window.toggleTheme();
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