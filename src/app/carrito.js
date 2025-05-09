export let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

export function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function actualizarCarritoUI() {
  const container = document.getElementById('carrito-items');
  const countEl   = document.getElementById('cartCount');
  container.innerHTML = '';
  let totalQty = 0, totalAmt = 0;

  carrito.forEach(p => {
    totalQty += p.cantidad;
    totalAmt += p.price * p.cantidad;

    // Deshabilitar cuando cantidad === 1
    const disableDecrease = p.cantidad === 1 ? 'disabled' : '';

    container.innerHTML += `
      <div class="d-flex align-items-center mb-3">
        <img src="${p.image}" width="40" class="me-2" alt="${p.title}">
        <div class="flex-grow-1">
          <strong>${p.title}</strong><br>
          <small>
            $${p.price.toFixed(2)} × ${p.cantidad}
            = $${(p.price * p.cantidad).toFixed(2)}
          </small>
        </div>
        <!-- Restar -->
        <button
          class="btn btn-sm btn-outline-warning me-1"
          onclick="cambiarCantidad(${p.id}, -1)"
          ${disableDecrease}
        >
          <i class="bi bi-cart-dash"></i>
        </button>
        <!-- Sumar -->
        <button
          class="btn btn-sm btn-outline-success me-2"
          onclick="cambiarCantidad(${p.id}, 1)"
        >
          <i class="bi bi-cart-plus"></i>
        </button>
        <!-- Eliminar -->
        <button
          class="btn btn-sm btn-outline-danger btn-eliminar"
          onclick="eliminarDelCarrito(${p.id})"
        >
          <i class="bi bi-trash3"></i>
        </button>
      </div>`;
  });

  if (carrito.length) {
    container.innerHTML += `
      <hr>
      <div class="text-end px-3">
        <strong>Total: $${totalAmt.toFixed(2)}</strong>
      </div>`;
  }

  countEl.textContent = totalQty;
}

export function cambiarCantidad(id, delta) {
  const item = carrito.find(x => x.id === id);
  if (!item) return;
  item.cantidad = Math.max(1, item.cantidad + delta);
  guardarCarrito();
  actualizarCarritoUI();
}

export function eliminarDelCarrito(id) {
  carrito = carrito.filter(x => x.id !== id);
  guardarCarrito();
  actualizarCarritoUI();
}

// Expongo las funciones globalmente para que onclick las ubique
window.cambiarCantidad    = cambiarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;
window.actualizarCarritoUI = actualizarCarritoUI;
