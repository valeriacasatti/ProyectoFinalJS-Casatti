//DOM
const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const contenedorCarritoAcciones = document.querySelector("#carritoAcciones");
let botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");
const botonVaciar = document.querySelector(".accionesVaciarCarrito");
const contenedorTotal = document.querySelector(".total");
const botonComprar = document.querySelector("#accionesComprar");

//TRAER LOS PRODUCTOS EN CARRITO GUARDADOS EN LS
let productosEnCarrito = localStorage.getItem("productosEnCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){

    //AÑADIR O QUITAR CLASE DISABLED
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML = "";

    //AGREGAR PRODUCTOS AL CARRITO
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
            <img class="carritoProductoImagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="carritoProductoTitulo">
                <small>Artículo:</small>
                <h3>${producto.nombre}</h3>
            </div>
            <div class="carritoProductoCantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carritoProductoPrecio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carritoProductoSubtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carritoProductoEliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
            </div>
            `;
            contenedorCarritoProductos.append(div);
        })

    //AÑADIR O QUITAR CLASE DISABLED
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
    };
    actualizarBotonEliminar();
    actualizarTotal();
}
cargarProductosCarrito();

//ELIMINAR DEL CARRITO
function eliminarDelCarrito(e){

    //TOAST
    Toastify({
        text: "Producto eliminado del carrito",
        duration: 2000,
        newWindow: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#ff003f",
        },
        offset: {
            x: "3rem",
            y: "2.5rem"
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;

    const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
};

function actualizarBotonEliminar(){
    botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });

};

//VACIAR CARRITO
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    //ALERT
    Swal.fire({
        title: "Estas segurx?",
        text: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos del carrito...`,
        icon: "warning",
        iconColor: "#ff003f",
        showDenyButton: true,
        denyButtonColor: "#ff003f",
        denyButtonText: "Cancelar!",
        confirmButtonColor: "#0BDA51",
        confirmButtonText: "Si estoy segurx!"
    }).then((result) =>{
        if(result.isConfirmed){
            productosEnCarrito.length = 0;
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
};

//CALCULAR TOTAL
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText =  `$${totalCalculado}`;
};

//IR A PAGAR
botonComprar.addEventListener("click", () =>{
    Swal.fire({
        text: "muchas gracias por tu compra!🖤",
        confirmButtonText: "volver a la tienda",
        confirmButtonColor: "#000000"
    }).then((result) =>{
        if(result.isConfirmed){
            productosEnCarrito.length = 0;
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            window.location.href = "index.html";
        }
    })
});
