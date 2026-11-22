import { useSearchParams } from 'react-router-dom';
import PlanCard from '../components/PlanCard.jsx';
import { Loading, LoadError } from '../components/LoadState.jsx';

export default function PlansPage({ plans, status, error, onRetry }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'All';
  const sort = searchParams.get('sort') || 'price-low';

  // The search and filters live in the URL. So Back from a details page keeps them.
  function updateParam(name, value) {
    const next = new URLSearchParams(searchParams);
    next.set(name, value);
    setSearchParams(next, { replace: true });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <LoadError message={error} onRetry={onRetry} />;

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
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="ram-high">RAM: most first</option>
          </select>
        </div>
      </form>

      {plans.length === 0 ? (
        <div className="status-box">
          <p>No plans right now?? Something's up, try again in a bit.</p>
          <button type="button" className="btn" onClick={onRetry}>Reload plans</button>
        </div>
      ) : results.length === 0 ? (
        <div className="status-box">
          <p>Nothing matches that. Try another word or clear the filters.</p>
          <button type="button" className="btn" onClick={clearFilters}>Clear search and filters</button>
        </div>
      ) : (
        <>
          <p aria-live="polite">Showing {results.length} of {plans.length} plans</p>
          <div className="grid">
            {results.map((plan) => (
              <PlanCard key={plan.id} plan={plan} listSearch={searchParams.toString()} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
