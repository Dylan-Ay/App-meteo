# Desktop Weather App

## Welcome! 👋

Thanks for checking out this personal project.

## The Project

Desktop Weather App in JavaScript using a Web Components architecture with Electron.js. I used two APIs: OpenWeather to retrieve weather information and Geoapify to retrieve city results from the search bar.<br><br>
Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps without using a framework like React which I considered overkill for this kind of project.

## Getting Started

First, run the development server:

```bash
npm run start
# and
npm run dev:css
```

**The functionalities are :**
- Searching for any city in the world thanks to Geoapify API by clicking the city result it'll retrieve the weather for this actual city.
  
- The current and 24 hours weather information includes the temperature, the temperature as it feels, the weather icon, the wind speed, the humidity rate, the atmospheric pressure, and the times of sunrise and sunset.

- The data is saved in your browser's local storage so that it can be printed when you reload or close the app.

- You can access a history of your search terms under the search bar. These components are clickable and allow you to quickly print the weather forecast for the selected city.

- The daily weather of the next 7 days for the selected city (max temp, min temp, weather description, sunrise, sunset)
  
- I also created a dark theme which you can switch using the toggle situated in the top right corner of the app.

- Health indicators : Air pollution and UV Index data

- A cache was implemented to avoid an excess of API calls.

**The functionalities in building :**

- Weather maps
- Cities near the selected city
- Rain chart
- Activities near the selected city
- Resuming the weather with a description using AI
- Maybe more informations about the city

**Stacks used :**
- JavaScript Web Components / Electron.js
- Tailwind
- OpenWeather API
- Geoapify API
