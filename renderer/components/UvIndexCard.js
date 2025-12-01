class UvIndexCard extends HTMLElement {
    #data;

    constructor() {
        super();
    }
    
    connectedCallback() {
        this.classList.add('w-1/2', 'max-md:w-full');
    }

    set data(value) {
        this.#data = value;
        this.render();
    }
    
    getProperIndexNorms(uvLevel) {
        if (uvLevel > -1) {
            const uvLevelToPercentage = (uvLevel * 10) / 120 * 100; 
            if (uvLevel <= 2) {
                return ["Bas", "Risque très faible. Aucune protection nécessaire, sauf en cas d'exposition prolongée.", uvLevelToPercentage];
            } else if (uvLevel <= 5) {
                return ["Modéré", "Cherchez l'ombre en mi-journée lorsque le soleil est à son plus fort.", uvLevelToPercentage];
            } else if (uvLevel <=7) {
                return ["Élevé", "Réduisez l'exposition au soleil entre 11h et 16h, portez une protection solaire.", uvLevelToPercentage];
            } else if (uvLevel <= 10) {
                return ["Très élevé", "Évitez le soleil entre 11h et 16h, portez une protection solaire élevée.", uvLevelToPercentage];
            } else {
                return ["Extrême", "L'exposition au soleil est dangereuse, prenez toutes les précautions.", uvLevelToPercentage];
            }
        } else {
            return "Indéterminée";
        }
    }

    render() {
        if (!this.#data) {
            this.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant UvIndexCard');
            return;
        }

        const data = this.#data;
        const uvIndex = Math.floor(data.uvIndex);
        const uvPercentageBar = Math.floor(this.getProperIndexNorms(uvIndex).at(2));
        
        this.innerHTML = `
            <div class="flex flex-col gap-10 p-6 bg-[#a4c5f1] dark:bg-gray-800 dark:text-[#f3f3f3] rounded-lg h-full">
               <h3 class="text-lg font-semibold">Indice UV</h3>
               <div class="flex flex-col gap-6">
                  <div class="flex justify-between">
                     <span class="font-semibold text-xl">${uvIndex > -1 ? this.getProperIndexNorms(uvIndex).at(0) : 'Indéterminée'}</span>
                     <div class="flex items-baseline gap-1">
                        <span class="text-xl font-semibold">${uvIndex > -1 ? uvIndex : 0}</span> 
                        <span class="text-sm">sur 12</span>
                     </div>
                  </div>
                  <div class="uv-container">
                     <div class="uv-index-info relative">
                        <div class="gauge bg-[linear-gradient(90deg,#74cf5f,#f7d047_26.56%,#f19f3b_50%,#e94b65_73.96%,#b95cd7)] rounded-xl h-2"></div>
                        <div class="gauge-cursor absolute border-3 border-white bg-black h-3.5 w-2.5 rounded-md left-[${uvPercentageBar}%] -top-0.5"></div>
                     </div>
                  </div>
                  <p class="p-4 bg-gray-100 text-black rounded-lg">${ uvIndex > -1 ? this.getProperIndexNorms(uvIndex).at(1) : "L'indice UV est indisponible actuellement, veuillez nous excuser pour la gêne occasionnée."}</p>
               </div>
            </div>
        `;
    }
}
// Définition du nom du composant
customElements.define('uv-index-card', UvIndexCard);