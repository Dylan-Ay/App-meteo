const apiKey = 'e322eada57df85f73d5261235b18afbf';

// Fetch des coordonées
async function fetchCoordinates(city){
  try {
    if (!apiKey) {
      throw new Error('Clé API OpenWeather manquante');
    }

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
    const response = await fetch(url);
    console.log('fetchCoordinates URL:', url);

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();

    const coordLat = data.at(0).lat;
    const coordLon = data.at(0).lon;

    return {lat: coordLat, lon: coordLon};

  } catch (error) {
    console.error('Erreur fetch-coordinates:', error);
    throw error;
  }
}

// Fetch de toutes les informations pour une ville
async function fetchCurrentWeather(lat, lon) {
  try {
    if (!apiKey) {
      throw new Error('Clé API OpenWeather manquante');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`;
    console.log('fetchWeather URL:', url);

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

module.exports = {
  fetchCoordinates,
  fetchCurrentWeather,
};