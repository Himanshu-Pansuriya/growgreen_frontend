import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "./Crops.css";
import "../Crop/MyCrops.css";
import { getCurrenttoken, getCurrentUserID } from "../LoginPage/LoginPage";
import { useNavigate } from "react-router-dom";

function MyCrops() {
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate();
  const token = getCurrenttoken();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Crop",
          {method:'GET',headers:{
            Authorization: `Bearer ${token}`,
          }}
        );
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

  const currentUserID = Number(getCurrentUserID());
  const filteredCrops = crops.filter((crop) => crop.farmerID === currentUserID);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5045/api/Crop/${id}`, {
            method: "DELETE",
            headers:{
              Authorization: `Bearer ${token}`,
            }
          });
          if (!response.ok) {
            throw new Error("Failed to delete the crop");
          }
          setCrops((prevCrops) => prevCrops.filter((crop) => crop.cropID !== id));
          Swal.fire("Deleted!", "The crop has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const handleEdit = (crop) => {
    navigate(`/cropsform/${crop.cropID}`, { state: { crop } });
  };

  return (
    <div className="container-xxl py-5">
      <h1 className="text-center heading col-7">
        <center>My Crops</center>
      </h1>
      <div className="row g-0 gx-5 align-items-end">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop, index) => (
            <div className="col-4" key={index}>
              <div className="card">
                <img
                  src={crop.imageUrl}
                  className="card-img-top img-fluid crops-img"
                  alt={crop.cropName || "Crop"}
                  style={{
                    objectFit: "contain",
                    height: "200px",
                    width: "100%",
                    marginTop: "10px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title-crop">
                    {crop.cropName}
                    {" ("}
                    {crop.cropType ? crop.cropType : ""}
                    {")"}
                  </h5>
                  <p className="card-text-price">Price: ₹{crop.pricePer20KG}</p>
                  <p className="text-danger quantity">{crop.quantity} kgs</p>
                  <div className="row mt-3">
                    <div className="col-6 d-flex justify-content-center">
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={() => handleEdit(crop)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <Button
                        variant="danger"
                        className="w-100"
                        onClick={() => handleDelete(crop.cropID)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <center>
            <div className="col-6">
              <div className="no-crops-box">
                <h2>No Crops Added</h2>
                <p>
                  You currently have no crops listed. Start adding crops to see
                  them here!
                </p>
                <Button onClick={() => navigate("/cropsform")}>
                  Add Crops Now
                </Button>
              </div>
            </div>
          </center>
        )}
      </div>
    </div>
  );
}

export default MyCrops;
