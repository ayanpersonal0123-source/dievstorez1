import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';

// Atelier
import AtelierLogin from './atelier/Login';
import AtelierDashboard from './atelier/Dashboard';

// Layout wrapper that shows/hides nav+footer based on route
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAtelier = location.pathname.startsWith('/atelier');

  if (isAtelier) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/atelier/login" element={<AtelierLogin />} />
              <Route path="/atelier" element={<AtelierDashboard />} />
            </Routes>
          </Layout>
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
