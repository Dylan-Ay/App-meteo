import { epochToLocaleTimeString } from '../../utils/functions.js';
class DailyForecast extends HTMLElement {
    #data;

    constructor() {
        super();
    }
    
    connectedCallback() {
        this.parentElement.classList.add('p-4', 'flex', 'flex-col', 'bg-[#a4c5f1]', 'rounded-lg', 'dark:bg-gray-800', 'dark:text-[#f3f3f3]', 'w-44', 'md:min-w-44', 'min-w-36');
    }

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
        const date = data.date;
        const weatherDesc = data.weatherDesc;
        
        this.innerHTML = `
            <div class="flex flex-col gap-6">
                <div class="flex flex-col">
                    <span class="font-semibold">${date.charAt(0).toUpperCase() + date.slice(1)}</span> 
                    <span class="text-sm">${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</span>
                </div>
                <div class="flex items-center max-md:gap-1.5">
                    <img src="${data.icon}" alt="Weather icon" class="w-14">
                    <div class="flex flex-col text-end text-sm gap-1.5">
                        <span class="font-bold">${Math.round(data.maxTemp)}°</span>
                        <span>${Math.round(data.minTemp)}°</span>
                    </div>
                    <div class="md:flex hidden flex-col gap-1.5 flex-1">
                        <div class="flex items-center self-end">
                            <img class="dark:filter-[invert(1)] w-5" src="../src/icons/sunset.svg" alt="icon sunset">
                            <span class="text-sm">${epochToLocaleTimeString(data.sunset, data.timezone)}</span>
                            </div>
                        <div class="flex items-center self-end">
                            <img class="dark:filter-[invert(1)] w-5" src="../src/icons/sunrise.svg" alt="icon sunrise">
                            <span class="text-sm">${epochToLocaleTimeString(data.sunrise, data.timezone)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
// Définition du nom du composant
customElements.define('daily-forecast', DailyForecast);