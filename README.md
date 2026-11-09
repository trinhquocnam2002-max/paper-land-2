# Paper Land

Website for Paper Land, a design-led stationery brand: notebooks, planners and pocket notes. Designed in Adelaide, inspired by Saigon.

## Pages

| File | Page |
|---|---|
| `index.html` | Game entrance: pixel-art "Enter Paper Land" (first page visitors see) |
| `home.html` | Regular home page |
| `shop.html` | Shop all products, with filters and sorting |
| `product.html#<id>` | Product detail, e.g. `product.html#arvo` |
| `collections.html` | Saigon Mornings, Adelaide Arvo, Someday Studio |
| `about.html` | Our story |
| `journal.html` / `article.html#<id>` | Journal list and articles |
| `help.html` | FAQ, shipping, contact, stockists |

Shared files: `style.css` holds all styling. `app.js` holds the header, footer, cart and all product and journal data.

## Editing products

Products, prices and descriptions are in the `PRODUCTS` object at the top of `app.js`. Journal posts are in the `JOURNAL` object.

## Notes

This is a static site with no server. The cart is saved in the visitor's browser. The checkout, contact form and newsletter forms only show confirmation messages and do not send data.

## Shopify theme

`shopify-theme/` is the same site as a Shopify theme (Liquid). Products, prices,
stock and the cart come live from Shopify; the game is the home page (`/`).
`shopify-theme.zip` is the uploadable package (Online Store → Themes → Add theme → Upload zip).

| Shopify URL | Page |
|---|---|
| `/` | Enter Paper Land game |
| `/pages/home` | Regular home page |
| `/collections/all`, `/collections/<handle>` | Shop with filters |
| `/products/<handle>` | Product page |
| `/collections` | Collections overview |
| `/pages/about`, `/pages/journal`, `/pages/article#<post>`, `/pages/help` | Content pages |
