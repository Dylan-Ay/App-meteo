import './components/ForecastSummary.js';
import './components/SearchResult.js';
import './components/SearchedCity.js';
import { handleOutsideClick, toggleTheme, setLight, setDark, cleanContainer, printData, saveNewCity } from '.././utils/functions.js';

const cityInput = document.getElementById('city-input');
const meteoContainer = document.getElementById('meteo-container');
const searchBarContainer = document.getElementById('search-bar-container');
const searchedCitiesList = document.getElementById('searched-cities');
let typingTimer;
let lastRequestId = 0;
const debounceDelay = 50;

printData('searchedCitiesList', 'forecast-summary', meteoContainer);
printData('searchedCitiesList', 'searched-city', searchedCitiesList, true);

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
          const { lat, lon, cityName, timeZone } = event.detail;
          
          // Nettoyage
          searchResult.remove();
          cityInput.value = "";
          cleanContainer(meteoContainer);

          window.weatherAPI.getCurrentWeatherByCoords(lat, lon)
            .then(data => {
              data.name = cityName;
              data.timezone = timeZone;
              
              // Update du localStorage avec la dernière ville recherchée
              saveNewCity('searchedCitiesList', data);

              // Affichage de la météo pour la ville sélectionnée
              printData('searchedCitiesList', 'forecast-summary', meteoContainer);
              
              // Update des villes recherchées
              printData('searchedCitiesList', 'searched-city', searchedCitiesList, true, true);
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