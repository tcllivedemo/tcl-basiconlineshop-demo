/* ============================================================
   Confirmation page
   ============================================================ */
document.body.dataset.page = 'Shop';

document.addEventListener('DOMContentLoaded', () => {
  let order = null;
  try{ order = JSON.parse(localStorage.getItem(ORDER_KEY) || 'null'); }catch(e){}
  const host = document.getElementById('confirm-host');

  if(!order){
    host.innerHTML =
      '<div class="confirm">' +
        '<h1>No recent order found</h1>' +
        '<p class="lede" style="margin:1rem auto 2rem">We could not find an order reference on this device. If you just placed an order, please message us and we will look it up for you.</p>' +
        '<a class="btn btn-primary" href="shop.html">Back to Shop</a>' +
      '</div>';
    return;
  }

  const info = PAY_INFO[order.pay] || PAY_INFO.GCash;
  const d = order.delivery;

  host.innerHTML =
    '<div class="confirm">' +
      '<div class="tick"><svg viewBox="0 0 24 24"><path d="M4 12.5l5.2 5.2L20 7"/></svg></div>' +
      '<span class="eyebrow">Order received</span>' +
      '<h1>Thank you, ' + esc(order.customer.fullname.split(' ')[0]) + '!</h1>' +
      '<p class="lede" style="margin:1rem auto 0">We have received your order and will confirm it personally by email or mobile. Nothing has been charged automatically \u2014 payment is completed manually.</p>' +
      '<div class="ref-box"><span>Your order reference</span><b>' + order.ref + '</b></div>' +
      '<p class="lede" style="margin:0 auto 2rem;font-size:.9rem">Please include this reference when you send payment or message us.</p>' +
    '</div>' +

    '<div class="conf-card">' +
      '<h3>What happens next</h3>' +
      '<ol class="steps-list">' +
        '<li><b>We review your order</b>Our team checks your items, options, and delivery details.</li>' +
        '<li><b>You receive payment instructions</b>We send the final amount and ' + order.pay + ' details to ' + esc(order.customer.email) + ' and ' + esc(order.customer.mobile) + '.</li>' +
        '<li><b>You send payment manually</b>Payment is made through ' + order.pay + '. Keep your reference number: <strong>' + order.ref + '</strong>.</li>' +
        '<li><b>We verify and ship</b>Once payment is confirmed by our team, we prepare and send your order.</li>' +
      '</ol>' +
    '</div>' +

    '<div class="conf-card">' +
      '<span class="demo-flag">Demo details</span>' +
      '<h3>' + info.title + '</h3>' +
      '<dl style="display:grid;grid-template-columns:auto 1fr;gap:.5rem 1.4rem;font-size:.9rem">' +
        info.rows.map(r => '<dt style="color:var(--ink-soft)">' + r[0] + '</dt><dd style="font-weight:600">' + r[1] + '</dd>').join('') +
      '</dl>' +
      '<p class="note" style="text-align:left;margin-top:1rem">' + info.note + '</p>' +
    '</div>' +

    '<div class="conf-card">' +
      '<h3>Order Summary</h3>' +
      order.items.map(i =>
        '<div class="co-item">' +
          '<div class="th"><img src="' + productImg(i.img) + '" alt="' + i.name + '"></div>' +
          '<div class="nm"><b>' + i.name + '</b><span>' + (i.variation ? i.variation + ' &middot; ' : '') + 'Qty ' + i.qty + '</span></div>' +
          '<div>' + money(i.price * i.qty) + '</div>' +
        '</div>'
      ).join('') +
      '<div class="sum-rows" style="margin-top:1rem">' +
        '<div class="sum-row"><span>Subtotal</span><span>' + money(order.total) + '</span></div>' +
        '<div class="sum-row"><span>Shipping</span><span>Arranged after confirmation</span></div>' +
        '<div class="sum-row total"><span>Total</span><span>' + money(order.total) + '</span></div>' +
      '</div>' +
    '</div>' +

    '<div class="conf-card">' +
      '<h3>Delivering to</h3>' +
      '<p style="font-size:.92rem;line-height:1.8">' + esc(order.customer.fullname) + '<br>' +
        esc(d.address) + '<br>' + esc(d.city) + ', ' + esc(d.province) + ' ' + esc(d.postal) + '<br>' +
        esc(order.customer.mobile) + '<br>' + esc(order.customer.email) + '</p>' +
      (d.notes ? '<p class="note" style="text-align:left;margin-top:.9rem"><strong>Delivery notes:</strong> ' + esc(d.notes) + '</p>' : '') +
    '</div>' +

    '<div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap;margin-top:2rem">' +
      '<a class="btn btn-ghost" href="shop.html">Continue Shopping</a>' +
      '<a class="btn btn-primary" href="contact.html">Message Us</a>' +
    '</div>' +

    '<p class="note" style="margin-top:2.2rem">This is a demonstration storefront. No real payment was taken and no order will be fulfilled.</p>';

  try{ localStorage.removeItem(ORDER_KEY); }catch(e){}
});
