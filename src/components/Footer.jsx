import { useState } from 'react';
import { readDemoSettings, saveDemoSettings } from '../api/loadPlans.js';

export default function Footer() {
  const [demo, setDemo] = useState(readDemoSettings);

  function handleChange(e) {
    const { name, checked } = e.target;
    const next = { ...demo, [name]: checked };
    setDemo(next);
    saveDemoSettings(next);
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <p>© 2026 NestHost. made with too much chai and zero sleep.</p>
        <details className="demo">
          <summary>dev stuff (dont touch lol)</summary>
          <p>tick one, then refresh the page or hit "Try again".</p>
          <label>
            <input type="checkbox" name="fail" checked={demo.fail} onChange={handleChange} /> break plan loading
          </label>
          <label>
            <input type="checkbox" name="empty" checked={demo.empty} onChange={handleChange} /> pretend there are no plans
          </label>
          <label>
            <input type="checkbox" name="soldOut" checked={demo.soldOut} onChange={handleChange} /> sell out "Starter VPS"
          </label>
        </details>
      </div>
    </footer>
  );
}
