import { formatPKR } from '../utils/cart.js';
import { TAX_RATE } from '../rules/rules.js';

export default function OrderSummary({ summary }) {
  return (
    <div className="summary">
      <h2>Summary</h2>
      <dl>
        <div><dt>Servers</dt><dd>{summary.count}</dd></div>
        <div><dt>Subtotal</dt><dd>{formatPKR(summary.subtotal)}</dd></div>
        <div><dt>Sales tax ({Math.round(TAX_RATE * 100)}%)</dt><dd>{formatPKR(summary.tax)}</dd></div>
        <div className="total"><dt>Total per month</dt><dd>{formatPKR(summary.total)}</dd></div>
      </dl>
    </div>
  );
}
