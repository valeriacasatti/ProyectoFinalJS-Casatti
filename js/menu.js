//DOM
const openMenu = document.querySelector("#openMenu");
const closeMenu = document.querySelector("#closeMenu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
  aside.classList.add("asideVisible");
});

closeMenu.addEventListener("click", () => {
  aside.classList.remove("asideVisible");
});

botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("asideVisible");
  })
);
