import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Better star icons
import './Stars.css'; // Import CSS for styling

const Stars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="stars" aria-label={`Rating: ${rating} out of 5`}>
            {Array(fullStars).fill().map((_, index) => (
                <FaStar key={`full-${index}`} className="star full" />
            ))}
            {hasHalfStar && <FaStarHalfAlt key="half" className="star half" />}
            {Array(emptyStars).fill().map((_, index) => (
                <FaStar key={`empty-${index}`} className="star empty" />
            ))}
        </div>
    );
};

const ProductRating = () => {
    const [rating, setRating] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/products/1')
            .then(response => {
                setRating(response.data.rating);
            })
            .catch(error => {
                console.error('Error fetching the product rating:', error);
                setError('Failed to load rating.');
            });
    }, []);

    return (
        <div className="product-rating">
            {error ? (
                <p className="error">{error}</p>
            ) : rating !== null ? (
                <Stars rating={rating} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductRating;