import { Link } from 'react-router-dom';
import { MAX_QTY } from '../rules/rules.js';
import { formatPKR } from '../utils/cart.js';

export default function CartRow({ line, onUpdate, onRemove }) {
  const { id, qty, os, plan, problem, lineTotal } = line;
  const canEdit = plan && plan.stock > 0;

  return (
    <li className={problem ? 'cart-row has-problem' : 'cart-row'}>
      <div className="cart-name">
        {plan ? <Link to={`/plans/${id}`}>{plan.name}</Link> : <span>Unknown plan ({id})</span>}
        {plan && <span className="hint">{formatPKR(plan.price)} /month each, before tax</span>}
      </div>

      {canEdit && (
        <>
          <div className="field small">
            <label htmlFor={`qty-${id}`}>Qty</label>
            <input
              id={`qty-${id}`}
              type="number"
              min="1"
              max={MAX_QTY}
              value={qty}
              onChange={(e) => onUpdate(id, { qty: Number(e.target.value) })}
            />
          </div>
          <div className="field small">
            <label htmlFor={`os-${id}`}>OS</label>
            <select id={`os-${id}`} value={os} onChange={(e) => onUpdate(id, { os: e.target.value })}>
              <option>Linux</option>
              <option>Windows</option>
            </select>
          </div>
        </>
      )}

      <p className="line-total">{formatPKR(lineTotal)}</p>
      <button type="button" className="btn btn-secondary" onClick={() => onRemove(id)}>Remove</button>
      {problem && <p className="error cart-problem">{problem}</p>}
    </li>
  );
}
