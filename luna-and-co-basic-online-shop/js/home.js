/* ============================================================
   Home page
   ============================================================ */
document.body.dataset.page = 'Home';

document.addEventListener('DOMContentLoaded', () => {
  const feat = PRODUCTS.filter(p => p.featured).slice(0,4);
  document.getElementById('featured-grid').innerHTML = feat.map(productCard).join('');

  document.getElementById('cat-grid').innerHTML = CATEGORIES.map(c =>
    '<a class="cat rv" href="shop.html#' + c.slug + '">' +
      '<img src="' + catImg(c.img) + '" alt="' + c.name + '" loading="lazy">' +
      '<div class="ov"><span>' + c.count + '</span><h3>' + c.name + '</h3></div>' +
    '</a>'
  ).join('');

  initReveal();
});
