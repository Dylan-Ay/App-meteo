import { saveNewCity } from '../../services/citiesService.js';
import { renderCurrentForecastByCity, renderHourlyForecastByCity, renderDailyForecastByCity, renderHealthIndicatorsCards } from './displayWeather.js';
import { renderCitiesHistory } from './displayCities.js';
import { getWeather } from '../weatherCache.js';

// Permet de gérer le comportement d'une ville choisie et d'exécuter les fonctions nécessaires
export async function handleLocationSelected(event, forecastSummaryContainer, searchedCitiesContainer) {
   const { lat, lon, cityName, timeZone, country } = event.detail;
   
   const data = await getWeather(lat, lon);

   data.name = cityName;
   data.timezone = timeZone;
   data.country = country;

   // Update du localStorage avec la dernière ville recherchée
   saveNewCity('searchedCitiesList', data);
   
   // Affichage des villes qui correspondent à la recherche d'un mot clé
   await renderCitiesHistory('searchedCitiesList', 'searched-city', searchedCitiesContainer, 5);

   // Affichage de la météo pour la ville sélectionnée
   await renderCurrentForecastByCity('searchedCitiesList', 'forecast-summary', forecastSummaryContainer, data.current);
   
   // Affichage de la météo des prochaines heures de la ville sélectionnée
   await renderHourlyForecastByCity('searchedCitiesList', 'hourly-forecast', 1, data.hourly);
   
   // Affichage de la météo des prochains jours
   await renderDailyForecastByCity('searchedCitiesList', 'daily-forecast', 7, data.daily);

   // Affichage des composants "Indicateurs santé"
   await renderHealthIndicatorsCards('searchedCitiesList', ['uv-index-card', 'air-quality-card'], data.current);
}