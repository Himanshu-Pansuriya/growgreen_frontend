import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PesticidesForm.css";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Client/Components/LoadingSpinner/LoadingSpinner";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function PesticidesForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    manufacturedDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    description: "",
    imageUrl: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const token = getCurrenttoken();

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
            imageUrl: null,
          });
        })
        .catch((error) => {
          console.error("Error fetching pesticide data:", error);
          Swal.fire("Error", "Failed to load data.", "error");
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!formData.stock || formData.stock <= 0) {
      newErrors.stock = "Stock must be a positive number.";
    }

    if (new Date(formData.manufacturedDate) > new Date()) {
      newErrors.manufacturedDate = "Manufactured date cannot be in the future.";
    }

    if (
      formData.expiryDate &&
      new Date(formData.expiryDate) <= new Date(formData.manufacturedDate)
    ) {
      newErrors.expiryDate = "Expiry date must be after the manufactured date.";
    }

    if (
      formData.imageUrl instanceof File &&
      formData.imageUrl.size > 5 * 1024 * 1024
    ) {
      newErrors.imageUrl = "File size must not exceed 5MB.";
    }

    if (
      formData.imageUrl instanceof File &&
      !["image/jpeg", "image/png"].includes(formData.imageUrl.type)
    ) {
      newErrors.imageUrl = "Only JPEG and PNG images are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file" && files.length > 0) {
      const selectedFile = files[0];
      setFormData((prevState) => ({ ...prevState, [id]: selectedFile }));
  
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    } else {
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
    setErrors((prevState) => ({ ...prevState, [id]: "" })); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire("Error", "Please fix the errors in the form.", "error");
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
      setIsLoading(true);
      const response = await fetch(
        id
          ? `http://localhost:5045/api/Pesticide/${id}`
          : "http://localhost:5045/api/Pesticide",
        {
          method: id ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

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
      Swal.fire("Error", "An unexpected error occurred.", "error");
    } finally {
      setIsLoading(false);
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
          {errors.price && <p className="error-message text-danger">{errors.price}</p>}
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
          {errors.stock && <p className="error-message text-danger">{errors.stock}</p>}
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
          {errors.manufacturedDate && (
            <p className="error-message text-danger">{errors.manufacturedDate}</p>
          )}
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
          {errors.expiryDate && (
            <p className="error-message text-danger">{errors.expiryDate}</p>
          )}
        </div>

        <div className="form-field col-lg-4">
          <label className="label" htmlFor="imageFile">
            Image
          </label>
          <input
            id="imageFile"
            className="input-text js-input"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-field col-lg-2">   
        {previewImage && (
            <img
            src={previewImage}
            alt="Preview"
            className="image-preview"
            style={{ maxHeight: "80px", marginTop: "10px",maxWidth:"80px" }}
          />          
          )}
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
