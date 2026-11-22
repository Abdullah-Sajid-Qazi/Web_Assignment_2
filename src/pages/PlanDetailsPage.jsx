import { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import PlanImage from '../components/PlanImage.jsx';
import StockBadge from '../components/StockBadge.jsx';
import { Loading, LoadError } from '../components/LoadState.jsx';
import { checkQuantity, checkOs, withTax, MAX_QTY, WINDOWS_MIN_RAM, TAX_RATE } from '../rules/rules.js';
import { formatPKR } from '../utils/cart.js';

export default function PlanDetailsPage({ plans, status, error, onRetry, cart, onAddToCart }) {
  const { id } = useParams();
  const location = useLocation();
  const inCart = cart.find((item) => item.id === id);

  // If the plan is in the cart already, start with the saved choices
  const [qtyText, setQtyText] = useState(inCart ? String(inCart.qty) : '1');
  const [os, setOs] = useState(inCart ? inCart.os : 'Linux');
  const [message, setMessage] = useState('');

  const listSearch = location.state?.listSearch;
  const backLink = listSearch ? `/plans?${listSearch}` : '/plans';

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <LoadError message={error} onRetry={onRetry} />;

  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    return (
      <section className="status-box">
        <h1>Plan not found</h1>
        <p>Couldn't find a plan called "{id}". Maybe the link is wrong?</p>
        <Link className="btn" to="/plans">See all plans</Link>
      </section>
    );
  }

  const qty = Number(qtyText);
  const soldOut = plan.stock === 0;
  const qtyCheck = checkQuantity(qty, plan.stock);
  const osCheck = checkOs(os, plan.ram);
  const canAdd = !soldOut && qtyCheck.ok && osCheck.ok;
  const taxAmount = withTax(plan.price) - plan.price;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canAdd) return;
    onAddToCart(plan.id, qty, os);
    setMessage(inCart ? 'Cart updated!' : 'Added to cart!');
  }

  return (
    <section>
      <Link to={backLink}>← Back to plans</Link>
      <div className="details">
        <PlanImage src={plan.image} alt={`${plan.name} server picture`} />
        <div>
          <p className="tag">{plan.type}</p>
          <h1>{plan.name}</h1>
          <p>{plan.description || 'No description yet, will definately add one soon.'}</p>
          <StockBadge stock={plan.stock} />

          <table className="spec-table">
            <tbody>
              <tr><th scope="row">CPU cores</th><td>{plan.cpu}</td></tr>
              <tr><th scope="row">RAM</th><td>{plan.ram} GB</td></tr>
              <tr><th scope="row">Storage</th><td>{plan.storage}</td></tr>
              <tr><th scope="row">Price before tax</th><td>{formatPKR(plan.price)} /month</td></tr>
              <tr><th scope="row">Sales tax ({Math.round(TAX_RATE * 100)}%)</th><td>{formatPKR(taxAmount)}</td></tr>
              <tr><th scope="row">You pay</th><td><strong>{formatPKR(withTax(plan.price))} /month</strong></td></tr>
            </tbody>
          </table>

          {soldOut ? (
            <p className="error">Sold out rn. Check out the other plans.</p>
          ) : (
            <form className="add-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="qty">Quantity</label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  max={MAX_QTY}
                  value={qtyText}
                  aria-describedby="qty-hint"
                  aria-invalid={!qtyCheck.ok}
                  onChange={(e) => { setQtyText(e.target.value); setMessage(''); }}
                />
                <p id="qty-hint" className="hint">Max {MAX_QTY} per order. {plan.stock} left.</p>
                {!qtyCheck.ok && <p className="error">{qtyCheck.message}</p>}
              </div>

              <div className="field">
                <label htmlFor="os">Operating system</label>
                <select
                  id="os"
                  value={os}
                  aria-describedby="os-hint"
                  aria-invalid={!osCheck.ok}
                  onChange={(e) => { setOs(e.target.value); setMessage(''); }}
                >
                  <option>Linux</option>
                  <option>Windows</option>
                </select>
                <p id="os-hint" className="hint">Windows needs at least {WINDOWS_MIN_RAM} GB RAM.</p>
                {!osCheck.ok && <p className="error">{osCheck.message}</p>}
              </div>

              <button type="submit" className="btn" disabled={!canAdd}>
                {inCart ? 'Update cart' : 'Add to cart'}
              </button>
            </form>
          )}

          {message && (
            <p className="success" role="status">
              {message} <Link to="/cart">Go to cart</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
