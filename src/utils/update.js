export function cargarCategorias(lista, select) {
  const cats = [...new Set(lista.map(p => p.category))];
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c.charAt(0).toUpperCase() + c.slice(1);
    select.appendChild(opt);
  });
}

export function filtrarYRenderizar(data, searchInput, filtroCategoria, renderFn) {
  const text = searchInput.value.trim().toLowerCase();
  const cat = filtroCategoria.value;
  const filtrados = data.filter(
    p =>
      p.title.toLowerCase().includes(text) &&
      (!cat || p.category === cat)
  );
  renderFn(filtrados);
}
