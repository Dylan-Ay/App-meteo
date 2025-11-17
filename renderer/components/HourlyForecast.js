class HourlyForecast extends HTMLElement {
    #data;

    constructor() {
        super();
        this.wrapper = document.createElement('ul');
    }
    
    // Ajout de l'élement au DOM
    connectedCallback() {
        this.appendChild(this.wrapper);
    }

    // Setter qui enregistre les données dans le composant et met à jour le DOM automatiquement
    set data(value) {
        console.log('test')
        this.#data = value;
        this.render();
    }

    render() {
        if (!this.#data) {
            this.wrapper.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant ForecastSummary');
            return;
        }
        
        const data = this.#data;
        console.log(data)
     
        this.wrapper.innerHTML = `
        <li>
            <img src="${this.#data.icon}">
            <p>${this.#data.currentTemp}°C</p>
            <p>Ressenti : ${this.#data.feelsLike}°C</p>
        </li>
    `;
    }
}
// Définition du nom du composant
customElements.define('hourly-forecast', HourlyForecast);