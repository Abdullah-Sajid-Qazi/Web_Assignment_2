import { useState } from 'react';

export default function PlanImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className="img-fallback">No image available</div>;
  }
  return <img className="plan-img" src={src} alt={alt} onError={() => setFailed(true)} />;
}
