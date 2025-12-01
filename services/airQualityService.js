let apiKey = null;

// Permet de récupérer l'api key depuis main.js
export function initializeService(key) {
   if (!key) {
    console.error("SERVICE ERREUR: Clé API manquante lors de l'initialisation du service.");
   }
   apiKey = key;
}

export async function fetchAirQuality(lat, lon) {
    try {
      if (!apiKey) {
        throw new Error(`Clé API OpenWeather manquante ${apiKey}`);
      }
      
      const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      return data;
      
   } catch (error) {
      console.error('Erreur fetchAirQuality:', error);
      throw error;
   }
}