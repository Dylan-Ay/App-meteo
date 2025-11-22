class NextDayForecast extends HTMLElement {
    #data;

    constructor() {
        super();
    }
    
    // Ajout de l'élement au DOM
    connectedCallback() {
        this.parentElement.classList.add('p-4', 'flex', 'flex-col', 'bg-[#a4c5f1]', 'rounded-lg', 'dark:bg-gray-800', 'dark:text-[#f3f3f3]', 'w-44', 'md:min-w-44', 'min-w-36');
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
        const date = data.date;
        const weatherDesc = data.weatherDesc;
        
        this.innerHTML = `
            <div class="flex flex-col gap-6">
                <div class="flex flex-col">
                    <span class="font-semibold">${date.charAt(0).toUpperCase() + date.slice(1)}</span> 
                    <span class="text-sm">${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</span>
                </div>
                <div class="flex gap-3">
                    <img src="${data.icon}" alt="Weather icon" class="w-15">
                    <div class="flex flex-col text-end">
                        <span class="font-semibold">${data.maxTemp}°</span>
                        <span>${data.minTemp}°</span>
                    </div>
                </div>
            </div>
        `;
    }
}
// Définition du nom du composant
customElements.define('next-day-forecast', NextDayForecast);