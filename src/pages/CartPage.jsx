import { Link } from 'react-router-dom';
import CartRow from '../components/CartRow.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import { Loading, LoadError } from '../components/LoadState.jsx';
import { getCartLines, getSummary, formatPKR } from '../utils/cart.js';
import { checkMinOrder, MIN_ORDER } from '../rules/rules.js';

export default function CartPage({ plans, status, error, onRetry, cart, onUpdate, onRemove }) {
  if (status === 'loading') return <Loading />;
  if (status === 'error') return <LoadError message={error} onRetry={onRetry} />;

  if (cart.length === 0) {
    return (
      <section>
        <h1>Your cart</h1>
        <div className="status-box">
          <p>Your cart is empty. Go grab somthing!</p>
          <Link className="btn" to="/plans">Browse plans</Link>
        </div>
      </section>
    );
  }

  const lines = getCartLines(cart, plans);
  const summary = getSummary(lines);
  const minCheck = checkMinOrder(summary.subtotal);
  const problemCount = lines.filter((line) => line.problem).length;
  const canCheckout = problemCount === 0 && minCheck.ok;

  return (
    <section>
      <h1>Your cart</h1>
      {problemCount > 0 && (
        <p className="error" role="alert">
          {problemCount} item(s) need fixing before you can check out.
        </p>
      )}
      <div className="cart-layout">
        <ul className="cart-list">
          {lines.map((line) => (
            <CartRow key={line.id} line={line} onUpdate={onUpdate} onRemove={onRemove} />
          ))}
        </ul>
        <div>
          <OrderSummary summary={summary} />
          <p className="hint">Min order: {formatPKR(MIN_ORDER)}/month (before tax).</p>
          {!minCheck.ok && <p className="error">{minCheck.message}</p>}
          {canCheckout ? (
            <Link className="btn btn-block" to="/checkout">Continue to checkout</Link>
          ) : (
            <button type="button" className="btn btn-block" disabled>Continue to checkout</button>
          )}
        </div>
      </div>
    </section>
  );
}
