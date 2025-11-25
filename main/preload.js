const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('weatherAPI', {
  fetchCities: (city) => ipcRenderer.invoke('fetch-cities', city),
  fetchWeather: (lat, lon) => ipcRenderer.invoke('fetch-weather', {lat, lon})
});