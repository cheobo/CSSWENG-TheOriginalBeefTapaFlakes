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

  const handleEdit = (id) => {
    // EDIT
  };

  const handleDelete = (id) => {
    // DELETE
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {items.map((item) => (
        <div key={item.id} className="item">
          <p>{item.quantity}</p>
          <img src={prod} alt={item.title} />
          <p>{item.title}</p>
          <p>PHP {item.price}</p>
          <button className="btn" onClick={() => handleEdit(item.id)}>Edit</button>
          <button className="btn" onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
      <button className="btn" onClick={handleAdd}>Add Item</button>
      <Dulo />
    </div>
  );
};

export default Cart;
