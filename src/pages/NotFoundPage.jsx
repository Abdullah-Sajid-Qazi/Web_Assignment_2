import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="status-box">
      <h1>Page not found</h1>
      <p>This page doesn't exist. Maybe a typo in the link?</p>
      <Link className="btn" to="/plans">Browse plans</Link>
    </section>
  );
}
