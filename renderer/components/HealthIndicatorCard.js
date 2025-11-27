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

    render() {
        if (!this.#data) {
            this.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant DailyForecast');
            return;
        }
        
        const data = this.#data;
        
        this.innerHTML = `
            
        `;
    }
}
// Définition du nom du composant
customElements.define('health-indicator-card', HealthIndicatorCard);