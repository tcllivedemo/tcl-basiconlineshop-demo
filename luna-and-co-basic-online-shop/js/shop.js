/* ============================================================
   Shop page — simple client-side category filtering (no backend)
   ============================================================ */
document.body.dataset.page = 'Shop';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('shop-grid');
  const bar  = document.getElementById('filter-bar');
  const count = document.getElementById('shop-count');

  const cats = ['All'].concat([...new Set(PRODUCTS.map(p => p.category))]);

  function paint(active){
    const list = active === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === active);
    grid.innerHTML = list.map(productCard).join('');
    count.textContent = list.length + (list.length === 1 ? ' product' : ' products');
    [...bar.children].forEach(c => c.classList.toggle('active', c.dataset.cat === active));
    initReveal();
  }

  bar.innerHTML = cats.map(c =>
    '<button class="chip' + (c === 'All' ? ' active' : '') + '" data-cat="' + c + '">' + c + '</button>'
  ).join('');

  bar.addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if(!b) return;
    paint(b.dataset.cat);
    if(b.dataset.cat !== 'All') history.replaceState(null,'','#'+b.dataset.cat);
  });

  const hash = decodeURIComponent(location.hash.replace('#',''));
  paint(cats.includes(hash) ? hash : 'All');
});
