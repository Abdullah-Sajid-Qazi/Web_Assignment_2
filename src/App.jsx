import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import PlansPage from './pages/PlansPage.jsx';
import PlanDetailsPage from './pages/PlanDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { loadPlans } from './api/loadPlans.js';

const CART_KEY = 'nesthost-cart';

function readSavedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'ready'
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);
  const [cart, setCart] = useState(readSavedCart); // items look like { id, qty, os }
  const [lastOrder, setLastOrder] = useState(null);
  const navigate = useNavigate();

  // Load plans when the app starts and every time "Try again" is pressed
  useEffect(() => {
    let ignore = false; // stops old requests from updating state

    async function fetchPlans() {
      try {
        const data = await loadPlans();
        if (!ignore) {
          setPlans(data);
          setStatus('ready');
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setStatus('error');
        }
      }
    }

    fetchPlans();
    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  // Save the cart whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  function retry() {
    setStatus('loading');
    setReloadCount((count) => count + 1);
  }

  // Adding a plan that is already in the cart replaces its quantity and OS
  function addToCart(id, qty, os) {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        return prev.map((item) => (item.id === id ? { ...item, qty, os } : item));
      }
      return [...prev, { id, qty, os }];
    });
  }

  function updateItem(id, changes) {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function placeOrder(customer, lines, summary) {
    setLastOrder({
      number: 'NH-' + Date.now().toString().slice(-6),
      customer,
      lines,
      summary,
    });
    setCart([]);
    navigate('/confirmation');
  }

  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const dataProps = { plans, status, error, onRetry: retry };

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plans" element={<PlansPage {...dataProps} />} />
          <Route path="/plans/:id" element={<PlanDetailsPage {...dataProps} cart={cart} onAddToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage {...dataProps} cart={cart} onUpdate={updateItem} onRemove={removeItem} />} />
          <Route path="/checkout" element={<CheckoutPage {...dataProps} cart={cart} onPlaceOrder={placeOrder} />} />
          <Route path="/confirmation" element={<ConfirmationPage order={lastOrder} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
