import { epochToLocaleTimeString } from '../../utils/functions.js';
class HourlyForecast extends HTMLElement {
    #data;

    constructor() {
        super();
    }
    
    connectedCallback() {
        this.parentElement.classList.add('px-3', 'py-4', 'flex', 'items-center', 'min-w-27');
    }

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
                ${Math.round(data.currentTemp)}°
            </p>
            <p class="text-xs pt-1">Ressenti ${Math.round(data.feelsLike)}°</p>
        </div>
    `;
    }
}
// Définition du nom du composant
customElements.define('hourly-forecast', HourlyForecast);