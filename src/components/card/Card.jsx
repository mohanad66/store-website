/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./Card.css"
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import CardDetails from "../cardDetails/CardDetails.jsx"
import { LazyLoadImage } from 'react-lazy-load-image-component'
export default function Card({ id, img, title, price, category, removeBtn = false, RuleofClicking = "" }) {
    return (
        <div className="card" key={id}>
            <LazyLoadImage className='img' height={250} effect="blur" src={img || 'https://via.placeholder.com/150'} alt={title} /> {/* Fallback image if img is undefined */}
            <h3>{title}</h3>
            <div>
                <p>Price: {price}$</p>
                <p>{category}</p>
            </div>
            {removeBtn ? (
                <button className="btn" onClick={RuleofClicking}>
                    Remove
                </button>
            ) : (
                <Link className="btn" to={`/cardDetails/${id}`}>
                    See details
                </Link>
            )}
        </div>
    );
}