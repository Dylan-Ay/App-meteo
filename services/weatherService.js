let apiKey = null;

// Permet de récupérer l'api key depuis main.js
export function initializeService(key) {
   if (!key) {
      console.error("SERVICE ERREUR: Clé API manquante lors de l'initialisation du service.");
   }
   apiKey = key;
}

// Permet de récupérer toutes les informations de la météo actuelle pour une ville (daily, hourly et current)
export async function fetchWeather(lat, lon) {
   try {
      if (!apiKey) {
         throw new Error('Clé API OpenWeather manquante');
      }
      
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&lang=fr&appid=${apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`Erreur HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      return data;
      
   } catch (error) {
      console.error('Erreur fetchCurrentWeather:', error);
      throw error;
   }
}

// Permet de récupérer toutes les informations de la météo par heure pour les 2 prochains jours
// export async function fetchHourlyForecast(lat, lon) {
//    try {
//       if (!apiKey) {
//          throw new Error('Clé API OpenWeather manquante');
//       }
      
//       const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,daily,alerts,minutely&units=metric&lang=fr&appid=${apiKey}`;
      
//       const response = await fetch(url);
//       if (!response.ok) {
//          throw new Error(`Erreur HTTP ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       return data;
      
//    } catch (error) {
//       console.error('Erreur fetchHourlyForecast:', error);
//       throw error;
//    }
// }

// // Permet de récupérer toutes les informations de la météo par jour pour les 8 prochains jours maximum
// export async function fetchDailyForecast(lat, lon) {
//    try {
//       if (!apiKey) {
//          throw new Error('Clé API OpenWeather manquante');
//       }
      
//       const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,alerts,hourly,minutely&units=metric&lang=fr&appid=${apiKey}`;
      
//       const response = await fetch(url);
//       if (!response.ok) {
//          throw new Error(`Erreur HTTP ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       return data;
      
//    } catch (error) {
//       console.error('Erreur fetch-daily-forecast:', error);
//       throw error;
//    }
// }