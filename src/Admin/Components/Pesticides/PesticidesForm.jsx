import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PesticidesForm.css";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Client/Components/LoadingSpinner/LoadingSpinner";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function PesticidesForm() {
  const { id } = useParams(); // Extract the id from the route
  const navigate = useNavigate(); // For navigation after success

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    manufacturedDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    description: "",
    imageUrl: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = getCurrenttoken();

  // Fetch data for editing if id exists
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:5045/api/Pesticide/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setFormData({
            name: data.pesticidesName || "",
            price: data.price || "",
            stock: data.stock || "",
            manufacturedDate: data.manufacturedDate?.split("T")[0] || "",
            expiryDate: data.expiryDate?.split("T")[0] || "",
            description: data.description || "",
            imageUrl: null, // Image file is not preloaded for security
          });
        })
        .catch((error) => {
          console.error("Error fetching pesticide data:", error);
          Swal.fire("Error", "Failed to load data.", "error");
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file" && files.length > 0) {
      setFormData((prevState) => ({ ...prevState, [id]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.manufacturedDate ||
      !formData.expiryDate
    ) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    if (
      formData.imageUrl instanceof File &&
      formData.imageUrl.size > 5 * 1024 * 1024
    ) {
      Swal.fire("Error", "File size should not exceed 5MB", "error");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("PesticideID", id || 0);
    formDataToSend.append("PesticidesName", formData.name);
    formDataToSend.append("Price", formData.price);
    formDataToSend.append("Stock", formData.stock);
    formDataToSend.append("ManufacturedDate", formData.manufacturedDate);
    formDataToSend.append("ExpiryDate", formData.expiryDate);
    formDataToSend.append("Description", formData.description);

    if (formData.imageUrl instanceof File) {
      formDataToSend.append("File", formData.imageUrl);
    }

    try {
      setIsLoading(true); // Start loading
      const response = await fetch(
        id
          ? `http://localhost:5045/api/Pesticide/${id}` // Update endpoint
          : "http://localhost:5045/api/Pesticide", // Add endpoint
        {
          method: id ? "PUT" : "POST",
          headers:{
            Authorization: `Bearer ${token}`,
          }, // Use PUT for edit and POST for add
          body: formDataToSend,
        }
      );

      const contentType = response.headers.get("Content-Type");
      if (!response.ok || !contentType?.includes("application/json")) {
        const errorText = await response.text();
        throw new Error(errorText || "An unexpected error occurred");
      }

      const result = await response.json();

      Swal.fire(
        "Success",
        id
          ? "Pesticide updated successfully!"
          : "Pesticide added successfully!",
        "success"
      );
      navigate("/admin/pesticides");
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire(
        "Error",
        error.message || "An unexpected error occurred",
        "error"
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleBack = () => {
    navigate("/admin/pesticides");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="get-in-touch">
      <h1 className="title">{id ? "Edit Pesticide" : "Add Pesticide"}</h1>
      <form
        className="contact-form row"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="name">
            Pesticide Name
          </label>
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
          <label className="label" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            className="input-text js-input"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            className="input-text js-input"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="manufacturedDate">
            Manufactured Date
          </label>
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
          <label className="label" htmlFor="expiryDate">
            Expiry Date
          </label>
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
          <label className="label" htmlFor="imageUrl">
            Image
          </label>
          <input
            id="imageUrl"
            className="input-text js-input"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-field col-lg-12">
          <label className="label" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            className="input-text js-input"
            type="text"
            value={formData.description}
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

export default PesticidesForm;
