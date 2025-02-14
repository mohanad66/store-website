import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from "./components/home/home.jsx"
import { Route, Routes, useLocation, Router } from 'react-router'
import CardDetails from './components/cardDetails/CardDetails.jsx'
import { ClipLoader } from 'react-spinners';
import Cart from './components/Cart/Cart.jsx'
import Navbar from './components/navbar/Navbar.jsx';
function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }); const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation()
  useEffect(() => {
    setLoading(true);
    setFadeOut(false);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // If the product is already in the cart, increase its quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemToRemove.id));
  };
  return (
    <>
      {loading && (
        <div className={`loading-overlay ${fadeOut ? 'fade-out' : ''}`}>
          <div className="loading-content">
            <ClipLoader color="#36d7b7" size={60} />
            <p>Loading...</p>
          </div>
        </div>
      )}
        <Navbar count={cart.length} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route
            path="/cardDetails/:id"
            element={<CardDetails addToCart={addToCart} />}
          />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>
    </>
  )
}

export default App
