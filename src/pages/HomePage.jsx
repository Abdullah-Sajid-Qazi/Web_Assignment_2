import { Link } from 'react-router-dom';
import { MIN_ORDER, TAX_RATE } from '../rules/rules.js';
import { formatPKR } from '../utils/cart.js';

export default function HomePage() {
  return (
    <section>
      <div className="hero">
        <h1>Hosting for students &amp; small businesses in Pakistan</h1>
        <p>
          VPS, web hosting, game servers, dedicated servers, we got it all.
          Pay monthly in PKR, and yes the {Math.round(TAX_RATE * 100)}% tax is already in the price.
        </p>
        <Link className="btn" to="/plans">Check out plans</Link>
      </div>
      <div className="features">
        <div>
          <h2>No hidden tax</h2>
          <p>The price you see is the price you pay. No weird surprises at checkout.</p>
        </div>
        <div>
          <h2>Live stock</h2>
          <p>See how many servers are left before they're gone. They go fast tbh.</p>
        </div>
        <div>
          <h2>Min order</h2>
          <p>Minimum order is {formatPKR(MIN_ORDER)}/month before tax. Servers arent free lol.</p>
        </div>
      </div>
    </section>
  );
}
