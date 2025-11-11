class SearchedCity extends HTMLElement {
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


    render() {
        if (!this.#data) {
            this.wrapper.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant SearchedCity');
            return;
        }
        const data = this.#data;
        
        const li = document.createElement("li");
        li.classList.add('bg-gray-50', 'dark:bg-gray-800', 'rounded-md');

        const a = document.createElement("a");
        a.classList.add('flex', 'flex-wrap', 'items-center', 'justify-center', 'px-2', 'py-1.5', 'text-sm');
        a.href = "monlien";

        const cityNameSpan = document.createElement('span');
        cityNameSpan.textContent = data.cityName;

        const weatherImg = document.createElement('img');
        weatherImg.src = data.icon;
        weatherImg.alt = "Weather icon";
        weatherImg.className = "w-7";

        const cityTemperatureSpan = document.createElement('span');
        cityTemperatureSpan.textContent = `${data.currentTemp.toFixed(0)}°`;

        a.append(cityNameSpan, weatherImg, cityTemperatureSpan);

        li.appendChild(a);
        // A réparer

        li.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("location-selected", {
                detail: { lat, lon , cityName},
                bubbles: true
            }));
        });
        
        this.wrapper.appendChild(li);
    }
}
// Définition du nom du composant
customElements.define('searched-city', SearchedCity);