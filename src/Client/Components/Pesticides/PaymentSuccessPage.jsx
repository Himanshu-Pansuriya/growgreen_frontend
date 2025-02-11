import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const { state } = useLocation();
  const { transaction } = state || {};
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h1>Payment Successful!</h1>
      {transaction ? (
        <div className="transaction-summary">
          <p><strong>Transaction ID:</strong> {transaction.pesticidesTransactionID}</p>
          <p><strong>Total Paid:</strong> Rs. {transaction.totalPrice}</p>
          <p><strong>Purchase Date:</strong> {new Date(transaction.purchaseDate).toLocaleString()}</p>
        </div>
      ) : (
        <p>No transaction details available.</p>
      )}
      <button onClick={() => navigate('/home')}>Go to Home</button>
    </div>
  );
};

export default PaymentSuccessPage;
