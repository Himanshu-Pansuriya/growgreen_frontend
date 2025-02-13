import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./CropsForm.css";
import { getCurrenttoken, getCurrentUserID } from "../LoginPage/LoginPage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function CropsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getCurrenttoken();

  const [formData, setFormData] = useState({
    cropName: "",
    farmerID: getCurrentUserID(),
    cropType: "",
    quantity: "",
    pricePer20KG: "",
    description: "",
    status: "Available",
    contactNo: "",
    address: "",
    imageFile: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:5045/api/Crop/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            cropName: data.cropName,
            cropType: data.cropType,
            quantity: data.quantity,
            pricePer20KG: data.pricePer20KG,
            description: data.description,
            status: data.status,
            contactNo: data.contactNo,
            address: data.address,
            imageFile: null,
          });
        })
        .catch((error) => {
          console.error("Error fetching crop data:", error);
          alert("Failed to load data");
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

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
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cropName.trim()) newErrors.cropName = "Crop Name is required.";
    if (!formData.cropType.trim()) newErrors.cropType = "Crop Type is required.";
    if (!formData.quantity || formData.quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0.";
    if (!formData.pricePer20KG || formData.pricePer20KG <= 0)
      newErrors.pricePer20KG = "Price must be greater than 0.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.contactNo.trim())
      newErrors.contactNo = "Contact Number is required.";
    if (!/^\d{10}$/.test(formData.contactNo))
      newErrors.contactNo = "Contact Number must be 10 digits.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("CropID", id || 0);
    formDataToSend.append("FarmerID", getCurrentUserID());
    formDataToSend.append("CropName", formData.cropName);
    formDataToSend.append("CropType", formData.cropType);
    formDataToSend.append("Quantity", formData.quantity);
    formDataToSend.append("PricePer20KG", formData.pricePer20KG);
    formDataToSend.append("Description", formData.description);
    formDataToSend.append("Status", formData.status);
    formDataToSend.append("ContactNo", formData.contactNo);
    formDataToSend.append("Address", formData.address);

    if (formData.imageFile) {
      formDataToSend.append("File", formData.imageFile);
    }

    try {
      const response = await fetch(
        id
          ? `http://localhost:5045/api/Crop/${id}`
          : "http://localhost:5045/api/Crop",
        {
          method: id ? "PUT" : "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire(
          "Error",
          `Failed to submit crop data: ${errorData.message || "Unknown error"}`,
          "error"
        );
        return;
      }
      Swal.fire(
        "Success",
        id ? "Crop updated successfully!" : "Crop added successfully!",
        "success"
      );
      navigate("/crop");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="get-in-touch">
      <h1 className="title">{id ? "Edit Crop" : "Add Crop"}</h1>
      <form
        className="contact-form row"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="cropName">
            Crop Name
          </label>
          <input
            id="cropName"
            className="input-text js-input"
            type="text"
            value={formData.cropName}
            onChange={handleChange}
          />
          {errors.cropName && <p className="error-message text-danger">{errors.cropName}</p>}
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="cropType">
            Crop Type
          </label>
          <input
            id="cropType"
            className="input-text js-input"
            type="text"
            value={formData.cropType}
            onChange={handleChange}
          />
          {errors.cropType && <p className="error-message text-danger">{errors.cropType}</p>}
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            className="input-text js-input"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
          />
          {errors.quantity && <p className="error-message text-danger">{errors.quantity}</p>}
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="pricePer20KG">
            Price per 20 KG
          </label>
          <input
            id="pricePer20KG"
            className="input-text js-input"
            type="number"
            value={formData.pricePer20KG}
            onChange={handleChange}
          />
          {errors.pricePer20KG && (
            <p className="error-message text-danger">{errors.pricePer20KG}</p>
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
          />
          {errors.description && (
            <p className="error-message text-danger">{errors.description}</p>
          )}
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="input-text js-input"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="form-field col-lg-6">
          <label className="label" htmlFor="contactNo">
            Contact Number
          </label>
          <input
            id="contactNo"
            className="input-text js-input"
            type="text"
            value={formData.contactNo}
            onChange={handleChange}
          />
          {errors.contactNo && (
            <p className="error-message text-danger">{errors.contactNo}</p>
          )}
        </div>
        <div className="form-field col-lg-12">
          <label className="label" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            className="input-text js-input"
            type="text"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error-message text-danger">{errors.address}</p>}
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
          <div className="row">
        <div className="form-field col-lg-6">
          <input className="submit-btn" type="submit" value="Submit" />
        </div>
        <div className="form-field col-lg-6">
          <input
            className="cancel-btn"
            onClick={() => {
              navigate("/crop");
            }}
            type="button"
            value="Back"
          />
        </div>
        </div>
      </form>
    </section>
  );
}

export default CropsForm;
