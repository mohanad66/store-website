import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from "./components/home/home.jsx"
import { Route,Routes,useLocation } from 'react-router'
import CardDetails from './components/cardDetails/CardDetails.jsx'
import { ClipLoader } from 'react-spinners';

function App() {
  const [loading, setLoading] = useState(true)
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
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/cardDetails/:id" element={<CardDetails />} />
      </Routes>
    </>
  )
}

export default App
