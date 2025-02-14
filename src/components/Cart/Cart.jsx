import React, { useState } from 'react';
import './Cart.css';
import Card from "../card/Card.jsx"
const Cart = ({ cart, removeFromCart }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [count, setCount] = useState(0)
    const handleRemove = (itemToRemove) => {
        removeFromCart(itemToRemove);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000); // Hide after 2 seconds
    };

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className='cards-grid'>
                    {cart.map((item) => (
                        <Card
                            key={item.id}
                            RuleofClicking={() => handleRemove(item)}
                            removeBtn={true}
                            img={item.thumbnail}
                            title={item.title}
                            price={item.price}
                            category={item.category}
                        />
                    ))}
                </div>
            )}
            {cart.length !== 0 ?
                (<div className="Checkout">
                    <h2>Check out</h2>
                    {cart.map(item => <h3 key={item.id}>{item.title} : {item.price}$</h3>)}
                    <hr />
                    <h3>Total : {cart.reduce((total, item) => total + item.price, 0)}$</h3>
                    <button className='btn' onClick={() => cart.forEach(item => handleRemove(item))}>Check out</button>
                </div>)
                :
                ""}
        </div>
    )
}
export default Cart; // Default export