import { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary.jsx';
import { Loading, LoadError } from '../components/LoadState.jsx';
import { getCartLines, getSummary } from '../utils/cart.js';
import { checkMinOrder } from '../rules/rules.js';
import { validateCheckout } from '../utils/validation.js';

const CITIES = ['Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar', 'Other'];
const emptyForm = { name: '', email: '', phone: '', city: '', domain: '', agree: false };

function TextField({ label, name, value, onChange, error, type = 'text', hint }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : false}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {hint && <p className="hint">{hint}</p>}
      {error && <p id={`${name}-error`} className="error">{error}</p>}
    </div>
  );
}

export default function CheckoutPage({ plans, status, error, onRetry, cart, onPlaceOrder }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <LoadError message={error} onRetry={onRetry} />;

  const lines = getCartLines(cart, plans);
  const summary = getSummary(lines);
  const blocked = cart.length === 0 || lines.some((l) => l.problem) || !checkMinOrder(summary.subtotal).ok;

  if (blocked) {
    return (
      <section className="status-box">
        <h1>Checkout</h1>
        <p>Your cart is empty or something in it needs fixing. Go back and sort it out.</p>
        <Link className="btn" to="/cart">Back to cart</Link>
      </section>
    );
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateCheckout(form);
    setErrors(found);
    // Only the wrong fields show an error. The good values stay in the form.
    if (Object.keys(found).length === 0) {
      onPlaceOrder(form, lines, summary);
    }
  }

  return (
    <section>
      <h1>Checkout</h1>
      <p className="note">Almost done, just fill this in.</p>
      <div className="cart-layout">
        <form className="add-form" onSubmit={handleSubmit} noValidate>
          <TextField label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          <TextField label="Phone number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} hint="like 03001234567" />

          <div className="field">
            <label htmlFor="city">City</label>
            <select id="city" name="city" value={form.city} onChange={handleChange} aria-invalid={errors.city ? true : false}>
              <option value="">-- Choose city --</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          <TextField
            label="Domain for your hosting"
            name="domain"
            value={form.domain}
            onChange={handleChange}
            error={errors.domain}
            hint="The domain you want to connect, like myshop.pk"
          />

          <div className="field checkbox">
            <label>
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
              I agree to the terms of service
            </label>
            {errors.agree && <p className="error">{errors.agree}</p>}
          </div>

          <button type="submit" className="btn btn-block">Place order</button>
        </form>
        <OrderSummary summary={summary} />
      </div>
    </section>
  );
}
