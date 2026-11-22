import { Link } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary.jsx';
import { formatPKR } from '../utils/cart.js';

export default function ConfirmationPage({ order }) {
  if (!order) {
    return (
      <section className="status-box">
        <h1>No recent order</h1>
        <p>Nothing to show here. This page only works right after you check out (refreshing clears it).</p>
        <Link className="btn" to="/plans">Browse plans</Link>
      </section>
    );
  }

  return (
    <section>
      <div className="success-box">
        <h1>Order placed!</h1>
        <p>Thanks {order.customer.name}! Your order number is <strong>{order.number}</strong>.</p>
        <p>We'll send the setup details to {order.customer.email}. Check your spam folder too, just in case.</p>
      </div>

      <h2>What you ordered</h2>
      <ul className="order-list">
        {order.lines.map((line) => (
          <li key={line.id}>
            {line.plan.name} × {line.qty} ({line.os}): {formatPKR(line.lineTotal)} /month before tax
          </li>
        ))}
      </ul>
      <p>Domain: {order.customer.domain} · City: {order.customer.city}</p>
      <OrderSummary summary={order.summary} />
      <p><Link className="btn" to="/plans">Back to plans</Link></p>
    </section>
  );
}
