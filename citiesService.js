let apiKey = null;

// Permet de récupérer l'api key depuis main.js
function initializeService(key) {
    if (!key) {
        console.error("SERVICE ERREUR: Clé API manquante lors de l'initialisation du service.");
    }
    apiKey = key;
}

// Fetch des villes
async function fetchCities(value) {
    try {
        if (!apiKey) {
        throw new Error('Clé API OpenWeather manquante');
        }

        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&limit=5&lang=fr&apiKey=${apiKey}`;
        const response = await fetch(url);
        console.log('fetchCities URL:', url);

        if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Erreur fetch-cities:', error);
        throw error;
    }
}

module.exports = {
  initializeService,
  fetchCities
};