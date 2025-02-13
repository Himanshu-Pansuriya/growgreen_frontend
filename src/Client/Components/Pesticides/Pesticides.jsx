import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Pesticides.css";
import { getCurrenttoken } from "../LoginPage/LoginPage";

function Pesticides() {
  const [pesticides, setPesticides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = getCurrenttoken();

  useEffect(() => {
    if (!token) {
      Swal.fire("Unauthorized", "Please log in to continue.", "warning");
      navigate("/login");
      return;
    }

    const fetchPesticides = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Pesticide", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch pesticides data");
        }
        const data = await response.json();
        setTimeout(() => {
          setPesticides(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        setLoading(false);
      }
    };

    fetchPesticides();
  }, [token, navigate]);

  const handleBuyNow = (id) => {
    navigate(`/pesticidesDescription/${id}`);
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center heading">Pesticides</h1>
        <div className="row g-0 gx-5 align-items-end">
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div className="col-4" key={index}>
                <div className="card">
                  <Skeleton height={200} />
                  <div className="card-body">
                    <h5 className="card-title">
                      <Skeleton width="60%" />
                    </h5>
                    <p className="card-text-price">
                      <Skeleton width="40%" />
                    </p>
                    <p className="card-text-description">
                      <Skeleton width="80%" />
                    </p>
                    <p className="text-danger">
                      <Skeleton width="50%" />
                    </p>
                    <Button variant="primary" disabled>
                      <Skeleton width="100%" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {!loading &&
            pesticides.length > 0 &&
            pesticides.map((pesticide, index) => (
              <div className="col-4 mt-3" key={index}>
                <div className="card">
                  <img
                    src={pesticide.imageUrl}
                    className="card-img-top img-fluid"
                    alt={pesticide.pesticidesName || "Pesticide"}
                    style={{ objectFit: "contain", height: "200px", width: "100%" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{pesticide.pesticidesName}</h5>
                    <p className="card-text-price">Price: ₹{pesticide.price}</p>
                    <p className="card-text-description">
                      Description: {pesticide.description}
                    </p>
                    <p className="text-danger">Only {pesticide.stock} are left</p>
                    <Button
                      variant="primary"
                      onClick={() => handleBuyNow(pesticide.pesticideID)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {!loading && pesticides.length === 0 && (
            <div className="col-12">
              <p>No pesticides available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pesticides;
