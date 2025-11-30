let apiKey = null;
console.log(">>> CHARGEMENT DU BON FICHIER AIR QUALITY <<<", Math.random());
// Permet de récupérer l'api key depuis main.js
export function initializeService(key) {
console.log(">>> INIT SERVICE CALLED <<<");
  console.log("Clé reçue =", key);
  console.log("Valeur apiKey avant =", apiKey);
   if (!key) {
    console.error("SERVICE ERREUR: Clé API manquante lors de l'initialisation du service.");
   }
   apiKey = key;
}

export async function fetchAirQuality(lat, lon) {
    console.log(">>> FETCH AIR QUALITY <<<");
  console.log("apiKey utilisée ici =", apiKey);
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
