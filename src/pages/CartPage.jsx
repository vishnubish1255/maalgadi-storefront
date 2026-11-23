import { Link } from 'react-router-dom'
import useCart from '../context/useCart.js'

function CartPage() {

  const { cart, removeFromCart, updateQuantity } = useCart()
  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  )

  if (cart.length === 0) {
    return (
      <section className="shop-state">
        <h1>Your cart is empty</h1>
        <p>Add some products to get started.</p>
        <Link className="home-hero-link" to="/shop">Explore the shop</Link>
      </section>
    )
  }

  return (
    
    <section className="cart-page">
      <div className="shop-heading">
        <p className="shop-eyebrow">Your selections</p>
        <h1>Shopping Cart</h1>
        <p>{cart.length} different products</p>
      </div>

      <div className="cart-items">
        {cart.map((product) => (
          <article className="cart-item" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div className="cart-item-info">
              <h2>{product.title}</h2>
              <p>${product.price.toFixed(2)}</p>
              <div className="quantity-controls" aria-label={`Quantity for ${product.title}`}>
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${product.title}`}
                  onClick={() => updateQuantity(product.id, product.quantity - 1)}
                  disabled={product.quantity === 1}
                >
                  −
                </button>
                <span>{product.quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${product.title}`}
                  onClick={() => updateQuantity(product.id, product.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="remove-cart-item"
                type="button"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </section>
  )
}

export default CartPage
