/////////////////////////////////////////////////////// MENU

const puchinball = document.querySelector(".puchinball");
const cart = document.querySelector(".cart");
const comunidad = document.querySelector(".comunidad");
const tienda = document.querySelector(".tienda");

puchinball.addEventListener("click", () => {
  cart.classList.toggle("toggle");
  setTimeout(() => {
    tienda.classList.toggle("toggle");
  }, 150);
  setTimeout(() => {
    comunidad.classList.toggle("toggle");
  }, 300);
});
