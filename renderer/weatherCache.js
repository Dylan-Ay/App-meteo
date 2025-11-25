import { formatMinutesSeconds } from '../utils/functions.js';

export async function getWeather(lat, lon) {
    const cacheDuration = 10 * 60 * 10000; // (10 minutes de mise en cache)
    const now = Date.now();

    const cache = JSON.parse(localStorage.getItem("weatherCache")) || null;

    if (cache) {
        const now = Date.now();
        const cacheLeft = Math.max(0, cacheDuration - (now - cache.cacheAt));
        console.log("Cache restant :", formatMinutesSeconds(cacheLeft));
    }

    // Si les données en cache correspondent aux données de la ville, aucun appel API, on retourne les données en cache
    if (cache && cache.lat === lat && cache.lon === lon && now - cache.cacheAt < cacheDuration) {
        return cache.data;
    }
    
    const fresh = await window.weatherAPI.fetchWeather(lat, lon);

    localStorage.setItem("weatherCache", JSON.stringify({
        lat,
        lon,
        cacheAt: now,
        data: fresh
    }));

    return fresh;
}