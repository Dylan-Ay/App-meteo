const { app, BrowserWindow, dialog } = require('electron');
const path = require('node:path');
const translate = require('translate').default;
translate.engine = 'google';
translate.key = '';

const loadConfig = require('../config/config.js');

let config;

try {
  config = loadConfig();
} catch (error) {
  dialog.showErrorBox(
    'Configuration requise',
    error.message
  );
  app.quit();
  return;
}

const weatherService = require('../services/weatherService');
weatherService.initializeService(config.API_KEY_OPEN_WEATHER);

const citiesService = require('../services/citiesService');
citiesService.initializeService(config.API_KEY_GEOCODING);

const airQualityService = require('../services/airQualityService');
airQualityService.initializeService(config.API_KEY_OPEN_WEATHER);

if (!app.isPackaged) {
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
    },
    icon: path.join(__dirname, 'src', 'app-icon.png')
  })

  win.loadFile('./renderer/index.html')

  if (!app.isPackaged) {
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
    const cities = await citiesService.fetchCities(city);
    return cities;

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

ipcMain.handle('fetch-air-quality', async (event, { lat, lon }) => {
  try {
    const airQuality = await airQualityService.fetchAirQuality(lat, lon);
    return airQuality;
    
  } catch (error) {
    console.error('Erreur fetch-air-quality:', error);
    throw error;
  }
})

ipcMain.handle('translate', async (event, string) => {
  return translate(string, { from: 'en', to: 'fr' });
});