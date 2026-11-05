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
