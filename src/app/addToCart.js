import * as cart from './carrito.js';

export function agregarAlCarrito(prod) {
  const existe = cart.carrito.find(x => x.id === prod.id);
  if (existe) existe.cantidad++;
  else cart.carrito.push({ ...prod, cantidad: 1 });

  cart.guardarCarrito();
  cart.actualizarCarritoUI();
  Swal.fire('¡Agregado!', prod.title, 'success');
}
