class NextDayForecast extends HTMLElement {
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
            console.log('Pas de données reçu dans le composant NextDayForecast');
            return;
        }
        
        const data = this.#data;
        console.log(data);
        
        this.innerHTML = `
            <div class="flex">
                <span></span> 
                <span></span>
            </div>
        `;
    }
}
// Définition du nom du composant
customElements.define('next-day-forecast', NextDayForecast);