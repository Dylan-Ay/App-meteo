require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const secret = process.env.SECRET_KEY;
if (!secret) throw new Error('Définir SECRET_KEY dans .env');

const apiKeys = {
  API_KEY_OPEN_WEATHER: process.env.API_KEY_OPEN_WEATHER,
  API_KEY_GEOCODING: process.env.API_KEY_GEOCODING
};

// Génère un vecteur d'initialisation aléatoire
const iv = crypto.randomBytes(16);

// Clé dérivée à partir du mot de passe
const key = crypto.createHash('sha256').update(secret).digest();

// Chiffrement
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(JSON.stringify(apiKeys), 'utf8', 'hex');
encrypted += cipher.final('hex');

// On sauvegarde IV + données chiffrées (hex)
const payload = iv.toString('hex') + ':' + encrypted;

// Écriture dans le fichier keys.enc à la racine du projet
const outputPath = path.join(process.cwd(), 'keys.enc');
fs.writeFileSync(outputPath, payload);

console.log(`Clés chiffrées générées dans ${outputPath} !`);