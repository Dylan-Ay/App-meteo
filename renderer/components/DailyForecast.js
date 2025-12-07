import { epochToLocaleTimeString, mSecToKmSec } from '../../utils/functions.js';
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
        const rotation = (data.windDeg + 180) % 360;
        this.innerHTML = `
            <div class="flex flex-col md:gap-6 gap-3">
                <div class="flex flex-col">
                    <span class="font-semibold">${date.charAt(0).toUpperCase() + date.slice(1)}</span> 
                    <span class="text-sm">${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</span>
                </div>
                <div class="flex items-center gap-1.5 max-md:flex-col">
                    <img src="${data.icon}" alt="Weather icon" class="w-14">
                    <div class="flex flex-col text-end text-md gap-1.5">
                    <div>
                        <span>${Math.round(data.minTemp)}°</span> /
                        <span class="font-bold">${Math.round(data.maxTemp)}°</span>
                    </div>
                        <div class="flex gap-1.5 ${rotation > 283 && rotation < 350 ? 'items-end' : 'items-center'}">
                            <img class="dark:filter-[invert(1)] w-3.5" style="transform:rotate(${rotation}deg);" src="../src/icons/location-arrow.svg" alt="icon location-arrow">
                            <span class="text-sm">${mSecToKmSec(data.wind).toFixed()}km/h</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
// Définition du nom du composant
customElements.define('daily-forecast', DailyForecast);