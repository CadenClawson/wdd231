document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("#menu");
    const navMenu = document.querySelector("#navMenu");
  
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
  
      if (navMenu.classList.contains("hidden")) {
        menuButton.innerHTML = "&#9776;";
      } else {
        menuButton.innerHTML = "&times;";
      }
    });
  });
  