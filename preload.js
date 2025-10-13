const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('weatherAPI', {
  getCurrentWeatherByCity: (city) => ipcRenderer.invoke('get-current-weather-by-city', city),
});