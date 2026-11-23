# MaalGadi

A responsive shopping storefront frontend built with React. Browse products by category, add items to a cart, adjust quantities, and view the order total.

## Features

- Home page with products grouped by category
- Shop page with category filtering
- Shopping cart with quantity controls, item removal, and a running total
- Responsive layout for desktop and mobile screens
- Loading and error states while products are fetched

## Built with

- React
- Vite
- React Router
- CSS
- [DummyJSON Products API](https://dummyjson.com/docs/products)

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

To create a production build:

```bash
npm run build
```

Product data is provided by DummyJSON. The cart is managed in the browser and is not connected to checkout or payment processing.
