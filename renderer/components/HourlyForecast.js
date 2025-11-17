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
        this.#data = value;
        this.render();
    }

    render(data) {
        if (!this.#data) {
            this.wrapper.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant ForecastSummary');
            return;
        }

        const data = this.#data;
        
        data.array.forEach(weather => {
            this.wrapper.innerHTML = `
                <li>
                    
                </li>
            `; 
        });
    }
}
// Définition du nom du composant
customElements.define('hourly-forecast', HourlyForecast);