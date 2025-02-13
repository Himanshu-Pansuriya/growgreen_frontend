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

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/FAQ", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        if (isMounted) {
          setFaqsData(data);
          setLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError" && isMounted) {
          console.error("Error fetching FAQs:", error);
          setError(error.message);
          Swal.fire("Error", error.message, "error");
          setLoading(false);
        }
      }
    };

    fetchFAQs();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [token]);

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
            key={faq.id}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-toggle">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQsPage;
