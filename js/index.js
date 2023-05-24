//DOM//
let productos = [];
const contenedorProductos = document.querySelector("#contenedorProductos");
const botonesCategorias = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonAgregar = document.querySelectorAll(".productoAgregar");
const numerito = document.querySelector("#numerito");

//LLAMADO AL ARCHIVO PRODUCTOS.JSON//
async function cargarProductos(){
    try{
        const response = await fetch("./json/productos.json");
        const data = await response.json();
        productos = data;
        console.log("productos en json cargados exitosamente!");
        mostrarProductos(productos);
    }catch(error){
        console.error("se manifestó el siguiente error: " + error);
    }finally{
        console.log("proceso terminado");
    }
};

//MOSTRAR PRODUCTOS EN HTML
function mostrarProductos(productosElegidos){
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="productoImagen">
        <div class="productoDetalles">
            <h3 class="productoNombre">${producto.nombre}</h3>
            <p class="productoPrecio">$${producto.precio}</p>
            <button class="productoAgregar" id="${producto.id}">Agregar al carrito</button>
        </div>`;
        contenedorProductos.append(div);
    });
    actualizarBotonAgregar();
};
cargarProductos(productos);

//FILTRAR PRODUCTOS POR CATEGORIA
botonesCategorias.forEach(boton =>{

    boton.addEventListener("click", (e) =>{
        //AÑADIR O QUITAR CLASE ACTIVE
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        //FILTRAR PRODUCTOS POR NOMBRE
        if(e.currentTarget.id != "todos"){
            const productosCategoria = productos.find(producto => producto.categoria.id == e.currentTarget.id);
            tituloPrincipal.innerText = productosCategoria.categoria.nombre;
            //MOSTRAR PRODUCTOS FILTRADOS POR CATEGORIA
            const productosBoton = productos.filter(producto => producto.categoria.id == e.currentTarget.id);
            mostrarProductos(productosBoton);

        }else{
            tituloPrincipal.innerText = "Todos los productos";
            mostrarProductos(productos);
        }
    });
});

//BOTON AGREGAR AL CARRITO
function actualizarBotonAgregar(){
    botonAgregar = document.querySelectorAll(".productoAgregar");

    botonAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito)
    });
};

//GUARDANDO LOS PRODUCTOS EN CARRITO CON LS
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productosEnCarrito")

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

//AGREGAR PRODUCTOS AL CARRITO
function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id == idBoton);


    if(productosEnCarrito.some(producto => producto.id == idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    };
    actualizarNumerito();

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
    
    //TOAST
    Toastify({
        text: `${productoAgregado.nombre} fue agregado al carrito!`,
        duration: 2000,
        newWindow: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#0BDA51",
        },
        offset: {
            x: "3rem",
            y: "2.5rem"
        },
        onClick: function(){}
    }).showToast();

};

//ACTUALIZAR NUMERITO DE CARRITO
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
};

