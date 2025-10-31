// main.js
require('dotenv').config(); 

const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const weatherService = require('../weatherService');
weatherService.initializeService(process.env.API_KEY_OPEN_WEATHER);

const citiesService = require('../citiesService');
citiesService.initializeService(process.env.API_KEY_GEOCODING);

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}
let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./renderer/index.html')

  if (env === "development") {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const { ipcMain } = require('electron');

ipcMain.handle('get-current-weather-by-city', async (event, city) => {
  try {
    const { lat, lon } = await weatherService.fetchCoordinates(city);
    const currentCityWeather = await weatherService.fetchCurrentWeather(lat, lon);
    return currentCityWeather;

  } catch (error) {
    console.error('Erreur get-current-weather-by-city:', error);
    throw error;
  }
});

ipcMain.handle('get-five-days-forecast-by-city', async (event, city) => {
  try {
    const { lat, lon } = await weatherService.fetchCoordinates(city);
    const currentCityWeather = await weatherService.fetchFiveDaysForecast(lat, lon);
    return currentCityWeather;

  } catch (error) {
    console.error('Erreur get-five-days-forecast-by-city:', error);
    throw error;
  }
})

// ipcMain.handle('get-test', async (event, city) => {
//   try {
//     const test = await weatherService.fetchCoordinates(city);
//     return test;
//   } catch (error) {
//     console.error('Erreur get-test:', error);
//     throw error;
//   }
// })

ipcMain.handle('get-cities', async (event, city) => {
  try {
    const test = await citiesService.fetchCities(city);
    return test;
  } catch (error) {
    console.error('Erreur get-cities:', error);
    throw error;
  }
})