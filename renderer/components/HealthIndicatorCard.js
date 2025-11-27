import { epochToLocaleTimeString } from '../../utils/functions.js';
class HealthIndicatorCard extends HTMLElement {
    #data;

    constructor() {
        super();
    }
    
    // Ajout de l'élement au DOM
    connectedCallback() {
        
    }

    // Setter qui enregistre les données dans le composant et met à jour le DOM automatiquement
    set data(value) {
        this.#data = value;
        this.render();
    }

    set type(value) {
        this._type = value;
        this.render();
    }

    get type() {
    return this._type;
    }

    render() {
        if (!this.#data) {
            this.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant DailyForecast');
            return;
        }

        const isAirQuality = this._type?.isAirQuality ?? false;
        const data = this.#data;
        
        this.innerHTML = `
            ${isAirQuality ? 'Air quality' : 'UV'}
        `;

        // Lors de la création du composant : card.type = { isAirQuality: true };
    }
}
// Définition du nom du composant
customElements.define('health-indicator-card', HealthIndicatorCard);