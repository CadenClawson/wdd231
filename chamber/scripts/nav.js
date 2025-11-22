// Mobile Navigation Toggle
const menuButton = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});
