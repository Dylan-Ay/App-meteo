(function() {
   const root = document.documentElement;
   
   // Appliquer le thème au chargement
   function applyTheme(theme) {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      root.classList.add("theme-ready"); // rendre le DOM visible
   }
   
   // Déterminer le thème initial
   const savedTheme = localStorage.getItem("theme");
   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
   
   if (savedTheme === "light" || (!savedTheme && prefersDark)) {
      applyTheme("light");
   } else {
      applyTheme("dark");
   }
   
   window.toggleTheme = function() {
      const current = root.getAttribute("data-theme");
      const newTheme = current === "dark" ? "light" : "dark";
      applyTheme(newTheme);
   };
})();