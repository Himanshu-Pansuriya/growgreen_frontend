import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PesticidesTransaction.css';
import { getCurrenttoken, getCurrentUserID, getCurrentUsername } from '../LoginPage/LoginPage';

const PesticidesTransaction = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pesticide, quantity } = state || {};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const token = getCurrenttoken();

  if (!pesticide || !quantity) {
    return <div className="error-message">No transaction data provided. Please try again.</div>;
  }

  const totalPrice = pesticide.price * quantity;
  const purchaseDate = new Date().toISOString();

  const handlePayment = async () => {
    setIsSubmitting(true);
    setError('');

    // Validate payment details based on the selected payment method
    if (paymentMethod === 'UPI' && !upiId) {
      setError('Please enter a valid UPI ID.');
      setIsSubmitting(false);
      return;
    } else if ((paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') && (!cardNumber || !cvv)) {
      setError('Please enter valid card details.');
      setIsSubmitting(false);
      return;
    }

    const transactionData = {
      transaction: {
        buyerID: parseInt(getCurrentUserID(), 10),
        userName: getCurrentUsername(),
        pesticidesName: pesticide.pesticidesName,
        pesticideID: pesticide.pesticideID,
        quantityPurchased: quantity,
        totalPrice: totalPrice,
        purchaseDate: purchaseDate,
        paymentMethod: paymentMethod,
        paymentDetail: paymentMethod === 'UPI' ? upiId : `${cardNumber }:${ cvv}`,
      },
    };

    try {
      const response = await fetch('http://localhost:5045/api/PesticidesTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData.transaction),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(transactionData.transaction);
        
        console.error('Error:', errorMessage);
        throw new Error('Payment failed');
      }

      const result = await response.json();
      navigate('/paymentsuccess', { state: { transaction: result } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="transaction-container">
      <h1 className="title">Payment</h1>
      <div className="transaction-details">
        <p><strong>Pesticide:</strong> {pesticide.pesticidesName}</p>
        <p><strong>Unit Price:</strong> Rs. {pesticide.price}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Total Price:</strong> Rs. {totalPrice}</p>
      </div>

      <div className="payment-method">
        <label><strong>Select Payment Method:</strong></label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="dropdown">
          <option value="">--Select--</option>
          <option value="UPI">UPI</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      {paymentMethod === 'UPI' && (
        <div className="upi-input">
          <label>UPI ID:</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter your UPI ID"
            className="input-field"
          />
        </div>
      )}

      {(paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') && (
        <div className="card-input">
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter your card number"
            className="input-field"
          />
          <label>CVV:</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="Enter your CVV"
            className="input-field"
          />
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <button
        className="pay-btn"
        onClick={handlePayment}
        disabled={isSubmitting || !paymentMethod}
      >
        {isSubmitting ? 'Processing Payment...' : 'Make Payment'}
      </button>
    </div>
  );
};

export default PesticidesTransaction;
