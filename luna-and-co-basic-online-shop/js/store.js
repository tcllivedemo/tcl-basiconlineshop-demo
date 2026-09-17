/* ============================================================
   Luna & Co. — Demo Storefront Data + Cart Logic
   Powered by TCL Systems & Digitals PH
   ============================================================ */

const PESO = '\u20B1';
const money = n => PESO + Number(n).toLocaleString('en-PH', {minimumFractionDigits:0});

/* ---------- Product catalog (10 products) ---------- */
const PRODUCTS = [
  {
    slug:'mira-tote',
    name:'Mira Everyday Tote',
    price:1499,
    category:'Bags',
    featured:true,
    tag:'Best Seller',
    variations:{label:'Color', options:['Cream','Blush','Black']},
    blurb:'Softly structured tote in a supple vegan leather.',
    desc:'Our most-loved silhouette. The Mira Tote is cut from a soft, matte vegan leather with a relaxed-but-structured shape that holds its form without feeling stiff. Inside, a lined compartment keeps your essentials tidy, while the wide shoulder straps sit comfortably all day — at the market, in the office, or on the long commute home.',
    details:[['Material','Premium vegan leather'],['Dimensions','32 × 27 × 12 cm'],['Interior','Lined main compartment + slip pocket'],['Closure','Magnetic snap']],
    img:'bag-tote'
  },
  {
    slug:'mira-mini',
    name:'Mira Mini Crossbody',
    price:899,
    category:'Bags',
    featured:true,
    tag:'New',
    variations:{label:'Color', options:['Cream','Blush','Black']},
    blurb:'A compact crossbody for light, easy days.',
    desc:'A smaller take on the Mira family. Just enough room for a phone, card holder, keys, and a lip tint — with an adjustable strap you can wear cross-body or over the shoulder. Perfect for quick errands and weekend market runs.',
    details:[['Material','Premium vegan leather'],['Dimensions','20 × 15 × 8 cm'],['Strap','Adjustable, removable'],['Closure','Zip top']],
    img:'bag-cross'
  },
  {
    slug:'knot-hair-clips',
    name:'Set of 3 Knot Hair Clips',
    price:349,
    category:'Accessories',
    featured:true,
    tag:'',
    variations:{label:'Finish', options:['Matte Cream','Matte Blush','Tortoise']},
    blurb:'Soft-touch clips for a quick, tidy finish.',
    desc:'A trio of sculpted knot clips that hold a surprising amount of hair without tugging. The matte finish keeps them looking understated, so they work with both an office blazer and a weekend dress.',
    details:[['Set','3 clips'],['Material','Acetate'],['Length','9 cm each'],['Packaging','Gift-ready box']],
    img:'acc-clips'
  },
  {
    slug:'luna-pearl-hoops',
    name:'Luna Pearl Hoops',
    price:549,
    category:'Accessories',
    featured:true,
    tag:'',
    variations:{label:'Finish', options:['Gold','Silver']},
    blurb:'Lightweight hoops with a freshwater-style pearl.',
    desc:'Everyday hoops that read as quietly elegant. The pearl accent catches light without being loud, and the hollow construction keeps them light enough to forget you are wearing them.',
    details:[['Base','14k gold-plated brass / sterling silver'],['Diameter','2.4 cm'],['Accent','Simulated pearl'],['Care','Wipe with soft cloth']],
    img:'acc-hoops'
  },
  {
    slug:'silk-scrunchie-set',
    name:'Silk-Feel Scrunchie Set',
    price:299,
    category:'Accessories',
    featured:false,
    tag:'',
    variations:{label:'Color', options:['Champagne','Blush','Sage']},
    blurb:'Gentle on hair, generous in size.',
    desc:'Oversized scrunchies in a smooth satin-finish fabric that helps reduce pulling and creasing. Comes as a set of three so there is always one on the dresser.',
    details:[['Set','3 pieces'],['Fabric','Satin-finish polyester'],['Width','5 cm'],['Care','Hand wash cold']],
    img:'acc-scrunchie'
  },
  {
    slug:'amber-candle',
    name:'Amber & Vanilla Soy Candle',
    price:749,
    category:'Lifestyle',
    featured:true,
    tag:'',
    variations:{label:'Size', options:['4 oz','8 oz']},
    blurb:'Warm amber and soft vanilla in natural soy wax.',
    desc:'Hand-poured soy wax with a cotton wick and a warm, homey blend of amber, vanilla, and a whisper of tonka. Long-burning and low-smoke — a small, reliable luxury for the end of a long day.',
    details:[['Wax','100% soy'],['Burn time','Approx. 25 hrs (4 oz) / 45 hrs (8 oz)'],['Wick','Cotton, lead-free'],['Vessel','Amber glass jar with lid']],
    img:'life-candle'
  },
  {
    slug:'linen-coasters',
    name:'Handwoven Linen Coasters',
    price:429,
    category:'Lifestyle',
    featured:false,
    tag:'',
    variations:{label:'Set', options:['Set of 4','Set of 6']},
    blurb:'Textured coasters woven by local artisans.',
    desc:'A small-batch set woven from a linen-cotton blend, finished with a subtle stitched edge. Made with a family of weavers we have worked with for three years.',
    details:[['Material','Linen-cotton blend'],['Diameter','10 cm'],['Origin','Woven locally in the Philippines'],['Care','Spot clean']],
    img:'life-coaster'
  },
  {
    slug:'everyday-notebook',
    name:'Everyday Linen Notebook',
    price:389,
    category:'Lifestyle',
    featured:false,
    tag:'',
    variations:{label:'Cover', options:['Oat','Blush','Charcoal']},
    blurb:'A5 notebook with a textured linen cover.',
    desc:'160 dot-grid pages on warm cream paper that plays nicely with fountain pens and gel ink alike. The linen-wrapped cover softens beautifully with use — a nice home for lists, sketches, and half-formed plans.',
    details:[['Size','A5 (14.8 × 21 cm)'],['Pages','160 pages, dot grid, 100 gsm'],['Binding','Lay-flat thread-sewn'],['Extras','Ribbon marker, elastic closure']],
    img:'life-notebook'
  },
  {
    slug:'gift-duo-set',
    name:'Gift Duo: Candle + Notebook Set',
    price:1099,
    category:'Gifts',
    featured:false,
    tag:'Gift Pick',
    variations:{label:'Ribbon', options:['Blush Ribbon','Cream Ribbon','No Ribbon']},
    blurb:'A ready-to-give pairing, wrapped and tagged.',
    desc:'Our 8 oz Amber & Vanilla candle paired with the A5 Linen Notebook, boxed together with tissue and a blank kraft gift tag. A dependable choice when you need something thoughtful and already sorted.',
    details:[['Includes','8 oz candle + A5 notebook'],['Packaging','Gift box, tissue, blank tag'],['Gift message','Add a note at checkout'],['Best for','Birthdays, thank-yous, housewarming']],
    img:'gift-duo'
  },
  {
    slug:'gift-trio-box',
    name:'Gift Trio: Curated Pamper Box',
    price:1349,
    category:'Gifts',
    featured:false,
    tag:'',
    variations:{label:'Ribbon', options:['Blush Ribbon','Cream Ribbon','No Ribbon']},
    blurb:'Three of our favourites, boxed as one gift.',
    desc:'A curated trio: the Amber & Vanilla candle, a silk-feel scrunchie set, and a set of handwoven coasters — arranged in a kraft box with tissue and a gift tag. Ideal for a small thank-you that still feels considered.',
    details:[['Includes','8 oz candle, scrunchie set, coasters'],['Packaging','Kraft gift box, tissue, tag'],['Gift message','Add a note at checkout'],['Best for','Christmas, Mother\u2019s Day, housewarming']],
    img:'gift-trio'
  }
];

