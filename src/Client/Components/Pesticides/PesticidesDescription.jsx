import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PesticidesDescription.css';
import { getCurrenttoken } from '../LoginPage/LoginPage';

const PesticidesDescription = () => {
  const { id } = useParams(); // Capture the 'id' from the URL params
  
  const [pesticide, setPesticide] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const token = getCurrenttoken();

  useEffect(() => {
    const fetchPesticideData = async () => {
      try {
        // Use the dynamic 'id' to fetch data for the specific pesticide
        const response = await fetch(`http://localhost:5045/api/Pesticide/${id}`, {
            method: "GET",
            headers:{Authorization: `Bearer ${token}`,}
        });
        if (!response.ok) {
          throw new Error('Failed to fetch pesticide data');
        }
        const data = await response.json();
        setPesticide(data);
      } catch (error) {
        console.error('Error fetching pesticide data:', error);
      }
    };

    if (id) {
      fetchPesticideData();
    }
  }, [id]); // Re-fetch if the 'id' changes

  if (!pesticide) {
    return <div className="loading">Loading...</div>;
  }

  // Increase quantity by 1
  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrease quantity by 1 (minimum quantity is 1)
  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Calculate total price based on the quantity
  const totalPrice = pesticide.price * quantity;

  // When BUY NOW is clicked, navigate to the transaction page and pass state
  const handleBuyNow = () => {
    navigate('/pesticidestransaction', { state: { pesticide, quantity } });
  };

  return (
    <div className="product-container">
      <div className="product-image">
        <img
          src={pesticide.imageUrl || 'default-image-url.jpg'}
          alt={pesticide.pesticidesName}
          className="product-img"
        />
      </div>
      <div className="product-details">
        <h1 className="product-name">{pesticide.pesticidesName}</h1>
        <div className="price">
          <span className="current-price">Rs. {pesticide.price}</span>
          {pesticide.originalPrice && (
            <span className="old-price">Rs. {pesticide.originalPrice}</span>
          )}
        </div>
        
        <h2 className="section-title">Description</h2>
        <p className="detailed-description">{pesticide.description}</p>
        
        <div className="product-info">
          <p>
            <strong>Manufactured Date:</strong>{' '}
            {new Date(pesticide.manufacturedDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Expiry Date:</strong>{' '}
            {new Date(pesticide.expiryDate).toLocaleDateString()}
          </p>
          <p className="stock-alert text-danger">
            Only <strong>{pesticide.stock}</strong> left in stock!
          </p>
          <p className="offer">
            Get <span className="discount">15% Off</span> your purchase!
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <button className="quantity-btn" onClick={handleDecrease}>-</button>
          <span className="quantity">{quantity}</span>
          <button className="quantity-btn" onClick={handleIncrease}>+</button>
        </div>
        <p className="total-price">Total Price: Rs. {totalPrice}</p>
        
        <button className="select-size-btn" onClick={handleBuyNow}>BUY NOW</button>
      </div>
    </div>
  );
};

export default PesticidesDescription;
