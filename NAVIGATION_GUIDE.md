# ShopHub Navigation Guide

## Current Routes

### Main Pages
- **/** - Home page (shows all products)
- **/products** - Products listing page (shows all products)
- **/product/:id** - Individual product detail page
- **/cart** - Shopping cart
- **/checkout** - Checkout page
- **/login** - Login page
- **/register** - Registration page
- **/order-success** - Order confirmation page

## How Navigation Works

### Header Navigation

**"Home" Link** → Takes you to `/` (home page with product listing)

**"Products" Link** → Takes you to `/products` (also shows product listing)

**Cart Icon** → Takes you to `/cart` (shopping cart page)

**Login/Sign Up** → Takes you to `/login` or `/register`

### Product Navigation

**Clicking on a Product Card** → Takes you to `/product/:id` (individual product page)
- Example: Clicking "Wireless Headphones" → `/product/1`
- Shows full product details, images, description
- Quantity selector
- Add to cart button
- Product features

**Breadcrumb Navigation** (on product page)
- Home → Products → Current Product Name
- Click any breadcrumb to navigate back

### How It Works

1. **From Header**: Click "Products" → Goes to product listing
2. **Click Any Product**: Opens detailed product page
3. **View Details**: See full description, price, stock
4. **Add to Cart**: Select quantity and add to cart
5. **Checkout**: Go to cart → Checkout → Complete order

## Product Page Features

✅ **Product Image** - Large product photo
✅ **Price Display** - Clear pricing
✅ **Stock Status** - Shows if in stock or out of stock
✅ **Quantity Selector** - Increase/decrease quantity
✅ **Add to Cart** - One-click add to cart
✅ **Breadcrumb Navigation** - Easy navigation back
✅ **Product Features** - Free shipping, returns, secure payment

## Example Navigation Flow

```
Home → Click on "Wireless Headphones" → Product Detail Page
  ↓
Select Quantity (2) → Add to Cart
  ↓
Cart Icon → Shopping Cart → Checkout → Order Success
```

## URL Structure

- `/` - Homepage
- `/products` - All products
- `/product/1` - Wireless Headphones
- `/product/2` - Smart Watch
- `/product/3` - Laptop Stand
- etc.

Each product has a unique ID from the database.
