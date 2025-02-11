import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./CropsForm.css";
import { getCurrenttoken, getCurrentUserID } from "../LoginPage/LoginPage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function CropsForm() {
  const { id } = useParams(); // Extract the id from the route
  const navigate = useNavigate(); // For navigation after success
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

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data for editing if id exists
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:5045/api/Crop/${id}`,{method:'GET',headers:{Authorization: `Bearer ${token}`,}})
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
            imageFile: null, // Image file is not preloaded for security
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
      setFormData((prevState) => ({ ...prevState, [id]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          ? `http://localhost:5045/api/Crop/${id}` // Update endpoint
          : "http://localhost:5045/api/Crop", // Add endpoint
        {
          method: id ? "PUT" : "POST",
          headers:{
            Authorization: `Bearer ${token}`,
          },// Use PUT for edit and POST for add
          body: formDataToSend
        }
      );
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        
        Swal.fire("Error", `Failed to submit crop data: ${errorData.message || "Unknown error"}`, "error");
        return;
      }      
      if (response.ok) {
        console.log(response);
        if (id) {
          Swal.fire("Success", "Crop updated successfully!", "success");
        } else {
          Swal.fire("Success", "Crop added successfully!", "success");
        }
        navigate("/crop");
      } else {
        Swal.fire("Error", "Failed to submit crop data", "error");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>
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
            required
          />
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
            required
          />
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
            required
          />
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
            required
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
            required
          />
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
            required
          />
        </div>
        <div className="form-field col-lg-12">
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
        <div className="form-field col-lg-6">
          <input className="submit-btn" type="submit" value="Submit" />
        </div>
        <div className="form-field col-lg-6">
          <input className="cancel-btn" onClick={()=>{navigate("/crop")}} type="button" value="Back" />
        </div>
      </form>
    </section>
  );
}

export default CropsForm;
