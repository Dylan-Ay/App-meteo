const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('weatherAPI', {
  getCities: (city) => ipcRenderer.invoke('get-cities', city),
  getCurrentWeatherByCoords: (lat, lon) => ipcRenderer.invoke('get-current-weather-by-coords', {lat, lon}),
  getFiveDaysForecastByCity: (lat, lon) => ipcRenderer.invoke('get-five-days-forecast-by-city', {lat, lon})
});