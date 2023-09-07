// Definir las prendas como objetos en JavaScript
const productos = [
    {
        id: 1,
        nombre: 'Remera',
        precio: 20
    },
    {
        id: 2,
        nombre: 'Pantalón',
        precio: 30
    },
    {
        id: 3,
        nombre: 'Vestido',
        precio: 40
    },
    {
        id: 4,
        nombre: 'Campera',
        precio: 50
    },
    {
        id: 5,
        nombre: 'Zapatillas',
        precio: 60
    },
    {
        id: 6,
        nombre: 'Bufanda',
        precio: 10
    },
    {
        id: 7,
        nombre: 'Sombrero',
        precio: 15
    },
    {
        id: 8,
        nombre: 'Gorra',
        precio: 12
    },
    {
        id: 9,
        nombre: 'Medias',
        precio: 5
    },
    {
        id: 10,
        nombre: 'Guantes',
        precio: 8
    }
];

// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
    const producto = productos[index];
    
    // Obtener el carrito actual del Local Storage o crear uno nuevo si no existe
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el producto al carrito
    carrito.push(producto);

    // Guardar el carrito actualizado en el Local Storage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la lista en la página
    actualizarCarrito();
}

// Función para cargar los productos en la página
function cargarProductos() {
    const productosContainer = document.getElementById('productos-container');

    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
        `;

        productosContainer.appendChild(productoDiv);
    });
}

// Obtener todos los botones de agregar al carrito
const botonesAgregar = document.querySelectorAll('.agregar-al-carrito');

// Agregar un manejador de eventos a cada botón
botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
        const productoId = boton.getAttribute('data-id');
        const producto = productos.find((p) => p.id === parseInt(productoId, 10));
        agregarAlCarrito(producto);
    });
});

// Función para actualizar la lista de productos en el carrito
function actualizarCarrito() {
    // Obtener el carrito del Local Storage
    const carrito = JSON.parse(localStorage.getItem('carrito'));

    // Obtener la lista HTML del carrito
    const carritoLista = document.getElementById('carrito-lista');

    // Limpiar la lista actual
    carritoLista.innerHTML = '';

    // Si hay elementos en el carrito, mostrarlos en la lista
    if (carrito && carrito.length > 0) {
        carrito.forEach((producto) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio}`;
            carritoLista.appendChild(li);
        });
    } else {
        // Si el carrito está vacío, mostrar un mensaje
        const mensaje = document.createElement('li');
        mensaje.textContent = 'El carrito está vacío';
        carritoLista.appendChild(mensaje);
    }
}

// Cargar los productos al cargar la página
cargarProductos();

// Cargar el carrito al cargar la página
window.addEventListener('load', () => {
    actualizarCarrito();
});
