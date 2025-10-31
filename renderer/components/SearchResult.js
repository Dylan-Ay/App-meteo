import { capitalizeFirstLetter, mSecToKmSec, epochToLocaleTimeString, isoCountryToFullName } from '../../utils/functions.js';

class SearchResult extends HTMLElement {
    #data;

    constructor() {
        super();
        this.wrapper = document.createElement('ul');
    }
    
    // Ajout de l'élement au DOM
    connectedCallback() {
        this.appendChild(this.wrapper);
    }

    // Setter qui enregistre les données dans le composant, renvoie les données automatiquement lors de l'appel du composant
    set data(features) {
        this.#data = features;
        this.render(features);
    }

    render(features) {
        if (!this.#data) {
            this.wrapper.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant');
            return;
        }

        features.forEach(element => {
            const li = document.createElement("li");

            const cityName = element.properties.city;
            const country = element.properties.postcodes ? element.properties.postcodes : element.properties.country;
            li.textContent = `${cityName} (${country})`;

            this.wrapper.appendChild(li);
        });
    }
}
// Définition du nom du composant
customElements.define('search-result', SearchResult);