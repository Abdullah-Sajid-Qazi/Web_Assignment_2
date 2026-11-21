export default function App() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <img src="/logo.svg" alt="NestHost logo" width="32" height="32" />
            <span>NestHost</span>
          </div>
          <nav className="nav">
            <a href="#plans">Plans</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <main className="container main-content">
        <section className="hero">
          <h1>Hosting for students &amp; small businesses in Pakistan</h1>
          <p>
            VPS, web hosting, game servers, dedicated servers.
            Pay monthly in PKR with 16% sales tax already included.
          </p>
          <a href="#plans" className="btn">Check out plans</a>
        </section>

        <section id="plans" className="plans-preview">
          <h2>Popular Hosting Plans</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>Starter VPS</h3>
              <p className="specs">1 vCPU · 2 GB RAM · 25 GB NVMe</p>
              <p className="price">PKR 1,392 <span>/month (tax included)</span></p>
              <p className="desc">Great for small side projects, bot hosting, and test environments.</p>
            </div>
            <div className="card">
              <h3>Basic VPS</h3>
              <p className="specs">2 vCPU · 4 GB RAM · 50 GB NVMe</p>
              <p className="price">PKR 2,552 <span>/month (tax included)</span></p>
              <p className="desc">Ideal for small production web applications and lightweight databases.</p>
            </div>
            <div className="card">
              <h3>Student Web Hosting</h3>
              <p className="specs">Shared · 1 GB RAM · 10 GB SSD</p>
              <p className="price">PKR 580 <span>/month (tax included)</span></p>
              <p className="desc">Budget-friendly shared hosting for university course assignments and portfolios.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; 2026 NestHost. CS4032 Web Programming Assignment 02.</p>
        </div>
      </footer>
    </div>
  );
}
