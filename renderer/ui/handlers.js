import { saveNewCity } from '../../services/citiesService.js';
import { printData, getHourlyForecastByCity } from './displayWeather.js';
import { printCitiesResults } from './displayCities.js';

// Permet de gérer le comportement d'une ville choisie et d'exécuter les fonctions nécessaires
export async function handleLocationSelected(event, forecastSummaryContainer, searchedCitiesContainer) {
   const { lat, lon, cityName, timeZone } = event.detail;
   
   window.weatherAPI.getCurrentWeatherByCoords(lat, lon)
   .then(async data => {
      data.name = cityName;
      data.timezone = timeZone;
      
      // Update du localStorage avec la dernière ville recherchée
      saveNewCity('searchedCitiesList', data);
      
      // Affichage de la météo pour la ville sélectionnée
      await printData('searchedCitiesList', 'forecast-summary', forecastSummaryContainer);
      
      // Affichage des villes qui correspondent à la recherche d'un mot clé
      await printCitiesResults('searchedCitiesList', 'searched-city', searchedCitiesContainer);
      
      // Affichage de la météo des prochaines heures de la ville sélectionnée
      await getHourlyForecastByCity('searchedCitiesList', 'hourly-forecast', 9);
      
      // await getAverageTempMinAndMaxPerDay(lat, lon, 0, 9);
   })
   .catch(err => {
      console.error('Erreur data données météo:', err);
   });
}