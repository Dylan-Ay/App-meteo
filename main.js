const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
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

  win.loadFile('index.html')

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
const { fetchCoordinates, fetchCurrentWeather } = require('./weatherService');

ipcMain.handle('get-current-weather-by-city', async (event, city) => {
  console.log('Ville reçue dans le handler:', city);
  try {
    const { lat, lon } = await fetchCoordinates(city);
    const currentCityWeather = await fetchCurrentWeather(lat, lon);
    return currentCityWeather;

  } catch (error) {
    console.error('Erreur get-weather-by-city:', error);
    throw error;
  }
});