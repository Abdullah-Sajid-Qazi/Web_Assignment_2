import { useSearchParams } from 'react-router-dom';
import plans from '../data/plans.js';
import PlanCard from '../components/PlanCard.jsx';

export default function PlansPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'All';
  const sort = searchParams.get('sort') || 'price-low';

  function updateParam(name, value) {
    const next = new URLSearchParams(searchParams);
    next.set(name, value);
    setSearchParams(next, { replace: true });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  const types = ['All', ...new Set(plans.map((p) => p.type))];
  const text = search.trim().toLowerCase();

  const results = plans
    .filter((p) => type === 'All' || p.type === type)
    .filter((p) =>
      p.name.toLowerCase().includes(text) || (p.description || '').toLowerCase().includes(text)
    )
    .sort((a, b) => {
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'ram-high') return b.ram - a.ram;
      return a.price - b.price;
    });

  return (
    <section>
      <h1>All plans</h1>
      <p className="note">All prices already include the 16% tax.</p>

      <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="search"
            placeholder="try minecraft, windows, vps..."
            value={search}
            onChange={(e) => updateParam('q', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => updateParam('type', e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
            <option value="price-low">Price (lowest first)</option>
            <option value="price-high">Price (highest first)</option>
            <option value="ram-high">RAM (most first)</option>
          </select>
        </div>
      </form>

      {results.length === 0 ? (
        <div className="status-box">
          <p>Nothing matches that. Try another word or clear the filters.</p>
          <button type="button" className="btn" onClick={clearFilters}>Clear search and filters</button>
        </div>
      ) : (
        <div className="cards-grid">
          {results.map((plan) => (
            <PlanCard key={plan.id} plan={plan} listSearch={searchParams.toString()} />
          ))}
        </div>
      )}
    </section>
  );
}
