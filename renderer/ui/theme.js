// Gestion du  thème dark/light
export function toggleTheme() {
   const isDark =
   localStorage.theme === "dark" ||
   (!("theme" in localStorage) &&
   window.matchMedia("(prefers-color-scheme: dark)").matches);
   
   document.body.classList.toggle("dark", isDark);
}

export function setLight() {
   localStorage.theme = "light";
   document.body.classList.remove("dark");
}

export function setDark() {
   localStorage.theme = "dark";
   document.body.classList.add("dark");
}

export function setSystem() {
   localStorage.removeItem("theme");
   toggleTheme();
}