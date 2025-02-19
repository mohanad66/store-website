/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import './Card.css';
import { Link } from 'react-router'; // Corrected import
// eslint-disable-next-line no-unused-vars
import CardDetails from '../cardDetails/CardDetails.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProductRating from '../Rating-components/Stars.jsx';

export default function Card({
  id,
  img,
  quantity,
  rating,
  title,
  price,
  category,
  removeBtn = false,
  RuleofClicking1 = () => { },
  RuleofClicking = () => { },
}) {
  const [itemCount, setItemCount] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    // Count the number of child elements in the div
    if (divRef.current) {
      setItemCount(divRef.current.children.length);
    }
  }, []); // Empty dependency array means this runs once after the initial render

  return (
    <div className="card" key={id}>
      <div className="img">
        <LazyLoadImage
          height={200}
          effect="blur"
          src={img || 'https://via.placeholder.com/150'} // Fallback image if img is undefined
          alt={title}
        />
      </div>
      <h3>{title}</h3>
      {removeBtn ? <p className="quantity">Quantity: {quantity}</p> : ''}
      <div>
        <p>{price}$</p>
        <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
        <ProductRating rating={rating} />
      </div>

      <div
        className="btns"
        ref={divRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.max(itemCount, 1)}, 1fr)`, // Ensure at least 1 column
          gap: '10px', // Add gap between buttons
        }}
      >
        {removeBtn ? (
          <button className="btn" onClick={RuleofClicking}>
            Remove All
          </button>
        ) : (
          <Link className="btn" to={`/cardDetails/${id}`}>
            See details
          </Link>
        )}
        {removeBtn ? (
          <button className="btn" onClick={RuleofClicking1}>
            Remove one Item
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}