const CATEGORIES = [
  {name:'Bags', slug:'Bags', img:'cat-bags', count:'2 pieces'},
  {name:'Accessories', slug:'Accessories', img:'cat-acc', count:'3 pieces'},
  {name:'Lifestyle', slug:'Lifestyle', img:'cat-life', count:'3 pieces'},
  {name:'Gifts', slug:'Gifts', img:'cat-gift', count:'2 pieces'}
];

const bySlug = s => PRODUCTS.find(p => p.slug === s);

/* ============================================================
   Cart (localStorage)
   ============================================================ */
const CART_KEY = 'lunaco_cart_v1';
const ORDER_KEY = 'lunaco_last_order_v1';

function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  }catch(e){ return []; }
}
function saveCart(cart){
  try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){}
  renderBadge();
}
function cartCount(){
  return getCart().reduce((n,i) => n + i.qty, 0);
}
function cartTotal(){
  return getCart().reduce((n,i) => n + i.qty * i.price, 0);
}
function addToCart(slug, variation, qty){
  const p = bySlug(slug);
  if(!p) return;
  const cart = getCart();
  const key = slug + '::' + (variation || '');
  const found = cart.find(i => i.key === key);
  if(found){ found.qty += qty; }
  else{
    cart.push({key, slug, name:p.name, price:p.price, variation:variation||'', qty, img:p.img});
  }
  saveCart(cart);
}
function updateQty(key, qty){
  const cart = getCart();
  const it = cart.find(i => i.key === key);
  if(!it) return;
  if(qty <= 0){ removeItem(key); return; }
  it.qty = qty;
  saveCart(cart);
}
function removeItem(key){
  saveCart(getCart().filter(i => i.key !== key));
}

