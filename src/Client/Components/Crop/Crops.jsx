import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaCartArrowDown } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Crops.css";
import { useNavigate } from "react-router-dom";
import { getCurrenttoken } from "../LoginPage/LoginPage";

function CropsPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = getCurrenttoken();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Crop", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch crops data");
        }
        const data = await response.json();

        // Artificial delay to show skeleton for at least 1 second
        setTimeout(() => {
          setCrops(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  function myCropsNavigate() {
    navigate("/mycrops");
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row">
          <h1 className="text-center heading col-7">
            <center>Crops</center>
          </h1>
          <div className="col-3 text-end">
            <Button onClick={myCropsNavigate}>My Crops</Button>
          </div>
          <div
            className="col-2 text-end"
            onClick={() => navigate("/cropsform")}
          >
            <Button>Add Crops</Button>
          </div>
        </div>
        <div className="row g-0 gx-5 align-items-end">
          {loading ? (
            // Skeleton loader while data is being fetched
            Array.from({ length: 6 }).map((_, index) => (
              <div className="col-4 mt-3" key={index}>
                <div className="card">
                  <Skeleton
                    height={200}
                    style={{ marginBottom: "10px" }}
                    className="skeleton-img"
                  />
                  <div className="card-body">
                    <h5 className="card-title-crop">
                      <Skeleton width="60%" />
                    </h5>
                    <p className="card-text-price">
                      <Skeleton width="40%" />
                    </p>
                    <p className="text-danger quantity">
                      <Skeleton width="30%" />
                    </p>
                    <div className="status">
                      <Skeleton width="80%" />
                    </div>
                    <Button variant="primary" disabled>
                      <Skeleton width="100%" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : crops.length > 0 ? (
            crops.map((crop, index) => {
              return (
                <div className="col-4 mt-3" key={index}>
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
                      <p className="card-text-price">
                        Price: ₹{crop.pricePer20KG}
                      </p>
                      <p className="text-danger quantity">
                        {crop.quantity} kgs
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => {
                          Swal.fire({
                            titleText: `Contact: ${crop.contactNo} \nAddress: ${crop.address}`,
                          });
                        }}
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <div className="no-crops-box">
                <h2>No Crops Added</h2>
                <p>
                  You currently have no crops listed. Start adding crops to see
                  them here!
                </p>
                <Button onClick={() => navigate("/addcrops")}>
                  Add Crops Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropsPage;
