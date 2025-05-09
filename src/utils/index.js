import { renderizarProductos } from '../app/cards.js';
import * as cart               from '../app/carrito.js';
import { cargarCategorias, filtrarYRenderizar } from './update.js';
const API_URL = 'https://fakestoreapi.com/products';
const contenedor = document.getElementById('productos');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const filtroCat   = document.getElementById('filtro-categoria');
const btnCarrito  = document.getElementById('btnCarrito');
const sidebar     = document.getElementById('sidebar-carrito');
const vaciarBtn   = document.getElementById('vaciarCarrito');
const finalizarBtn= document.getElementById('finalizarCompra');

let productosGlobal = [];


// Fetch y render inicial
fetch(API_URL)
  .then(r => r.json())
  .then(data => {
    productosGlobal = data;
    cargarCategorias(data, filtroCat);
    renderizarProductos(contenedor, data);
    cart.actualizarCarritoUI();
  });

// Búsqueda y filtro
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  filtrarYRenderizar(productosGlobal, searchInput, filtroCat, lista => renderizarProductos(contenedor, lista));
});
searchInput.addEventListener('input', () =>
  filtrarYRenderizar(productosGlobal, searchInput, filtroCat, lista => renderizarProductos(contenedor, lista))
);
filtroCat.addEventListener('change', () =>
  filtrarYRenderizar(productosGlobal, searchInput, filtroCat, lista => renderizarProductos(contenedor, lista))
);

// Sidebar carrito
btnCarrito.onclick = () => sidebar.classList.toggle('show');
document.getElementById('closeSidebar').onclick = () => sidebar.classList.remove('show');

// Vaciar y finalizar
vaciarBtn.onclick = () => {
  if (!cart.carrito.length) return Swal.fire('Vacío','No hay productos','info');
  Swal.fire({
    title: '¿Eliminar todo?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then(r => {
    if (r.isConfirmed) {
      cart.carrito.length = 0;
      cart.guardarCarrito();
      cart.actualizarCarritoUI();
      Swal.fire('Vaciado','Carrito limpio','success');
    }
  });
};

finalizarBtn.onclick = () => {
  if (!cart.carrito.length) return Swal.fire('Vacío','Nada que comprar','info');
  let resumen='', total=0;
  cart.carrito.forEach(p => {
    resumen += `${p.title} × ${p.cantidad} = $${(p.price*p.cantidad).toFixed(2)}<br/>`;
    total   += p.price*p.cantidad;
  });
  Swal.fire({
    title: 'Confirmar compra',
    html: resumen + `<hr><strong>Total: $${total.toFixed(2)}</strong>`,
    showCancelButton: true,
    confirmButtonText: 'Comprar',
    cancelButtonText: 'Seguir',
    width: 500
  }).then(r => {
    if (r.isConfirmed) {
      cart.carrito.length = 0;
      cart.guardarCarrito();
      cart.actualizarCarritoUI();
      Swal.fire('¡Gracias!','Compra realizada','success');
    }
  });
};