/* ---------- Badge ---------- */
function renderBadge(){
  const n = cartCount();
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = n;
    el.classList.toggle('hide', n === 0);
  });
}

/* ---------- Icons ---------- */
const ICONS = {
  cart:'<svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M6 6L5 3H2"/></svg>',
  menu:'<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M4 12.5l5.2 5.2L20 7"/></svg>',
  heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9.4A4 4 0 0 1 12 8a4 4 0 0 1 7 2.6c0 5-7 9.4-7 9.4z"/></svg>',
  leaf:'<svg viewBox="0 0 24 24"><path d="M4 20c0-8 6-14 16-15 1 10-5 16-13 16H4z"/><path d="M8 16c2-3 5-5 8-6"/></svg>',
  chat:'<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"/></svg>',
  truck:'<svg viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  gift:'<svg viewBox="0 0 24 24"><path d="M3 9h18v11H3zM3 9l1.5-4h15L21 9M12 5v15"/></svg>',
  pin:'<svg viewBox="0 0 24 24"><path d="M12 21s-6.5-6.2-6.5-10.5A6.5 6.5 0 0 1 18.5 10.5C18.5 14.8 12 21 12 21z"/><circle cx="12" cy="10.4" r="2.3"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.4 2"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
  phone:'<svg viewBox="0 0 24 24"><path d="M6 3h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L21 14.5V18a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3z"/></svg>',
  fb:'<svg viewBox="0 0 24 24"><path d="M14 9V7.2c0-.8.5-1.2 1.2-1.2H17V3h-2.6C11.9 3 11 4.6 11 6.7V9H9v3h2v9h3v-9h2.4l.6-3z"/></svg>',
  ig:'<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24"><path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 5.5A4.5 4.5 0 0 0 18.5 10"/></svg>',
  wa:'<svg viewBox="0 0 24 24"><path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.1-4.4A8.5 8.5 0 1 1 20.5 12z"/><path d="M9 9.5c.4 2.6 2.9 5.1 5.5 5.5l1-1.3-2-1-.9.7c-1-.4-1.8-1.2-2.2-2.2l.7-.9-1-2z"/></svg>'
};

/* ---------- Image helper ---------- */
const img = (name, ext) => 'images/' + name + (ext || '.svg');

function productImg(name){ return 'images/products/' + name + '.svg'; }
function catImg(name){ return 'images/categories/' + name + '.svg'; }

/* ---------- Nav ---------- */
function navHTML(active){
  const link = (href, label) =>
    '<a href="' + href + '"' + (active === label ? ' class="active"' : '') + '>' + label + '</a>';
  return {
    links: link('index.html','Home') + link('shop.html','Shop') + link('about.html','About') + link('contact.html','Contact'),
    drawer: link('index.html','Home') + link('shop.html','Shop') + link('about.html','About') + link('contact.html','Contact')
  };
}

function mountHeader(){
  const host = document.getElementById('site-header');
  if(!host) return;
  const active = document.body.dataset.page || 'Home';
  const n = navHTML(active);
  host.innerHTML =
  '<div class="announce">Free meet-up delivery within Metro Manila on orders over ' + money(1500) + ' &nbsp;&middot;&nbsp; <span>Order via GCash, QR Ph &amp; bank transfer</span></div>' +
  '<header class="site">' +
    '<div class="wrap">' +
      '<div class="nav">' +
        '<a class="logo" href="index.html"><b>Luna &amp; Co.</b><i>Manila</i></a>' +
        '<nav class="nav-links">' + n.links + '</nav>' +
        '<div class="nav-right">' +
          '<a class="icon-btn" href="cart.html" aria-label="Shopping cart">' + ICONS.cart +
            '<span class="badge hide" data-cart-count>0</span></a>' +
          '<button class="icon-btn hamburger" id="openDrawer" aria-label="Open menu">' + ICONS.menu + '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</header>' +
  '<div class="drawer" id="drawer">' +
    '<div class="drawer-top">' +
      '<a class="logo" href="index.html"><b>Luna &amp; Co.</b><i>Manila</i></a>' +
      '<button class="icon-btn" id="closeDrawer" aria-label="Close menu">' + ICONS.close + '</button>' +
    '</div>' +
    '<nav>' + n.drawer + '</nav>' +
    '<div class="drawer-foot">' +
      'Questions? Message us on Viber or Facebook — we usually reply the same day.' +
    '</div>' +
  '</div>';

  const d = document.getElementById('drawer');
  document.getElementById('openDrawer').onclick = () => { d.classList.add('open'); document.body.style.overflow='hidden'; };
  document.getElementById('closeDrawer').onclick = () => { d.classList.remove('open'); document.body.style.overflow=''; };
  d.querySelectorAll('nav a').forEach(a => a.onclick = () => { d.classList.remove('open'); document.body.style.overflow=''; });
}

