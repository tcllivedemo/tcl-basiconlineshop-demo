/* ============================================================
   Cart page
   ============================================================ */
document.body.dataset.page = 'Shop';

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('cart-list');
  const summary = document.getElementById('cart-summary');

  function paint(){
    const cart = getCart();

    if(!cart.length){
      list.innerHTML =
        '<div class="empty">' +
          '<svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M6 6L5 3H2"/></svg>' +
          '<h3>Your cart is empty</h3>' +
          '<p>Browse the collection and add a piece or two.</p>' +
          '<a class="btn btn-primary" href="shop.html">Shop Collection</a>' +
        '</div>';
      summary.innerHTML = '';
      return;
    }

    list.innerHTML = cart.map(i =>
      '<div class="cart-item">' +
        '<div class="ci-img"><img src="' + productImg(i.img) + '" alt="' + i.name + '"></div>' +
        '<div class="ci-body">' +
          '<h4>' + i.name + '</h4>' +
          (i.variation ? '<div class="ci-var">' + i.variation + '</div>' : '') +
          '<div class="ci-price">' + money(i.price) + ' each</div>' +
        '</div>' +
        '<div class="ci-actions">' +
          '<div class="qty">' +
            '<button type="button" data-dec="' + i.key + '" aria-label="Decrease">&minus;</button>' +
            '<input type="number" value="' + i.qty + '" min="1" max="99" data-qty="' + i.key + '" aria-label="Quantity">' +
            '<button type="button" data-inc="' + i.key + '" aria-label="Increase">+</button>' +
          '</div>' +
          '<button class="link-remove" data-rm="' + i.key + '">Remove</button>' +
        '</div>' +
      '</div>'
    ).join('');

    const sub = cartTotal();
    const ship = 0;
    summary.innerHTML =
      '<h3>Order Summary</h3>' +
      '<div class="sum-rows">' +
        '<div class="sum-row"><span>Subtotal</span><span>' + money(sub) + '</span></div>' +
        '<div class="sum-row"><span>Shipping</span><span>Calculated after order</span></div>' +
        '<div class="sum-row total"><span>Total</span><span>' + money(sub) + '</span></div>' +
      '</div>' +
      '<a class="btn btn-primary btn-block" href="checkout.html">Proceed to Checkout</a>' +
      '<a class="btn btn-ghost btn-block" style="margin-top:.7rem" href="shop.html">Continue Shopping</a>' +
      '<p class="note">Shipping is arranged with you after we confirm your order. No online payment is taken on this site.</p>';
  }

  list.addEventListener('click', e => {
    const dec = e.target.closest('[data-dec]');
    const inc = e.target.closest('[data-inc]');
    const rm  = e.target.closest('[data-rm]');
    const cart = getCart();
    if(dec){ const it = cart.find(x => x.key === dec.dataset.dec); updateQty(dec.dataset.dec, it.qty - 1); paint(); }
    if(inc){ const it = cart.find(x => x.key === inc.dataset.inc); updateQty(inc.dataset.inc, it.qty + 1); paint(); }
    if(rm){ removeItem(rm.dataset.rm); paint(); toast('Item removed'); }
  });

  list.addEventListener('change', e => {
    const q = e.target.closest('[data-qty]');
    if(!q) return;
    updateQty(q.dataset.qty, Math.max(1, Math.min(99, parseInt(q.value||1))));
    paint();
  });

  paint();
});
