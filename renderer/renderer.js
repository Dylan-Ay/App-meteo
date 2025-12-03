import './components/ForecastSummary.js';
import './components/SearchResult.js';
import './components/SearchedCity.js';
import './components/HourlyForecast.js';
import './components/DailyForecast.js';
import './components/AirQualityCard.js';
import './components/UvIndexCard.js';
import { handleOutsideClick } from '.././utils/functions.js';
import { renderCurrentForecastByCity, renderHourlyForecastByCity, renderDailyForecastByCity, renderHealthIndicatorsCards } from './ui/displayWeather.js';
import { renderCitiesHistory, renderSearchResults } from './ui/displayCities.js';
import { handleLocationSelected } from './ui/handlers.js';
import { getLastSavedCityInfo } from '../services/citiesService.js';
import { getWeather } from './weatherCache.js';

const cityInput = document.getElementById('city-input');
const forecastSummaryContainer = document.getElementById('forecast-summary-container');
const searchedCitiesContainer = document.getElementById('searched-cities-container');

async function init() {
  const savedData = JSON.parse(localStorage.getItem('searchedCitiesList')) || [];

  if (savedData.length != 0) {
    const lastCitySaved = getLastSavedCityInfo(savedData);
    const data = await getWeather(lastCitySaved.lat, lastCitySaved.lon);
    
    renderSearchResults(forecastSummaryContainer, searchedCitiesContainer, cityInput);
    renderCitiesHistory('searchedCitiesList', 'searched-city', searchedCitiesContainer, 5);
    renderCurrentForecastByCity('searchedCitiesList', 'forecast-summary', forecastSummaryContainer, data.current, data.daily.at(0).summary);
    renderHourlyForecastByCity('searchedCitiesList', 'hourly-forecast', 1, data.hourly);
    renderDailyForecastByCity('searchedCitiesList', 'daily-forecast', 7, data.daily); 
    renderHealthIndicatorsCards('searchedCitiesList', ['uv-index-card', 'air-quality-card'], data.current);
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

// Gestion des fonctions à lancer après que le DOM soit chargé
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