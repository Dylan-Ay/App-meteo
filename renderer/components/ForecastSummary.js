import { capitalizeFirstLetter } from '../../utils/functions.js';

class ForecastSummary extends HTMLElement {
    #data;

    constructor() {
        super();
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('container');
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
        const fullTextWeather = data.weather[0].description;
        this.wrapper.innerHTML = `
            <h1 class="text-2xl font-semibold">Méteo à ${data.cityName}</h1>
            <div class="flex">
                <img src="${data.icon}" alt="Weather icon">
                <div class="flex flex-col">
                    <span class="text-3xl">${data.currentTemp.toFixed(0)}°</span>
                    <span class="">Ressenti: ${data.feelsLike.toFixed(0)}°</span>
                    <span>${data.weather[0].description}</span>
                </div>
            </div>
        `; 
    }
}
// Définition du nom du composant
customElements.define('forecast-summary', ForecastSummary);