import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "./Pesticides.css"; // Import the CSS file

function Pesticides() {
  const [pesticides, setPesticides] = useState([]);

  useEffect(() => {
    const fetchPesticides = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Pesticide");
        if (!response.ok) {
          throw new Error("Failed to fetch pesticides data");
        }
        const data = await response.json();
        setPesticides(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchPesticides();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center">Pesticides</h1>
        <div className="row g-0 gx-5 align-items-end">
          {pesticides.length > 0 ? (
            pesticides.map((pesticide, index) => (
              <div className="col-4" key={index}>
                <div className="card">
                  <img
                    src={`http://localhost:5045${pesticide.imageUrl}`}
                    className="card-img-top"
                    alt={pesticide.pesticidesName || "Pesticide"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{pesticide.pesticidesName}</h5>
                    <p className="card-text">Price: {pesticide.price}</p>
                    <p className="card-text">Description: {pesticide.description}</p>
                    <Button variant="primary">Buy Now</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
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