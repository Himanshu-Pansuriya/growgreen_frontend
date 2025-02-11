import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./BlogForm.css";
import LoadingSpinner from "../../../Client/Components/LoadingSpinner/LoadingSpinner";

function BlogForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    publishedDate: new Date().toISOString(),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const token = localStorage.getItem("authToken"); // Get token from localStorage
      fetch(`http://localhost:5045/api/Blog/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to headers
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch blog data");
          }
          return response.json();
        })
        .then((data) => {
          setFormData({
            title: data.title,
            detail: data.detail,
            publishedDate: data.publishedDate,
          });
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
          Swal.fire("Error", "Failed to load blog data", "error");
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

    const url = id
      ? `http://localhost:5045/api/Blog/${id}` 
      : "http://localhost:5045/api/Blog";
    const method = id ? "PUT" : "POST";

    const token = localStorage.getItem("token"); // Get token from localStorage

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to headers
        },
        body: JSON.stringify({
          blogID: id ? parseInt(id, 10) : 0, 
          adminID: 1, 
          userName: "Himanshu",
          title: formData.title,
          detail: formData.detail,
          publishedDate: formData.publishedDate,
          isDeleted: false,
        }),
      });
      
      if (response.ok) {
        Swal.fire(
          "Success",
          id ? "Blog updated successfully!" : "Blog added successfully!",
          "success"
        );
        navigate("/admin/blog");
      } else {
        Swal.fire("Error", "Failed to submit the blog", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleBack = () => {
    navigate("/admin/blog");
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
    <section className="get-in-touch">
      <h1 className="title">{id ? "Edit Blog" : "Add Blog"}</h1>
      <form className="contact-form row" onSubmit={handleSubmit}>
        <div className="form-field col-lg-12">
          <label className="label" htmlFor="title">
            Blog Title
          </label>
          <input
            id="title"
            className="input-text js-input"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-12">
          <label className="label" htmlFor="detail">
            Blog Detail
          </label>
          <textarea
            id="detail"
            className="input-text js-input"
            rows="5"
            value={formData.detail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <input className="submit-btn" type="submit" value="Submit" />
        </div>
        <div className="form-field col-lg-6">
          <input className="cancel-btn" onClick={handleBack} type="button" value="Back" />
        </div>
      </form>
    </section>
    </>
  );
}

export default BlogForm;
