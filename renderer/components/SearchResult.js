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

    // Setter qui enregistre les données dans le composant et met à jour le DOM automatiquement
    set data(features) {
        if (!features || !features.length) {
            return;
        }

        // Déduplication par city + state + country
        const seen = new Set();
        const uniqueFeatures = features.filter(f => {
            const key = `${f.properties.city}|${f.properties.state || f.properties.region}|${f.properties.country}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        this.#data = uniqueFeatures;
        this.render(uniqueFeatures);
    }


    render(features) {
        features.forEach(element => {
            const li = document.createElement("li");
            
            const cityName = element.properties.city;
            const region = element.properties.state || element.properties.region;
            const country = element.properties.country;
            const lat = element.geometry.coordinates[1];
            const lon = element.geometry.coordinates[0];
            console.log(window.weatherAPI.getCurrentWeatherByCoords(lat, lon))
            
            li.textContent = `${cityName} - ${region}, (${country})`;
            li.classList.add('bg-white', 'p-2', 'cursor-pointer', 'hover:bg-slate-100');
            // li.addEventListener('click', fetchCurrentWeather(lat, lon));
            
            this.wrapper.classList.add('shadow-xl', 'absolute', 'w-full','top-[calc(100%_+_.25rem)]', 'divide-y', 'divide-zinc-300');
            this.wrapper.id = 'search-bar-results';

            this.wrapper.appendChild(li);
        });
    }
}
// Définition du nom du composant
customElements.define('search-result', SearchResult);