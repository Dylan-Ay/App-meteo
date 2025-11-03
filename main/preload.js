const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('weatherAPI', {
  getCurrentWeatherByCity: (city) => ipcRenderer.invoke('get-current-weather-by-city', city),
  getFiveDaysForecastByCity: (city) => ipcRenderer.invoke('get-five-days-forecast-by-city', city),
  getCurrentWeatherByCoords: (lat, lon) => ipcRenderer.invoke('get-current-weather-by-coords', {lat, lon}),
  // fetchCoordinatesTest: (city) => ipcRenderer.invoke('get-test', city),
  getCities: (city) => ipcRenderer.invoke('get-cities', city)
});