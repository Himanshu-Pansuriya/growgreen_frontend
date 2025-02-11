import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Crop/CropData.css";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function CropData() {
  const [crops, setCrops] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const token = getCurrenttoken(); // Replace with your actual token

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Crop", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch crops data");
        }
        const data = await response.json();
        setCrops(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchCrops();
  }, []);

  const handleDelete = async (cropID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5045/api/Crop/${cropID}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`, // Add token to header
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete crop");
          }
          setCrops((crops) => crops.filter((crop) => crop.cropID !== cropID));
          Swal.fire("Deleted!", "Crop has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCrops = crops.filter((crop) =>
    crop.cropName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ width: "80vw" }}>
      <h1 className="crops-heading">Crops</h1>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 d-flex">
            <div className="search d-flex w-100">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Find Crops"
                value={searchQuery} // Bind search query to input field
                onChange={handleSearchChange} // Update search query on change
              />
              <button className="btn btn-primary ms-2">Search</button>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered custom-table">
        <thead className="table-header">
          <tr>
            <th scope="col">Crop ID</th>
            <th scope="col">Farmer Name</th>
            <th scope="col">Crop Name</th>
            <th scope="col">Crop Type</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price/20KG</th>
            <th scope="col">Status</th>
            <th scope="col">Contact No</th>
            <th scope="col">Address</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <tr key={crop.cropID}>
                <td>{crop.cropID}</td>
                <td>{crop.userName}</td>
                <td>{crop.cropName}</td>
                <td>{crop.cropType}</td>
                <td>{crop.quantity} kgs</td>
                <td>₹{crop.pricePer20KG}</td>
                <td>{crop.status}</td>
                <td>{crop.contactNo}</td>
                <td>{crop.address}</td>
                <td>
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropName || "Crop"}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                No crops found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CropData;
