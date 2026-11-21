import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="status-box">
      <h1>404 - Page not found</h1>
      <p>This page doesn't exist. Not sure how you got here tbh.</p>
      <Link className="btn" to="/">Go back home</Link>
    </div>
  );
}
