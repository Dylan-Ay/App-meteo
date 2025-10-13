const cityInput = document.getElementById('city-input');
const meteoContainer = document.getElementById('meteo-container');

let typingTimer;
const debounceDelay = 500;

cityInput.addEventListener("input", (event) => {
  const city = cityInput.value.trim();
  if (city) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      window.weatherAPI.getCurrentWeatherByCity(city)
      .then(data => {
        console.log("Données méteo:", data);
      })
      .catch(err => {
        console.error('Erreur:', err);
      });
    }, debounceDelay);
  }
});