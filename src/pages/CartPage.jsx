import { Link } from 'react-router-dom';

export default function CartPage() {
  return (
    <section>
      <h1>Your Cart</h1>
      <div className="status-box">
        <p>Your cart is currently empty.</p>
        <Link className="btn" to="/plans">Browse hosting plans</Link>
      </div>
    </section>
  );
}
