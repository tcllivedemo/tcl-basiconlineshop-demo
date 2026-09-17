/* ============================================================
   Product detail page
   ============================================================ */
document.body.dataset.page = 'Shop';

/* ---------- Size guide ---------- */
function renderGuide(s){
  const el = document.getElementById('size-guide');
  if(!el) return;
  el.innerHTML =
    '<details class="size-guide">' +
      '<summary>' + s.title + '<span class="faq-ic" aria-hidden="true"></span></summary>' +
      '<div class="size-body">' +
        '<p>' + s.intro + '</p>' +
        '<table class="size-table"><thead><tr>' +
          s.head.map(h => '<th>' + h + '</th>').join('') +
        '</tr></thead><tbody>' +
          s.rows.map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') +
        '</tbody></table>' +
        '<p class="size-tip"><strong>Tip:</strong> ' + s.tip + '</p>' +
      '</div>' +
    '</details>';
}

document.addEventListener('DOMContentLoaded', () => {
  const slug = new URLSearchParams(location.search).get('p') || PRODUCTS[0].slug;
  const p = bySlug(slug) || PRODUCTS[0];
  document.title = p.name + ' \u2014 Luna & Co.';

  let variant = p.variations ? p.variations.options[0] : '';

  const host = document.getElementById('pd');
  host.innerHTML =
    '<div class="crumbs"><a href="index.html">Home</a> &nbsp;/&nbsp; <a href="shop.html">Shop</a> &nbsp;/&nbsp; <a href="shop.html#' + p.category + '">' + p.category + '</a></div>' +
    '<div class="pd">' +
      '<div class="pd-gallery">' +
        '<div class="pd-main"><img id="pd-img" src="' + productImg(p.img) + '" alt="' + p.name + '"></div>' +
        '<div class="pd-thumbs">' +
          ['a','b','c'].map((v,i) =>
            '<button class="' + (i===0?'active':'') + '" data-thumb="' + v + '"><img src="' + productImg(p.img) + '" alt="' + p.name + ' view ' + (i+1) + '"></button>'
          ).join('') +
        '</div>' +
      '</div>' +
      '<div class="pd-info">' +
        '<span class="eyebrow">' + p.category + '</span>' +
        '<h1>' + p.name + '</h1>' +
        '<div class="pd-price">' + money(p.price) + '</div>' +
        '<p class="pd-desc">' + p.desc + '</p>' +
        '<div id="size-guide"></div>' +

        (p.variations ?
          '<span class="opt-label">' + p.variations.label + '</span>' +
          '<div class="swatches" id="swatches">' +
            p.variations.options.map((o,i) =>
              '<button class="swatch' + (i===0?' active':'') + '" data-opt="' + o + '">' + o + '</button>').join('') +
          '</div>' : '') +

        '<div class="qty-row">' +
          '<div class="qty">' +
            '<button type="button" id="minus" aria-label="Decrease quantity">&minus;</button>' +
            '<input type="number" id="qty" value="1" min="1" max="99" aria-label="Quantity">' +
            '<button type="button" id="plus" aria-label="Increase quantity">+</button>' +
          '</div>' +
          '<button class="btn btn-primary" id="add">Add to Cart</button>' +
        '</div>' +

        '<div class="trust-mini">' +
          '<strong>How ordering works</strong>' +
          'Add this to your cart and place an order through our checkout. We confirm every order personally and send payment details for GCash, QR Ph, or bank transfer. No account needed.' +
        '</div>' +

        '<div class="pd-meta"><dl>' +
          p.details.map(d => '<dt>' + d[0] + '</dt><dd>' + d[1] + '</dd>').join('') +
          '<dt>Availability</dt><dd>In stock &middot; shipped within 2&ndash;4 days</dd>' +
        '</dl></div>' +
      '</div>' +
    '</div>' +

    '<section><div class="sec-head"><h2>You may also like</h2></div>' +
      '<div class="grid-products" id="related"></div></section>';

  /* related */
  const related = PRODUCTS.filter(x => x.slug !== p.slug && x.category === p.category)
    .concat(PRODUCTS.filter(x => x.slug !== p.slug && x.category !== p.category))
    .slice(0,4);
  document.getElementById('related').innerHTML = related.map(productCard).join('');

  /* gallery */
  const mainImg = document.getElementById('pd-img');
  host.querySelectorAll('[data-thumb]').forEach(b => {
    b.onclick = () => {
      host.querySelectorAll('[data-thumb]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      mainImg.style.opacity = '0';
      setTimeout(() => { mainImg.src = productImg(p.img); mainImg.style.opacity = '1'; }, 140);
    };
  });

  /* variation */
  const sw = document.getElementById('swatches');
  if(sw){
    sw.addEventListener('click', e => {
      const b = e.target.closest('.swatch');
      if(!b) return;
      sw.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      variant = b.dataset.opt;
    });
  }

  /* qty */
  const qty = document.getElementById('qty');
  document.getElementById('minus').onclick = () => qty.value = Math.max(1, parseInt(qty.value||1) - 1);
  document.getElementById('plus').onclick  = () => qty.value = Math.min(99, parseInt(qty.value||1) + 1);

  /* add */
  document.getElementById('add').onclick = () => {
    const q = Math.max(1, parseInt(qty.value||1));
    addToCart(p.slug, variant, q);
    toast(p.name + (variant ? ' (' + variant + ')' : '') + ' added to cart');
  };

  /* size guide */
  const guide = document.getElementById('size-guide');
  if(guide){
    if(!p.sizing){
      guide.remove();
    }else{
      renderGuide(p.sizing);
    }
  }

  initReveal();
});
