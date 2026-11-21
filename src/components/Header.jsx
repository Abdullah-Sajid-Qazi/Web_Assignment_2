import { Link, NavLink } from 'react-router-dom';

export default function Header({ cartCount = 0 }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <img src="/logo.svg" alt="" width="28" height="28" />
          NestHost
        </Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/plans">Plans</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
        </nav>
      </div>
    </header>
  );
}
