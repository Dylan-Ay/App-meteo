const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('weatherAPI', {
  getCities: (city) => ipcRenderer.invoke('get-cities', city),
  getCurrentWeatherByCoords: (lat, lon) => ipcRenderer.invoke('get-current-weather-by-coords', {lat, lon}),
  fetchHourlyForecastByCity: (lat, lon) => ipcRenderer.invoke('fetch-hourly-forecast-by-city', {lat, lon})
});