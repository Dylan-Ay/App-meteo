import { cleanContainer } from "../../utils/functions.js";

// Permet d'afficher une liste de ville selon un mot clé
export async function printCitiesResults(dataName, component, containerToAppend, howMany = 5) {
   const savedData = JSON.parse(localStorage.getItem(dataName)) || [];
   
   if (savedData.length != 0) {
      const citiesToAppend = [];
      const firstFourCities = savedData.slice(0, howMany);
      
      for (const element of firstFourCities) {
         const cityName = element.name;
         const timeZone = element.timezone;
         
         // try {
         //    const data = await window.weatherAPI.getCurrentWeatherByCoords(element.coord.lat, element.coord.lon);
            
         //    const newComponent = document.createElement(component);
         //    const li = document.createElement("li");
            
         //    newComponent.data = {
         //       icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
         //       currentTemp: data.main.temp,
         //       feelsLike: data.main.feels_like,
         //       cityName: cityName,
         //       timeZone: timeZone,
         //       weather: data.weather,
         //       windSpeed: data.wind.speed,
         //       humidity: data.main.humidity,
         //       sunrise: data.sys.sunrise,
         //       sunset: data.sys.sunset,
         //       pressure: data.main.pressure,
         //       country: data.sys.country,
         //       lat: element.coord.lat,
         //       lon: element.coord.lon,
         //    };
            
         //    li.appendChild(newComponent);
         //    citiesToAppend.push(li);
            
         // } catch(err) {
         //    console.error(`Erreur data données météo avec le composant ${component} et le storage ${dataName} :`, err);
         // }
      }
      cleanContainer(containerToAppend);
      
      citiesToAppend.forEach((element) => {
         containerToAppend.appendChild(element);
      });
   }
}