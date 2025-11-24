const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('weatherAPI', {
  fetchCities: (city) => ipcRenderer.invoke('fetch-cities', city),
  fetchCurrentWeatherByCoords: (lat, lon) => ipcRenderer.invoke('fetch-current-weather-by-coords', {lat, lon}),
  fetchHourlyForecastByCity: (lat, lon) => ipcRenderer.invoke('fetch-hourly-forecast-by-city', {lat, lon})
});