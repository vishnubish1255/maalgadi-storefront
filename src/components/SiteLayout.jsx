import { NavLink, Outlet } from 'react-router-dom'
import useCart from '../context/useCart.js'

const CURRENT_YEAR = new Date().getFullYear()

function SiteLayout() {
  const { cartCount } = useCart()

  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Maalgadi home">MaalGadi</NavLink>

        <div className="header-actions">
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink end to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/cart">Cart ({cartCount})</NavLink>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <span className="footer-brand">MaalGadi</span>
        <small>© {CURRENT_YEAR} MaalGadi</small>
      </footer>
    </div>
  )
}

export default SiteLayout
