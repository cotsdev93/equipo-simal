///////////////////////////////////// MENU

const puchinballBtn = document.querySelector(".puchinball");
const cart = document.querySelector(".cart");
const comunidad = document.querySelector(".comunidad");
const tienda = document.querySelector(".tienda");
const firstH = document.querySelector(".firstH");
const secondH = document.querySelector(".secondH");
const firstC = document.querySelector(".firstC")
const secondC = document.querySelector(".secondC")
const firstT = document.querySelector(".firstT")

const mobile = window.matchMedia("(max-width: 768px)").matches;

puchinballBtn.addEventListener("click", () => {
  puchinball();
});

function puchinball() {
  cart.classList.toggle("toggle");
  setTimeout(() => {
    tienda.classList.toggle("toggle");
  }, 150);
  setTimeout(() => {
    comunidad.classList.toggle("toggle");
  }, 300);
}

tienda.addEventListener("click", () => {
  firstH.classList.toggle("toggle");
  secondH.classList.toggle("opacity");
  firstT.classList.toggle("toggle")
  if (mobile) {
    puchinball();
  }
});

comunidad.addEventListener("click", () => {
  firstH.classList.toggle("toggle");
  secondH.classList.toggle("opacity");
  firstC.classList.toggle("toggle")
  if (mobile) {
    puchinball();
  }
});

///////////////////////////////////// CARROUSEL HOME

// Selecciona los elementos del carrusel
const carrouselContent = document.querySelector(".carrouselContent");
const carrouselImgs = carrouselContent
  ? carrouselContent.querySelectorAll("img")
  : [];
const chevronLeft = document.querySelector(".chevronBL");
const chevronRight = document.querySelector(".chevronBR");

// Calcula el ancho de una imagen (todas deben tener el mismo ancho)
function getImgWidth() {
  if (carrouselImgs.length === 0) return 0;
  return carrouselImgs[0].clientWidth;
}

// Función para hacer scroll suave al índice dado
function scrollToImg(idx) {
  const imgWidth = getImgWidth();
  carrouselContent.scrollTo({
    left: imgWidth * idx,
    behavior: "smooth",
  });
}

// Estado actual del carrusel
let currentIdx = 0;
const maxIdx = carrouselImgs.length - 1;

// Botón derecha
chevronRight?.addEventListener("click", () => {
  if (currentIdx < maxIdx) {
    currentIdx++;
    scrollToImg(currentIdx);
  }
});

// Botón izquierda
chevronLeft?.addEventListener("click", () => {
  if (currentIdx > 0) {
    currentIdx--;
    scrollToImg(currentIdx);
  }
});

// Sincroniza el índice al hacer scroll manual
carrouselContent?.addEventListener("scroll", () => {
  const imgWidth = getImgWidth();
  // Encuentra el índice más cercano al scroll actual
  const idx = Math.round(carrouselContent.scrollLeft / imgWidth);
  if (idx !== currentIdx) currentIdx = idx;
});

// Opcional: Ajusta el scroll al hacer resize para mantener la imagen centrada
window.addEventListener("resize", () => {
  scrollToImg(currentIdx);
});
