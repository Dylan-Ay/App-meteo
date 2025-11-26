// main.js
require('dotenv').config(); 

const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const weatherService = require('../services/weatherService');
weatherService.initializeService(process.env.API_KEY_OPEN_WEATHER);

const citiesService = require('../services/citiesService');
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

ipcMain.handle('fetch-cities', async (event, city) => {
  try {
    const test = await citiesService.fetchCities(city);
    return test;
  } catch (error) {
    console.error('Erreur fetch-cities:', error);
    throw error;
  }
})

ipcMain.handle('fetch-weather', async (event, { lat, lon }) => {
  try {
    const weather = await weatherService.fetchWeather(lat, lon);
    return weather;
    
  } catch (error) {
    console.error('Erreur fetch-weather:', error);
    throw error;
  }
})