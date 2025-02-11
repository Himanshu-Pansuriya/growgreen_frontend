import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./FAQsForm.css";
import LoadingSpinner from "../../../Client/Components/LoadingSpinner/LoadingSpinner";
import { getCircularProgressUtilityClass } from "@mui/material";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function FAQsForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = getCurrenttoken();

  // Fetch FAQ data for editing when an id is provided
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:5045/api/FAQ/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch FAQ data");
          }
          return response.json();
        })
        .then((data) => {
          setFormData({
            question: data.question,
            answer: data.answer,
          });
        })
        .catch((error) => {
          console.error("Error fetching FAQ data:", error);
          Swal.fire("Error", "Failed to load FAQ data", "error");
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine URL and HTTP method based on whether we're adding or editing
    const url = id
      ? `http://localhost:5045/api/FAQ/${id}`
      : "http://localhost:5045/api/FAQ";
    const method = id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          faqid: id ? parseInt(id, 10) : 0, // Use the provided id for edit, or 0 for new FAQ
          question: formData.question,
          answer: formData.answer,
        }),
      });

      if (response.ok) {
        Swal.fire(
          "Success",
          id ? "FAQ updated successfully!" : "FAQ added successfully!",
          "success"
        );
        navigate("/admin/faqs");
      } else {
        Swal.fire("Error", "Failed to submit the FAQ", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleBack = () => {
    navigate("/admin/faqs");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="get-in-touch">
      <h1 className="title">{id ? "Edit FAQ" : "Add FAQ"}</h1>
      <form className="contact-form row" onSubmit={handleSubmit}>
        <div className="form-field col-lg-12">
          <label className="label" htmlFor="question">
            Question
          </label>
          <input
            id="question"
            className="input-text js-input"
            type="text"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-12">
          <label className="label" htmlFor="answer">
            Answer
          </label>
          <textarea
            id="answer"
            className="input-text js-input"
            rows="5"
            value={formData.answer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <input className="submit-btn" type="submit" value="Submit" />
        </div>
        <div className="form-field col-lg-6">
          <input
            className="cancel-btn"
            onClick={handleBack}
            type="button"
            value="Back"
          />
        </div>
      </form>
    </section>
  );
}

export default FAQsForm;
