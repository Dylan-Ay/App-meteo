import { epochToLocaleTimeString } from '../../utils/functions.js';
class HourlyForecast extends HTMLElement {
    #data;

    constructor() {
        super();
    }
    
    // Ajout de l'élement au DOM
    connectedCallback() {
        this.parentElement.classList.add('px-3', 'py-3');
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
            <span>${epochToLocaleTimeString(data.time, data.timeZone)}</span>
            <img src="${data.icon}">
            <p>${data.currentTemp.toFixed(0)}°C</p>
            <p>Ressenti : ${data.feelsLike.toFixed(0)}°C</p>
    `;
    }
}
// Définition du nom du composant
customElements.define('hourly-forecast', HourlyForecast);