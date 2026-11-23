import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useCart from '../context/useCart.js'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=0'
const PRODUCTS_PER_CATEGORY = 4

function HomePage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      try {
        const response = await fetch(PRODUCTS_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Could not load products (${response.status}).`)
        }

        const data = await response.json()
        setProducts(Array.isArray(data.products) ? data.products : [])
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong while loading products.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchProducts()

    return () => controller.abort()
  }, [])

  const productsByCategory = products.reduce((categories, product) => {
    if (!product.category) {
      return categories
    }

    categories[product.category] ??= []

    if (categories[product.category].length < PRODUCTS_PER_CATEGORY) {
      categories[product.category].push(product)
    }

    return categories
  }, {})

  if (isLoading) {
    return (
      <section className="shop-state" aria-live="polite">
        <span className="loading-spinner" aria-hidden="true" />
        <p>Loading our collection…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="shop-state" role="alert">
        <h1>We couldn’t load the collection.</h1>
        <p>{error}</p>
      </section>
    )
  }

  if (Object.keys(productsByCategory).length === 0) {
    return (
      <section className="shop-state" aria-live="polite">
        <h1>No products found</h1>
        <p>There are no products to show right now. Please check back soon.</p>
      </section>
    )
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <p className="shop-eyebrow">Thoughtfully picked for you</p>
        <h1>Find something<br />worth keeping.</h1>
        <p>Explore everyday favourites across our collection.</p>
        <Link className="home-hero-link" to="/shop">Explore the shop</Link>
      </section>

      <div className="home-categories">
        {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
          <section className="home-category" key={category}>
            <div className="home-category-heading">
              <h2>{category.replaceAll('-', ' ')}</h2>
              <Link to={`/shop?category=${encodeURIComponent(category)}`}>View all</Link>
            </div>

            <div className="product-grid">
              {categoryProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <img
                    className="product-image"
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                  />
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default HomePage
