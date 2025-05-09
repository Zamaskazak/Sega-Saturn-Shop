// src/app/modal.js
import { agregarAlCarrito } from './addToCart.js';

/**
 * Muestra el modal con los datos del producto.
 * @param {Object} prod
 */
export function mostrarDetalle(prod) {
  document.getElementById('tituloModal').textContent     = prod.title;
  document.getElementById('descripcionModal').textContent = prod.description;
  document.getElementById('precioModal').textContent     = `$${prod.price.toFixed(2)}`;
  document.getElementById('imgModal').src                = prod.image;

  const btn = document.getElementById('agregarAlCarrito');
  btn.onclick = () => {
    agregarAlCarrito(prod);
    bootstrap.Modal.getInstance(document.getElementById('detalleModal')).hide();
  };

  new bootstrap.Modal(document.getElementById('detalleModal')).show();
}
