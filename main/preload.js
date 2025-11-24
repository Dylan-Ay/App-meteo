const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('weatherAPI', {
  fetchCities: (city) => ipcRenderer.invoke('fetch-cities', city),
  fetchCurrentWeatherByCoords: (lat, lon) => ipcRenderer.invoke('fetch-current-weather-by-coords', {lat, lon}),
  fetchHourlyForecastByCoords: (lat, lon) => ipcRenderer.invoke('fetch-hourly-forecast-by-coords', {lat, lon}),
  fetchDailyForecastByCoords: (lat, lon) => ipcRenderer.invoke('fetch-daily-forecast-by-coords', {lat, lon})
});