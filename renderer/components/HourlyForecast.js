import { epochToLocaleTimeString } from '../../utils/functions.js';
class HourlyForecast extends HTMLElement {
    #data;

    constructor() {
        super();
    }
    
    // Ajout de l'élement au DOM
    connectedCallback() {
        this.parentElement.classList.add('px-3', 'py-4', 'flex', 'items-center', 'min-w-27');
    }

    // Setter qui enregistre les données dans le composant et met à jour le DOM automatiquement
    set data(value) {
        this.#data = value;
        this.render();
    }

    render() {
        if (!this.#data) {
            this.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant ForecastSummary');
            return;
        }
        
        const data = this.#data;
        
        this.innerHTML = `
        <div class="flex flex-col items-center">
            <span class="font-semibold">${epochToLocaleTimeString(data.time, data.timeZone, false)}</span>
            <img src="${data.icon}">
            <p>
                <i class="fa-solid fa-temperature-half"></i>
                ${data.currentTemp.toFixed(0)}°
            </p>
            <p class="text-xs pt-1">Ressenti ${data.feelsLike.toFixed(0)}°</p>
        </div>
    `;
    }
}
// Définition du nom du composant
customElements.define('hourly-forecast', HourlyForecast);