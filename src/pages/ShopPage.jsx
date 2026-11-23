import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useCart from '../context/useCart.js'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=0'

function ShopPage() {
  const { addToCart } = useCart()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      setIsLoading(true)
      setError('')

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

  const displayedProducts = category ? products.filter((product) => product.category === category) : products
  const categoryTitle = category?.replaceAll('-', ' ')

  if (isLoading) {
    return (
      <section className="shop-state" aria-live="polite">
        <span className="loading-spinner" aria-hidden="true" />
        <p>Loading products…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="shop-state" role="alert">
        <h1>We couldn’t load the products.</h1>
        <p>{error}</p>
      </section>
    )
  }

  if (displayedProducts.length === 0) {
    return (
      <section className="shop-state" aria-live="polite">
        <h1>No products found</h1>
        <p>
          {category ? `There are no products in ${categoryTitle} right now.` : 'There are no products to show right now. Please check back soon.'}
        </p>
      </section>
    )
  }

  return (
    <section className="shop-page">
      <div className="shop-heading">
        <p className="shop-eyebrow">Maalgadi collection</p>
        <h1>{categoryTitle || 'Shop all'}</h1>
        <p>{displayedProducts.length} products</p>
      </div>

      <div className="product-grid">
        {displayedProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img
              className="product-image"
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
            />
            <div className="product-info">
              <h2>{product.title}</h2>
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
  )
}

export default ShopPage
