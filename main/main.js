// main.js
require('dotenv').config(); 

const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const service = require('../weatherService');
const API_KEY_VALUE = process.env.API_KEY; 

service.initializeService(API_KEY_VALUE);

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
    const { lat, lon } = await service.fetchCoordinates(city);
    const currentCityWeather = await service.fetchCurrentWeather(lat, lon);
    return currentCityWeather;

  } catch (error) {
    console.error('Erreur get-current-weather-by-city:', error);
    throw error;
  }
});

ipcMain.handle('get-five-days-forecast-by-city', async (event, city) => {
  try {
    const { lat, lon } = await service.fetchCoordinates(city);
    const currentCityWeather = await service.fetchFiveDaysForecast(lat, lon);
    return currentCityWeather;

  } catch (error) {
    console.error('Erreur get-five-days-forecast-by-city:', error);
    throw error;
  }
})