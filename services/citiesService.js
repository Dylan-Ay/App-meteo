let apiKey = null;

// Permet de récupérer l'api key depuis main.js
export function initializeService(key) {
    if (!key) {
        console.error("SERVICE ERREUR: Clé API manquante lors de l'initialisation du service.");
    }
    apiKey = key;
}

// Fetch des villes
export async function fetchCities(value) {
    try {
        if (!apiKey) {
        throw new Error('Clé API OpenWeather manquante');
        }

        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&limit=5&lang=fr&bias=countrycode:fr&apiKey=${apiKey}`;
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

// Sauvegarde la nouvelle ville
export function saveNewCity(dataName, newCityData) {
  const savedData = JSON.parse(localStorage.getItem(dataName)) || [];

  // Supprime la ville si elle est déjà présente dans la liste
  const indexOfExistingCity = savedData.findIndex(city => city.name === newCityData.name);
  if (indexOfExistingCity !== -1) {
    savedData.splice(indexOfExistingCity, 1);
  }

  if (savedData && savedData.length < 5) {
    savedData.push(newCityData);
    localStorage.setItem(dataName, JSON.stringify(savedData));
  } else {
    savedData.shift();
    savedData.push(newCityData);
    localStorage.setItem(dataName, JSON.stringify(savedData));
  }
}

// Permet de récupérer les informations de la dernière ville enregistrée dans le localStorage
export function getLastSavedCityInfo(savedData) {
  const lastCitySaved = savedData[savedData.length - 1];

  return lastCitySaved;
}