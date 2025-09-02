///////////////////////////////////// MENU

const logo = document.querySelector(".logo");
const puchinballBtn = document.querySelector(".puchinball");
const cartB = document.querySelector(".cart");
const comunidad = document.querySelector(".comunidad");
const tienda = document.querySelector(".tienda");
const firstH = document.querySelector(".firstH");
const secondH = document.querySelector(".secondH");
const firstC = document.querySelector(".firstC");
const secondC = document.querySelector(".secondC");
const firstT = document.querySelector(".firstT");
const firstCart = document.querySelector(".firstCart");
const sections = document.querySelectorAll(".section");

const mobile = window.matchMedia("(max-width: 768px)").matches;

puchinballBtn.addEventListener("click", () => {
  puchinball();
  console.log("funca  ");
});

logo.addEventListener("click", () => {
  setActiveSection(firstH);
});

function puchinball() {
  cartB.classList.toggle("toggle");
  setTimeout(() => {
    tienda.classList.toggle("toggle");
  }, 150);
  setTimeout(() => {
    comunidad.classList.toggle("toggle");
  }, 300);
}

comunidad.addEventListener("click", () => {
  setActiveSection(firstC);
  if (mobile) {
    puchinball();
  }
});

tienda.addEventListener("click", () => {
  setActiveSection(firstT);
  if (mobile) {
    puchinball();
  }
});

cartB.addEventListener("click", () => {
  setActiveSection(firstCart);
  if (mobile) {
    puchinball();
  }
});

function setActiveSection(sectionToShow) {
  sections.forEach((section) => {
    section.classList.remove("active"); // saca active a todas
    section.style.transform = "translateX(-100%)"; // manda a la izquierda

    if (mobile) {
      section.style.transform = "translateY(-130%)"; // manda a la izquierda
    }
  });

  sectionToShow.classList.add("active"); // pone active a la nueva
  sectionToShow.style.transform = "translateX(0%)"; // entra desde la izquierda
}

///////////////////////////////////// CARROUSEL HOME

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

chevronRight?.addEventListener("click", () => {
  if (currentIdx < maxIdx) {
    currentIdx++;
    scrollToImg(currentIdx);
  }
});

chevronLeft?.addEventListener("click", () => {
  if (currentIdx > 0) {
    currentIdx--;
    scrollToImg(currentIdx);
  }
});

carrouselContent?.addEventListener("scroll", () => {
  const imgWidth = getImgWidth();
  // Encuentra el índice más cercano al scroll actual
  const idx = Math.round(carrouselContent.scrollLeft / imgWidth);
  if (idx !== currentIdx) currentIdx = idx;
});

window.addEventListener("resize", () => {
  scrollToImg(currentIdx);
});

///////////////////////////////////// TIENDA
class BaseDeDatosProductos {
  constructor() {
    this.productos = [];
    this.cargarProductos();
  }

  async cargarProductos() {
    try {
      const resultado = await fetch("./data/products.json");
      if (!resultado.ok) throw new Error("Error al cargar productos");

      this.productos = await resultado.json();
      this.renderizarProductos(this.productos);
      this._bindCardClicks();
    } catch (error) {
      console.error(error);
    }
  }

  renderizarProductos(productos) {
    const productosElement = document.querySelector(".productosContainer");
    let html = "";
    let i = 0;

    for (const producto of productos) {
      html += `
        <div class="productoContainer" data-index="${i}">
          <div class="imgContainer">
            <img src="${producto.img}" alt="${producto.name}">
          </div>
          <div class="infoContainer">
            <p class="nombreProducto">${producto.name}</p>  
          </div>
          <div class="precioContainer">
            <p class="precio">$${producto.price}</p>
          </div>
        </div>
      `;
      i++;
    }

    productosElement.innerHTML = html;
  }

  _bindCardClicks() {
    const container = document.querySelector(".productosContainer");
    if (!container) return;

    container.addEventListener("click", (e) => {
      const card = e.target.closest(".productoContainer");
      if (!card) return;
      const idx = Number(card.dataset.index);
      const producto = this.productos[idx];
      if (producto) this._openSecondT(producto);
    });
  }

  _openSecondT(producto) {
    const panel = document.querySelector(".secondT");
    if (!panel) return;

    // agregado: por si estaba cerrando, limpio el estado de cierre
    panel.classList.remove("closing");

    panel.innerHTML = `
      <div class="productPanel" role="region" aria-label="${producto.name}">
        <button class="panelClose" aria-label="Cerrar">×</button>
        <div class="panelBody">
          <div class="panelImg">
            <img src="${producto.img}" alt="${producto.name}">
          </div>
          <div class="panelInfo">
            <h2 class="panelTitle">${producto.name}</h2>
            <p class="panelDesc">${producto.description ?? ""}</p>
            <div class="panelPrice">$${producto.price}</div>
            <div class="panelActions">
              <button class="btnPrimary" type="button">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    `;

    panel.classList.add("open");

    const closeBtn = panel.querySelector(".panelClose");
    const onKey = (e) => { if (e.key === "Escape") this._closeSecondT(); };
    closeBtn.addEventListener("click", () => this._closeSecondT());
    document.addEventListener("keydown", onKey, { once: true });
    closeBtn.focus();
  }

  _closeSecondT() {
    const panel = document.querySelector(".secondT");
    if (!panel) return;

    // agregado: salida invertida
    panel.classList.add("closing");
    panel.classList.remove("open");

    const onEnd = () => {
      panel.innerHTML = "";
      panel.classList.remove("closing");
      panel.removeEventListener("transitionend", onEnd);
    };

    panel.addEventListener("transitionend", onEnd);
  }
}


new BaseDeDatosProductos();
