import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from './gsapClient';
import Header from './components/Header';
import Footer from './components/Footer';
import PromotionsSection from './components/PromotionsSection';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Order from './pages/Order';
import { AuthProvider } from './context/AuthContext';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/booking';

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname]);

  return (
    <AuthProvider>
      <div className="app-shell">
        <Header isHomePage={isHomePage} />
        <main className={isHomePage ? 'home-main' : 'page-content'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
        <PromotionsSection />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
