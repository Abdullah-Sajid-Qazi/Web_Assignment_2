import plans from '../data/plans.js';
import PlanCard from '../components/PlanCard.jsx';

export default function PlansPage() {
  return (
    <section>
      <h1>All plans</h1>
      <p className="note">All prices already include the 16% tax.</p>

      <div className="cards-grid" style={{ marginTop: '20px' }}>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}
