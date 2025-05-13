document.addEventListener('DOMContentLoaded', () => {
    const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoElement = document.getElementById('total-carrito');
    const carritoCantidadElement = document.getElementById('carrito-cantidad');
    let carrito = [];

    cargarCarrito();
    actualizarCarritoUI();

    agregarCarritoButtons.forEach(button => {
        button.addEventListener('click', agregarProducto);
    });

    listaCarrito.addEventListener('click', eliminarProducto);

    function agregarProducto(event) {
        const button = event.target;
        const productoId = parseInt(button.dataset.id);
        const productoNombre = button.dataset.nombre;
        const productoPrecio = parseFloat(button.dataset.precio);

        const productoExistente = carrito.find(item => item.id === productoId);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id: productoId, nombre: productoNombre, precio: productoPrecio, cantidad: 1 });
        }

        guardarCarrito();
        actualizarCarritoUI();
    }

    function eliminarProducto(event) {
        if (event.target.classList.contains('eliminar-item')) {
            const itemId = parseInt(event.target.dataset.id);
            carrito = carrito.filter(item => item.id !== itemId);
            guardarCarrito();
            actualizarCarritoUI();
        }
    }

    function actualizarCarritoUI() {
        listaCarrito.innerHTML = '';
        let total = 0;
        let cantidadTotal = 0;

        carrito.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="item-info">
                    <h4>${item.nombre}</h4>
                    <p>Cantidad: ${item.cantidad} x $${item.precio.toFixed(2)}</p>
                </div>
                <span class="item-precio">$${(item.precio * item.cantidad).toFixed(2)}</span>
                <button class="eliminar-item" data-id="${item.id}">Eliminar</button>
            `;
            listaCarrito.appendChild(listItem);
            total += item.precio * item.cantidad;
            cantidadTotal += item.cantidad;
        });

        totalCarritoElement.textContent = `Total: $${total.toFixed(2)}`;
        carritoCantidadElement.textContent = cantidadTotal;
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
        }
    }
});
