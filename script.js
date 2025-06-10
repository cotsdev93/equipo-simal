console.log("funciona");

const menu = document.querySelector(".fa-bars");

menu.addEventListener("click", () => {
  const nav2 = document.querySelector(".nav2");
  console.log("va");
  nav2.classList.toggle("animation");
});

class Products {
  constructor() {
    this.products = [];
    this.cargarRegistros();
  }

  async cargarRegistros() {
    const resultado = await fetch("data/products.JSON");
    this.products = await resultado.json();
    cargarProducts(this.products);
    console.log(this.products);
  }
}

function cargarProducts(products) {
  const productsDiv = document.getElementById("products");
  for (let product of products) {
    productsDiv.innerHTML += `
        <div class="productContainer">
          <div class="imgContainer">
            <img src="${product.img}" />
          </div>
          <div class="productSpecs">
            <p>${product.name}</p>
            <p>${product.price}</p>
          </div>
        </div>
      `;
  }
}

const products = new Products();
