const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { app } = require('electron');

// Chemin vers le fichier secret.env
const envPath = app.isPackaged
  ? path.join(process.resourcesPath, 'secret.env') // build EXE
  : path.join(__dirname, '..', '.env');           // DEV

require('dotenv').config({ path: envPath });

function loadConfig() {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    throw new Error('La variable SECRET_KEY doit être définie !');
  }

  const keysPath = app.isPackaged
    ? path.join(process.resourcesPath, 'keys.enc')
    : path.join(__dirname, '..', 'keys.enc');

  const payload = fs.readFileSync(keysPath, 'utf8');
  const [ivHex, encrypted] = payload.split(':');
  const iv = Buffer.from(ivHex, 'hex');

  const key = crypto.createHash('sha256').update(secret).digest();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
}

module.exports = loadConfig;