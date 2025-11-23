let apiKey = null;

// Permet de récupérer l'api key depuis main.js
export function initializeService(key) {
   if (!key) {
      console.error("SERVICE ERREUR: Clé API manquante lors de l'initialisation du service.");
   }
   apiKey = key;
}

// Permet de récupérer toutes les informations de la météo actuelle pour une ville
export async function fetchCurrentWeather(lat, lon) {
   try {
      if (!apiKey) {
         throw new Error('Clé API OpenWeather manquante');
      }
      
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&units=metric&lang=fr&appid=${apiKey}`;
      console.log('fetchCurrentWeather URL:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`Erreur HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      return data;
      
   } catch (error) {
      console.error('Erreur fetch-weather:', error);
      throw error;
   }
}

// Permet de récupérer toutes les informations de la météo par heure pour les 2 prochains jours
export async function fetchHourlyForecast(lat, lon) {
   try {
      if (!apiKey) {
         throw new Error('Clé API OpenWeather manquante');
      }
      
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,daily,alerts,minutely&units=metric&lang=fr&appid=${apiKey}`;
      console.log('fetchFiveDaysForecast URL:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`Erreur HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      return data;
      
   } catch (error) {
      console.error('Erreur fetch-five-days-forecast:', error);
      throw error;
   }
}