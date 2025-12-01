class AirQualityCard extends HTMLElement {
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
    
    getProperQualityNorms(qualityLevel) {
        switch (qualityLevel) {
            case 1:
                return ["Bonne", "Profitez de vos activités d'extérieur habituelles"]
            case 2:
                return ["Moyenne", "Profitez de vos activités d'extérieur habituelles"]
            case 3:
                return ["Dégradée", "Pour les personnes sensibles, réduisez les activités de plein air intenses", "bg-yellow-300"]
            case 4:
                return ["Mauvaise", "Envisagez de réduire les activités physiques intenses"]
            case 5:
                return ["Très mauvaise", "Réduisez / évitez les activités physiques, particulièrement à l'extérieur"]
            default: 
                return "Indéterminée";
        }
    }

    getProperQualityColors(qualityLevel) {
        let colorsArray = ['bg-cyan-300', 'bg-teal-400', 'bg-yellow-300', 'bg-red-500', 'bg-red-800'];
        let colorsQualityLevel = [];

        for (let i = 0; i != 5; i++) {
            if (i < qualityLevel) {
                colorsQualityLevel.push(colorsArray[i])
            } else {
                colorsQualityLevel.push('bg-gray-100')
            }
        }

        return colorsQualityLevel;
    }

    render() {
        if (!this.#data) {
            this.innerHTML = `<p>Pas de données</p>`;
            console.log('Pas de données reçu dans le composant AirQualityCard');
            return;
        }

        const data = this.#data;
        const colorsQuality = this.getProperQualityColors(data.airQuality);

        this.innerHTML = `
            <div class="flex flex-col gap-10 p-6 bg-[#a4c5f1] dark:bg-gray-800 dark:text-[#f3f3f3] rounded-lg h-full">
               <h3 class="text-xl font-semibold">Qualité de l'air</h3>
               <div class="flex flex-col gap-6">
                  <div class="flex justify-between">
                    <span class="font-semibold text-lg">${this.getProperQualityNorms(data.airQuality).at(0)}</span>
                    <div class="flex items-baseline gap-1">
                    <span class="text-xl font-semibold">${(data.airQuality)}</span> 
                    <span class="text-sm">sur 5</span>
                    </div>
                  </div>
                  <div class="indice-container flex gap-2">
                    ${colorsQuality.map(color => `<div class="w-16 ${color} rounded-xl h-2"></div>`).join('')}
                  </div>
                  <p class="p-4 bg-gray-100 text-black rounded-lg">${this.getProperQualityNorms(data.airQuality).at(1)}</p>
               </div>
            </div>
        `;
    }
}
// Définition du nom du composant
customElements.define('air-quality-card', AirQualityCard);