function mountFooter(){
  const host = document.getElementById('site-footer');
  if(!host) return;
  host.innerHTML =
  '<footer class="site">' +
    '<div class="wrap">' +
      '<div class="foot-grid">' +
        '<div class="foot-brand">' +
          '<b>Luna &amp; Co.</b><i>Manila</i>' +
          '<p>Thoughtfully chosen bags, accessories, and small home pieces — curated in Manila, made for everyday.</p>' +
          '<div class="foot-socials">' +
            '<a href="#" aria-label="Facebook">' + ICONS.fb + '</a>' +
            '<a href="#" aria-label="Instagram">' + ICONS.ig + '</a>' +
            '<a href="#" aria-label="TikTok">' + ICONS.tiktok + '</a>' +
            '<a href="#" aria-label="Viber">' + ICONS.wa + '</a>' +
          '</div>' +
        '</div>' +
        '<div><h4>Shop</h4><ul>' +
          '<li><a href="shop.html">All Products</a></li>' +
          '<li><a href="shop.html#Bags">Bags</a></li>' +
          '<li><a href="shop.html#Accessories">Accessories</a></li>' +
          '<li><a href="shop.html#Lifestyle">Lifestyle</a></li>' +
          '<li><a href="shop.html#Gifts">Gifts</a></li>' +
        '</ul></div>' +
        '<div><h4>Company</h4><ul>' +
          '<li><a href="about.html">About Us</a></li>' +
          '<li><a href="contact.html">Contact</a></li>' +
          '<li><a href="cart.html">Your Cart</a></li>' +
          '<li><a href="privacy.html">Privacy Policy</a></li>' +
          '<li><a href="terms.html">Terms of Service</a></li>' +
        '</ul></div>' +
        '<div><h4>Get in Touch</h4><ul>' +
          '<li>hello@lunaandco-demo.ph</li>' +
          '<li>+63 917 555 0142</li>' +
          '<li>Mon&ndash;Sat, 9:00am&ndash;6:00pm</li>' +
          '<li>Quezon City, Metro Manila</li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="foot-bottom">' +
        '<span>&copy; ' + new Date().getFullYear() + ' Luna &amp; Co. &middot; Demo storefront. All products and details are fictional.</span>' +
        '<span class="powered">Powered by <b>TCL Systems &amp; Digitals PH</b></span>' +
      '</div>' +
    '</div>' +
  '</footer>';
}

/* ---------- Toast ---------- */
function toast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = ICONS.check + '<span>' + msg + '</span>';
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ---------- Product card ---------- */
function productCard(p){
  return '<article class="card rv">' +
    '<a class="card-img" href="product.html?p=' + p.slug + '" aria-label="' + p.name + '">' +
      (p.tag ? '<span class="card-tag">' + p.tag + '</span>' : '') +
      '<img src="' + productImg(p.img) + '" alt="' + p.name + '" loading="lazy">' +
    '</a>' +
    '<div class="card-body">' +
      '<span class="card-cat">' + p.category + '</span>' +
      '<h3>' + p.name + '</h3>' +
      '<span class="card-price">' + money(p.price) + '</span>' +
      '<a class="btn btn-ghost btn-sm" href="product.html?p=' + p.slug + '">View Product</a>' +
    '</div>' +
  '</article>';
}

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const els = document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if(en.isIntersecting){
        setTimeout(() => en.target.classList.add('in'), (i % 4) * 70);
        io.unobserve(en.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  els.forEach(e => io.observe(e));
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  mountHeader();
  mountFooter();
  renderBadge();
  initReveal();
});
