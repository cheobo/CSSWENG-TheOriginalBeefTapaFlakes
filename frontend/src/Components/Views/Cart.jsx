import React from 'react';
import prod from '../../Assets/flakes.png';
import Dulo from '../Footer/Dulo.jsx';
import './Cart.css';

const Cart = () => {
  const items = [
    { id: 1, quantity: 1, title: 'Product 1', price: 100 },
    { id: 2, quantity: 3, title: 'Product 2', price: 200 },
    // Add more items
  ];

  const handleAdd = () => {
    // ADD
  };

  const handleDelete = (id) => {
    // DELETE
  };

  const handleCheckout = () => {
    // CHECKOUT
  };

  return (
    <div className="grid-container">
      <div className="grid-item"></div>
      <div className="grid-item">
        <div className="cart-container">
          <h1>Cart</h1>
          <div className="items-container">
            {items.map((item) => (
              <div key={item.id} className="item">
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <img src={prod} alt={item.title} />
                <p><strong>Product:</strong> {item.title}</p>
                <p><strong>Price:</strong> PHP {item.price}</p>
                <button className="btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            ))}
            <button className="btn" onClick={handleAdd}>Add Item</button>
            <button className="btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
      <div className="grid-item"></div>
      <Dulo />
    </div>
  );
};

export default Cart;
