export function Loading() {
  return <p className="status-box" role="status">Loading plans...</p>;
}

export function LoadError({ message, onRetry }) {
  return (
    <div className="status-box error-box" role="alert">
      <p className="error">{message}</p>
      <button type="button" className="btn" onClick={onRetry}>Try again</button>
    </div>
  );
}
