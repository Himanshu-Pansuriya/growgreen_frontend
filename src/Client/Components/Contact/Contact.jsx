import React, { useState } from 'react';
import './Contact.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getCurrenttoken } from '../LoginPage/LoginPage';

function ContactForm() {
  const navigate = useNavigate();
  const token = getCurrenttoken();
  const [contact, setContact] = useState({
    contactID: 0,
    userID: 8,
    userName: 'adfadsf',
    name:'',
    mobileNo: '',
    email: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5045/api/Contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contact)
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        Swal.fire("Success", "Contact added successfully!", "success");
        console.log('Contact added:', data);
        // Handle successful response
          } else {
        Swal.fire("Error", "Failed to add contact", "error");
        console.error('Failed to add contact');
        // Handle error response
          }
        } catch (error) {
          Swal.fire("Error", "An error occurred while adding contact", "error");
          console.error('Error:', error);
          // Handle network error
    }
  };

  return (
    <section className="get-in-touch">
      <h1 className="title">Contact Us</h1>
      <form className="contact-form row" onSubmit={handleSubmit}>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            className="input-text js-input"
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="mobileNo">Mobile No</label>
          <input
            id="mobileNo"
            className="input-text js-input"
            type="text"
            name="mobileNo"
            value={contact.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            className="input-text js-input"
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-12">
          <label className="label" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="input-text js-input"
            name="description"
            value={contact.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <input className="submit-btn" type="submit" value="Submit" />
        </div>
        <div className="form-field col-lg-6">
          <input className="cancel-btn" onClick={()=>{navigate("/home")}} type="button" value="Back" />
        </div>
      </form>
    </section>
  );
}

export default ContactForm;