import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {

    const contenedorTarjetas = document.getElementById("contenedorTarjetas");

    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    fetch("./data/productos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP status: ${response.status}`);
      } 
        return response.json();
    })
    .then((data)=> {
        data.forEach((producto) => {
        //Creo el article
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");  

        //Creo el div de la imagen
        const contenedorImagen = document.createElement("div");
        contenedorImagen.classList.add("contenedor-imagen");

        //Creo la imagen
        const imagen = document.createElement("img");
        imagen.src =  `./${producto.imagen}`;
        imagen.alt = producto.nombre;

        contenedorImagen.appendChild(imagen);
   
        tarjeta.appendChild(contenedorImagen);

        //Creo el h3 del nombre
        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;
        tarjeta.appendChild(nombre);        

        //Creo el p del precio
        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;
        tarjeta.appendChild(precio);    
   
        //Creo el boton
        const boton = document.createElement("button");
        boton.classList.add("btn");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
        tarjeta.appendChild(boton);

        contenedorTarjetas.appendChild(tarjeta);

    });
  })
 .catch((error) => {console.error("Error al cargar los productos:", error);
  });
});

