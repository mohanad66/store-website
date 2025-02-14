import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Navbar from '../navbar/Navbar';
import Cart from '../Cart/Cart';
import "./CardDetails.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function CardDetails({ addToCart }) {
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
    const handleAddingToCart = () =>{
        addToCart(product)
    }
    return (
        <div className="Card-details">
            <LazyLoadImage src={product.thumbnail} alt={product.title} />
            <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className='Pricing'>
                    <p>Price: ${product.price}</p>
                    <p>Rating: {product.rating}</p>
                </div>
                <div className="btns">
                <button className='btn' >Buy</button>
                <button  onClick={() => handleAddingToCart()} className='btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}