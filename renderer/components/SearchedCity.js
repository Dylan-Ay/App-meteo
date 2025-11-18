class SearchedCity extends HTMLElement {
    #data;

    constructor() {
        super();
    }
    
    // Ajout de l'élement au DOM
    connectedCallback() {
        this.parentElement?.classList.add('bg-gray-50', 'dark:bg-gray-800', 'rounded-md', 'cursor-pointer');
        this.registerEvents();
    }

    // Setter qui enregistre les données dans le composant et met à jour le DOM automatiquement
    set data(value) {
        this.#data = value;
        this.render();
    }


    render() {
        if (!this.#data) {
            this.wrapper.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant SearchedCity');
            return;
        }
        const data = this.#data;
        
        this.innerHTML = `
            <div class="flex flex-wrap items-center justify-center px-2 py-1.5 text-sm">
                <span>${data.cityName}</span>
                <img src="${data.icon}" alt="Icône ${data.weather}" class="w-7">
                <span>${data.currentTemp.toFixed(0)}°</span>
            </div>
        `;

    }

    registerEvents() {
        const lat = this.#data.lat;
        const lon = this.#data.lon;
        const timeZone = this.#data.timeZone;
        const cityName = this.#data.cityName;
        
        this.parentElement.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("location-selected", {
                detail: { lat, lon , cityName, timeZone },
                bubbles: true
            }));
        })
    };
}
// Définition du nom du composant
customElements.define('searched-city', SearchedCity);