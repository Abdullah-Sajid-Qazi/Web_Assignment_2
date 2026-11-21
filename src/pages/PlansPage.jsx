import { Link } from 'react-router-dom';

export default function PlansPage() {
  return (
    <section>
      <h1>Hosting Plans</h1>
      <p className="note">All prices already include 16% sales tax.</p>
      <div className="plans-preview" style={{ marginTop: '20px' }}>
        <p>Loading full interactive plan catalog...</p>
      </div>
    </section>
  );
}
