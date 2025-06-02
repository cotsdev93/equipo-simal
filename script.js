console.log("funciona")

const menu = document.querySelector(".fa-bars")

menu.addEventListener("click",() =>{
    const nav2 = document.querySelector(".nav2")
    console.log("va")
    nav2.classList.toggle("animation")
})

