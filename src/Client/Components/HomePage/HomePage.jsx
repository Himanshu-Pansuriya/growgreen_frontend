import React from "react";
import Footer from "../Footer/Footer";
import "../HomePage/HomePage.css";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
    <div className="section-homepage">
      {/* Hero Section */}
      <section className="hero bg-success text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Empowering Farmers, Sustaining Nature!</h1>
          <p className="lead mt-3">
            Bridging technology and trust for a brighter agricultural future.
          </p>
          <div className="mt-4">
            <a onClick={()=>{navigate("/about")}} className="btn btn-light btn-lg me-3 shadow-sm">
              Learn More
            </a>
            <a onClick={()=>{navigate("/contact")}} className="btn btn-outline-light btn-lg shadow-sm">
              Join Us
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-homepage py-5 bg-light text-center">
        <div className="container">
          <h2 className="text-success fw-bold mb-4">Why Choose Grow Green?</h2>
          <p className="text-muted mb-5">
            We connect farmers, buyers, and admins with innovative tools to make farming
            sustainable and profitable.
          </p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-2 card-homepage">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">Sustainable Farming</h5>
                  <p className="card-text text-muted">
                    Promoting eco-friendly practices for better yields.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-2 card-homepage">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">Crop Suitability Testing</h5>
                  <p className="card-text text-muted">
                    Helping farmers choose the right crops for their land.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-2 card-homepage">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">Trusted by Millions</h5>
                  <p className="card-text text-muted">
                    A reliable platform used by farmers nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services py-5">
      <div className="container text-center">
        <h2 className="text-success fw-bold mb-4">What We Offer</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div
              className="card shadow-sm border-2 card-homepage"
              onClick={() => navigate("/crop")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">Crop Selling</h5>
                <p className="card-text text-muted">
                  Farmers can sell crops directly to buyers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm border-2 card-homepage"
              onClick={() => navigate("/pesticides")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">Pesticide Store</h5>
                <p className="card-text text-muted">
                  Purchase high-quality pesticides at great prices.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm border-2 card-homepage"
              onClick={() => navigate("/blog")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">Expert Support</h5>
                <p className="card-text text-muted">
                  Get advice from agriculture specialists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5 mb-5 bg-light">
        <div className="container text-center">
          <h2 className="text-success fw-bold mb-4">What Our Farmers Say</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card shadow-sm border-2">
                <div className="card-body">
                  <p className="card-text text-muted fst-italic">
                    "Grow Green transformed my farm’s yield."
                  </p>
                  <p className="fw-bold text-success">- Rajesh, Farmer from Punjab</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm border-2">
                <div className="card-body">
                  <p className="card-text text-muted fst-italic">
                    "The crop suitability testing feature is a game changer."
                  </p>
                  <p className="fw-bold text-success">- Meera, Farmer from Gujarat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
}
