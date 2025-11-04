let apiKey = null;

// Permet de récupérer l'api key depuis main.js
function initializeService(key) {
    if (!key) {
        console.error("SERVICE ERREUR: Clé API manquante lors de l'initialisation du service.");
    }
    apiKey = key;
}

// Récupération de toutes les informations de la méteo actuelle pour une ville
async function fetchCurrentWeather(lat, lon) {
  try {
    if (!apiKey) {
      throw new Error('Clé API OpenWeather manquante');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`;
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

// Récupération de toutes les informations de la méteo des 5 prochains jours toutes les 3 heures pour une ville
async function fetchFiveDaysForecast(lat, lon) {
  try {
    if (!apiKey) {
      throw new Error('Clé API OpenWeather manquante');
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`;
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

module.exports = {
  initializeService,
  fetchCurrentWeather,
  fetchFiveDaysForecast
};