export async function getWeather(lat, lon) {
   const cacheDuration = 10 * 60 * 10000; // (10 minutes de mise en cache, 100 pour dev)
   const now = Date.now();
   
   const cache = JSON.parse(localStorage.getItem("weatherCacheCitiesList")) || {};

   const normLat = Number(lat).toFixed(4);
   const normLon = Number(lon).toFixed(4);
   const key = `${normLat},${normLon}`;
   
   // En dev
   // if (cache[key]) {
   //    const now = Date.now();
   //    const cacheLeft = Math.max(0, cacheDuration - (now - cache[key].cacheAt));
   //    console.log("Cache restant :", formatMinutesSeconds(cacheLeft));
   // }
   
   if (cache[key] && (now - cache[key].cacheAt < cacheDuration)) {
      return cache[key].data;
   }
   
   const fresh = await window.weatherAPI.fetchWeather(lat, lon);
   
   cache[key] = {
      cacheAt: now,
      data: fresh
   };
   
   localStorage.setItem("weatherCacheCitiesList", JSON.stringify(cache));
   
   return fresh;
}