import { mostrarDetalle } from './modal.js';

export function renderizarProductos(contenedor, lista) {
  contenedor.innerHTML = '';
  lista.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100">
        <img
          src="${p.image}"
          class="card-img-top"
          alt="${p.title}"
          style="height:250px;object-fit:contain;"
        />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.title}</h5>
          <span class="badge category-badge mb-2">${p.category}</span>
          <p class="card-text text-success mt-auto">
            $${p.price.toFixed(2)}
          </p>
          <button class="btn btn-primary mt-2 view-btn">
            <i class="bi bi-eye"></i> Ver más
          </button>
        </div>
      </div>`;
    col.querySelector('.view-btn').onclick = () => mostrarDetalle(p);
    contenedor.appendChild(col);
    requestAnimationFrame(() =>
      col.querySelector('.card').classList.add('show')
    );
  });
}
