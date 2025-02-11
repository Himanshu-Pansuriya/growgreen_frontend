import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./FAQsPage.css";
import { getCurrenttoken } from "../LoginPage/LoginPage";

function FAQsPage() {
  const [faqsData, setFaqsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getCurrenttoken();

  // Toggle the active FAQ item
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    // Replace the URL below with your actual FAQs API endpoint.
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/FAQ", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setFaqsData(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError(error.message);
        Swal.fire("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return <p>Loading FAQs...</p>;
  }

  if (error) {
    return <p>Error loading FAQs: {error}</p>;
  }

  return (
    <div className="faqs-container">
      <h1 className="faqs-title">We Have Answers...</h1>
      <div className="faqs-list">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-toggle">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className="faq-answer"
              style={{ display: activeIndex === index ? "block" : "none" }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQsPage;
