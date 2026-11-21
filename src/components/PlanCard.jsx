import { Link } from 'react-router-dom';
import PlanImage from './PlanImage.jsx';
import StockBadge from './StockBadge.jsx';
import { withTax } from '../rules/rules.js';
import { formatPKR } from '../utils/cart.js';

export default function PlanCard({ plan, listSearch }) {
  return (
    <article className="card">
      <PlanImage src={plan.image} alt={`${plan.name} server picture`} />
      <div className="card-body">
        <p className="tag">{plan.type}</p>
        <h2 className="card-title">{plan.name}</h2>
        <p className="specs">{plan.cpu} CPU · {plan.ram} GB RAM · {plan.storage}</p>
        <p className="price">
          {formatPKR(withTax(plan.price))} <span>/month (tax included)</span>
        </p>
        <StockBadge stock={plan.stock} />
        {/* listSearch lets the details page link back with the same search and filters */}
        <Link className="btn btn-secondary" to={`/plans/${plan.id}`} state={{ listSearch }}>
          View details
        </Link>
      </div>
    </article>
  );
}
