/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
// eslint-disable-next-line no-unused-vars
import Navbar from '../navbar/Navbar';
// eslint-disable-next-line no-unused-vars
import Cart from '../Cart/Cart';
import "./CardDetails.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProductRating from "../Rating-components/Stars.jsx"
// eslint-disable-next-line react/prop-types
export default function CardDetails({ addToCart }) {
    const [quantity, setQuantity] = useState(0)
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log("Fetching product details for ID:", id);
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                else {
                    const data = await response.json()
                    console.log("Fetched data:", data);
                    setProduct(data)
                }
            }
            catch (err) {
                console.error(err)
                setError(err.message)
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id])
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddingToCart = () => {
        addToCart(product);
    }
    const handleManyaddTimes =() =>{
        for(let i = 0; i < quantity; i++)
        {
            handleAddingToCart()
        }
    }
    return (
        <div className="Card-details">
            <LazyLoadImage effect='blur' src={product.thumbnail} alt={product.title} />
            <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className='Pricing'>
                    <p>Price: ${product.price}</p>
                    <ProductRating rating={product.rating} />
                </div>
                <div className="btns">
                    <button className='btn btnd' >Buy</button>
                    <div className="adding">
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value >99 ? 99 : e.target.value)} />
                        <button onClick={() => handleManyaddTimes()} className='btn btnd'>Add to Cart</button>
                    </div>

                </div>
            </div>
        </div>
    );
}