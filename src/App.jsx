import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, useLocation, Router } from 'react-router'
import CardDetails from './components/cardDetails/CardDetails.jsx'
import { ClipLoader } from 'react-spinners';
import Cart from './components/Cart/Cart.jsx'
import Navbar from './components/navbar/Navbar.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const Home = React.lazy(() => import("./components/home/Home.jsx"))
import { Link } from 'react-router'
import { CiHome ,CiShoppingCart } from "react-icons/ci";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }); const [loading, setLoading] = useState(true)
  const location = useLocation()
  const [fadeOut, setFadeOut] = useState(false);
  function Loading() {
    return (
      <div className={`loading-overlay ${fadeOut ? 'fade-out' : ''}`}>
        <div className="loading-content">
          <ClipLoader color="#36d7b7" size={60} />
          <p>Loading...</p>
        </div>
      </div>
    )
  }
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

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  const removeFromCartAll = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemToRemove.id));
  };
  const removeFromCartOne = (itemToRemove) => {
    setCart((prevCart) => prevCart.map(item =>
      item.id === itemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0));
  };
  return (
    <>
      {loading && (
        <Loading />
      )}
      <Navbar count={cart.reduce((total, item) => total + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<Loading />}>
            <Home addToCart={addToCart} />
          </React.Suspense>} />
        <Route
          path="/cardDetails/:id"
          element={<CardDetails addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} removeFromCartOne={removeFromCartOne} removeFromCartAll={removeFromCartAll} />} />
      </Routes>
    </>
  )
}

export default App
