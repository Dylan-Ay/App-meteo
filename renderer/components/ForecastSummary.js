import { capitalizeFirstLetter, mSecToKmSec, epochToLocaleTimeString } from '../../utils/functions.js';

class ForecastSummary extends HTMLElement {
    #data;

    constructor() {
        super();
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('container', 'w-4/5', 'mx-auto');
    }
    
    // Ajout de l'élement au DOM
    connectedCallback() {
        this.appendChild(this.wrapper);
    }

    // Setter qui enregistre les données dans le composant, renvoie les données automatiquement lors de l'appel du composant
    set data(value) {
        this.#data = value;
        this.render();
    }

    render() {
        if (!this.#data) {
            this.wrapper.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant');
            return;
        }

        const data = this.#data;

        this.wrapper.innerHTML = `
            <h1 class="text-2xl font-semibold mb-4">Méteo à ${data.cityName}</h1>
            <div id="forecast-summary" class="flex flex-col md:flex-row justify-between bg-blue-50 rounded-2xl p-4">
                <div id="weather-main" class="flex w-lg-2/5 items-center">
                    <img src="${data.icon}" alt="Weather icon">
                    <div class="flex flex-col">
                        <span class="text-4xl font-semibold">${data.currentTemp.toFixed(0)}°</span>
                        <span class="text-sm">Ressenti de l'air: ${data.feelsLike.toFixed(0)}°</span>
                        <span class="font-semibold">${capitalizeFirstLetter(data.weather[0].description)}</span>
                    </div>
                </div>
                <div id="weather-details" class="bg-white p-3 flex flex-col gap-2 rounded-2xl">
                    <div class="flex justify-between gap-10">
                        <span class="font-light">Vitesse du vent</span>
                        <span class="font-semibold">${mSecToKmSec(data.windSpeed).toFixed(0)} km/h</span>
                    </div>
                    <div class="flex justify-between gap-10">
                        <span class="font-light">Taux d'humidité</span>
                        <span class="font-semibold">${data.humidity} %</span>
                    </div>
                    <div class="flex justify-between gap-10">
                        <span class="font-light">Pression</span>
                        <span class="font-semibold">${data.pressure} hPa</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex">
                            <img src="../src/icons/sunrise.svg" alt="icon sunrise">
                            <span>${epochToLocaleTimeString(data.sunrise)}</span>
                        </div>
                        <div class="flex">
                            <img src="../src/icons/sunset.svg" alt="icon sunrise">
                            <span>${epochToLocaleTimeString(data.sunset)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `; 
    }
}
// Définition du nom du composant
customElements.define('forecast-summary', ForecastSummary);