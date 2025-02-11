import React from "react";
import "./AboutPage.css";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="about-us-container">
      <div className="hero-section">
        <h1>About Us</h1>
        <p>Empowering Farmers. Connecting Buyers. Fostering Sustainability.</p>
      </div>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To revolutionize the agricultural industry by enabling farmers to
          thrive, ensuring buyers receive the best quality produce, and
          promoting eco-friendly practices.
        </p>
      </section>
      <section className="offerings-section">
        <h2>What We Offer</h2>
        <div className="offerings">
          <div className="offering">
            <h3>For Farmers</h3>
            <p>
              A hassle-free way to sell crops and agricultural products, tools
              for crop suitability testing, and access to resources like
              pesticides and fertilizers.
            </p>
          </div>
          <div className="offering">
            <h3>For Buyers</h3>
            <p>
              A trusted platform to purchase fresh produce directly from
              farmers with quality assurance through verified crop listings.
            </p>
          </div>
          <div className="offering">
            <h3>For Admins</h3>
            <p>
              Tools to oversee, moderate, and manage platform operations
              seamlessly.
            </p>
          </div>
        </div>
      </section>
      <section className="why-choose-section">
        <h2>Why Choose GrowGreen?</h2>
        <ul>
          <li>
            <strong>Empowering Farmers:</strong> Tools for success in a
            competitive market.
          </li>
          <li>
            <strong>Transparency:</strong> Direct connections between buyers and
            sellers.
          </li>
          <li>
            <strong>Sustainability:</strong> Eco-friendly practices improving
            productivity.
          </li>
          <li>
            <strong>Innovation:</strong> A modern digital platform tailored for
            agriculture.
          </li>
        </ul>
      </section>
      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          To create a future where technology and agriculture work hand-in-hand
          to ensure food security, sustainable farming, and economic growth for
          all.
        </p>
      </section>
      <section className="join-us-section">
        <h2>Join Us</h2>
        <p>
          Whether you’re a farmer, buyer, or advocate for sustainable
          agriculture, GrowGreen welcomes you to be a part of our journey.
        </p>
        <button className="learn-more-btn" onClick={()=>{navigate("/contact")}}>Learn More</button>
      </section>
    </div>
  );
};

export default AboutUs;