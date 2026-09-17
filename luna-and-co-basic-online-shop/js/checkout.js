/* ============================================================
   Checkout page — manual payment order submission
   ============================================================ */
document.body.dataset.page = 'Shop';

const PAY_INFO = {
  GCash: {
    title: 'GCash (Manual Transfer)',
    rows: [['Account name','Luna & Co. (Demo)'],['GCash number','0917 555 0142'],['Reference to use','Your order number (shown above)']],
    note: 'After sending, message us a screenshot on Viber or Facebook so we can match your payment.'
  },
  QRPh: {
    title: 'QR Ph (Scan to Pay)',
    rows: [['Merchant name','Luna & Co. (Demo)'],['Merchant ID','DEMO-QRPH-000142'],['Payable via','GCash, Maya, InstaPay, any QR Ph app']],
    note: 'A live QR image is generated from the business\u2019s own QR Ph account. This demo shows placeholder details only.'
  },
  'Bank Transfer': {
    title: 'Bank Transfer (InstaPay / PESONet)',
    rows: [['Account name','Luna & Co. (Demo)'],['Bank','Demo Rural Bank \u2014 Quezon City'],['Account number','1234 5678 9012'],['Reference to use','Your order number']],
    note: 'Send us the deposit slip or screenshot so we can verify your order manually.'
  }
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

document.addEventListener('DOMContentLoaded', () => {
  const cart = getCart();

  /* Empty cart guard */
  if(!cart.length){
    document.getElementById('co-main').innerHTML =
      '<div class="panel empty">' +
        '<svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M6 6L5 3H2"/></svg>' +
        '<h3>There is nothing to check out</h3>' +
        '<p>Add a product to your cart first, then come back here.</p>' +
        '<a class="btn btn-primary" href="shop.html">Shop Collection</a>' +
      '</div>';
    document.getElementById('co-side').innerHTML = '';
    return;
  }

  /* Order summary */
  const total = cartTotal();
  document.getElementById('co-items').innerHTML = cart.map(i =>
    '<div class="co-item">' +
      '<div class="th"><img src="' + productImg(i.img) + '" alt="' + i.name + '"></div>' +
      '<div class="nm"><b>' + i.name + '</b><span>' + (i.variation ? i.variation + ' &middot; ' : '') + 'Qty ' + i.qty + '</span></div>' +
      '<div>' + money(i.price * i.qty) + '</div>' +
    '</div>'
  ).join('');

  document.getElementById('co-totals').innerHTML =
    '<div class="sum-rows">' +
      '<div class="sum-row"><span>Subtotal</span><span>' + money(total) + '</span></div>' +
      '<div class="sum-row"><span>Shipping</span><span>Arranged after confirmation</span></div>' +
      '<div class="sum-row total"><span>Total</span><span>' + money(total) + '</span></div>' +
    '</div>';

  /* Payment options */
  const payWrap = document.getElementById('pay-options');
  payWrap.innerHTML = Object.keys(PAY_INFO).map((k,i) =>
    '<label class="pay-opt' + (i===0?' sel':'') + '">' +
      '<input type="radio" name="pay" value="' + k + '"' + (i===0?' checked':'') + '>' +
      '<div><b>' + k + '</b><small>' + PAY_INFO[k].rows[1][1] + '</small></div>' +
    '</label>' +
    '<div class="pay-inst" data-inst="' + k + '"' + (i===0?' class="pay-inst show"':'') + '>' +
      '<span class="demo-flag">Demo details</span>' +
      '<h4>' + PAY_INFO[k].title + '</h4>' +
      '<dl>' + PAY_INFO[k].rows.map(r => '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>').join('') + '</dl>' +
      '<p style="margin-top:.7rem">' + PAY_INFO[k].note + '</p>' +
    '</div>'
  ).join('');

  function showInst(k){
    document.querySelectorAll('.pay-inst').forEach(el => el.classList.toggle('show', el.dataset.inst === k));
    document.querySelectorAll('.pay-opt').forEach(el => el.classList.toggle('sel', el.querySelector('input').value === k));
  }
  payWrap.addEventListener('change', e => { if(e.target.name === 'pay') showInst(e.target.value); });
  showInst('GCash');

  /* ---- Validation + submit ---- */
  const form = document.getElementById('co-form');
  const REQUIRED = [
    ['fullname','Full name'], ['email','Email address'], ['mobile','Mobile number'],
    ['address','Complete address'], ['city','City / Municipality'], ['province','Province'], ['postal','Postal code']
  ];

  function markField(id, ok){
    const el = document.getElementById(id);
    const field = el.closest('.f-field');
    field.classList.toggle('invalid', !ok);
    return ok;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;

    REQUIRED.forEach(([id]) => {
      const el = document.getElementById(id);
      ok = markField(id, el.value.trim().length > 1) && ok;
    });

    const email = document.getElementById('email');
    ok = markField('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) && ok;

    const mobile = document.getElementById('mobile');
    ok = markField('mobile', /^[0-9+\-\s()]{7,}$/.test(mobile.value.trim())) && ok;

    const postal = document.getElementById('postal');
    ok = markField('postal', /^[0-9]{4}$/.test(postal.value.trim())) && ok;

    if(!ok){
      const first = form.querySelector('.f-field.invalid');
      if(first) first.scrollIntoView({behavior:'smooth', block:'center'});
      toast('Please complete the highlighted fields');
      return;
    }

    const pay = (form.querySelector('input[name="pay"]:checked') || {}).value || 'GCash';
    const order = {
      ref: 'LUNA-' + Date.now().toString().slice(-6),
      placed: new Date().toISOString(),
      pay,
      customer: {
        fullname: document.getElementById('fullname').value.trim(),
        email: document.getElementById('email').value.trim(),
        mobile: document.getElementById('mobile').value.trim()
      },
      delivery: {
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        province: document.getElementById('province').value.trim(),
        postal: document.getElementById('postal').value.trim(),
        notes: document.getElementById('notes').value.trim()
      },
      items: getCart(),
      total: cartTotal()
    };

    try{ localStorage.setItem(ORDER_KEY, JSON.stringify(order)); }catch(err){}
    try{ localStorage.removeItem(CART_KEY); }catch(err){}
    location.href = 'confirmation.html';
  });
});
