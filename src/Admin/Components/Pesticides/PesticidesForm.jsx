import React, { useState } from 'react';
import './PesticidesForm.css';

function PesticidesForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    manufacturedDate: '',
    expiryDate: '',
    description: '',
    imageUrl: null
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Append each field from the formData to the FormData object
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      // Directly submit the form data to the pesticide API
      const pesticideData = { ...formData };

      const response = await fetch('http://localhost:5045/api/Pesticide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pesticideData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      alert('Form submitted successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="get-in-touch">
      <h1 className="title">Add Pesticides</h1>
      <form className="contact-form row" onSubmit={handleSubmit}>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="name">Pesticide Name</label>
          <input
            id="name"
            className="input-text js-input"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="price">Price</label>
          <input
            id="price"
            className="input-text js-input"
            type="text"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="stock">Stock</label>
          <input
            id="stock"
            className="input-text js-input"
            type="text"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="manufacturedDate">Manufactured Date</label>
          <input
            id="manufacturedDate"
            className="input-text js-input"
            type="date"
            value={formData.manufacturedDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            className="input-text js-input"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="imageUrl">Image</label>
          <input
            id="imageUrl"
            className="input-text js-input"
            type="file"
            onChange={handleChange}
          />
        </div>
        <div className="form-field col-lg-12">
          <label className="label" htmlFor="description">Description</label>
          <input
            id="description"
            className="input-text js-input"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-field col-lg-12">
          <input className="submit-btn" type="submit" value="Submit" />
        </div>
      </form>
    </section>
  );
}

export default PesticidesForm;
