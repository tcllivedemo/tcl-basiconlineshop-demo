LUNA & CO. — BASIC ONLINE SHOP DEMO
Powered by TCL Systems & Digitals PH
============================================================

WHAT THIS IS
------------------------------------------------------------
A live-style DEMO storefront showing what a client can receive
under the "Basic Online Shop" package (PHP 5,999).

The business "Luna & Co." is entirely fictional. All products,
prices, contact details, addresses, and payment information are
placeholders for demonstration only. No real brands or
copyrighted assets are used.

Running it: it is a plain static site. Open index.html in a browser,
or upload the folder to any static host (Vercel, Netlify, GitHub
Pages, or standard shared hosting). No build step, no server,
no database required.


WHAT IS INCLUDED IN THE PACKAGE
------------------------------------------------------------
- Multi-page business/shop website (10 pages)
- Up to 10 initial products
- Shop / catalog page with category filtering
- Individual product pages
- Product images, names, descriptions, prices
- Product variations where applicable (colour, size, set, finish)
- Quantity selection
- Shopping cart (saved in the shopper's browser)
- Basic checkout / order submission
- Manual payment instructions (GCash, QR Ph, bank transfer)
- About page
- Contact page with simple enquiry form
- Mobile-responsive design
- Free vercel.app subdomain option
- 2 months maintenance after completed turnover


NOT INCLUDED (requires a Custom Business Website/System quote)
------------------------------------------------------------
- Admin dashboard or product editor
- Customer accounts / login / signup
- Automated payment gateway
- Automated payment verification
- Automated inventory management
- Membership, points, or rewards
- Advanced order management
- Automated shipping integrations
- Complex custom business workflows
- Analytics, staff management, subscriptions

There is no fake admin area anywhere in this demo, on purpose.


HOW ORDERS WORK (by design)
------------------------------------------------------------
1. Shopper adds items to the cart and places an order.
2. The order form collects name, email, mobile, address,
   city, province, postal code, and optional delivery notes.
3. Shopper chooses a manual payment method.
4. They submit the order and receive an order reference.
5. The business personally verifies the order and payment,
   then arranges delivery.

Payment is NEVER automatically verified. Payment details shown
in the demo are placeholders; a real store displays the
business's own GCash number, QR Ph details, and bank account.

NOTE ON ORDER SUBMISSION
The demo validates and confirms orders in the browser and shows
the confirmation screen. Because this package has no backend,
connecting the form to a live destination (email notification,
Google Sheet, or similar) is confirmed with TCL during setup.


HOW TO CUSTOMISE
------------------------------------------------------------
Products, categories, and prices live in one place:

  js/store.js  ->  const PRODUCTS = [ ... ]
  js/store.js  ->  const CATEGORIES = [ ... ]

Each product supports:
  slug, name, price, category, featured, tag,
  variations { label, options[] }, blurb, desc,
  details [[label, value], ...], img

Product images live in  images/products/
Category images live in images/categories/

Pages:
  index.html         Home
  shop.html          Catalog + filtering
  product.html       Product detail (?p=slug)
  cart.html          Shopping cart
  checkout.html      Order form + payment
  confirmation.html  Order confirmation
  about.html         About
  contact.html       Contact
  privacy.html       Privacy Policy
  terms.html         Terms of Service

Note: because the Basic package has no admin dashboard, the client
cannot independently manage products through an admin interface.
Content is set up initially by TCL. Later content changes may be
charged separately.


MAINTENANCE
------------------------------------------------------------
The package includes 2 months of maintenance after completed
delivery/turnover.

Covered:
- Bugs or errors involving delivered features within the agreed scope
- Reasonable technical assistance related to the delivered website

Not covered:
- Unlimited content edits
- Unlimited product additions
- Redesigns, new pages, new functionality, or new integrations

Those may require a separate fee or quotation. The website itself
does not expire when the maintenance period ends.


ATTRIBUTION
------------------------------------------------------------
Footer credit: "Powered by TCL Systems & Digitals PH"

============================================================
Demo storefront. All products, prices, and business details are
fictional and for presentation purposes only.
