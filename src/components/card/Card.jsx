import React from 'react';
import "./Card.css"
import { Link } from 'react-router';
import CardDetails from "../cardDetails/CardDetails.jsx"
export default function Card({ id, img, title, price, category }) {
    return (
        <div className="card" key={id}>
            <img src={img || 'https://via.placeholder.com/150'} alt={title} height={250} /> {/* Fallback image if img is undefined */}
            <h3>{title}</h3>
            <div>
                <p>Price: {price}$</p>
                <p>{category}</p>
            </div>
            <Link className="btn" to={`/cardDetails/${id}`}>See details</Link>
        </div>
    );
}