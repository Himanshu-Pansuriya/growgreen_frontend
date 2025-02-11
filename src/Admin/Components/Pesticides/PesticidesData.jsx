import "../Pesticides/PesticidesData.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function PesticidesData() {
  const [pesticides, setPesticides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const token = getCurrenttoken();

  useEffect(() => {
    const fetchPesticides = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Pesticide",
          {
            method :'GET',
            headers :{
              Authorization: `Bearer ${token}`,
            }
          }
        );
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

  const handleDelete = async (pesticideID) => {
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
            `http://localhost:5045/api/Pesticide/${pesticideID}`,
            {
              method: "DELETE",
              headers:{
                Authorization: `Bearer ${token}`,
              }
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete pesticide");
          }
          setPesticides((pesticides) =>
            pesticides.filter(
              (pesticide) => pesticide.pesticideID !== pesticideID
            )
          );
          Swal.fire("Deleted!", "Pesticide has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  function Form() {
    navigate("/admin/pesticidesform");
  }
  const handleEdit = (pesticideID) => {
    navigate(`/admin/pesticidesform/${pesticideID}`);
    
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPesticides = pesticides.filter((pesticide) =>
    pesticide.pesticidesName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ width: "80vw" }}>
      <h1 class="pesticides-heading">Pesticides</h1> 
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 d-flex">
            <div className="search d-flex w-100">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Find Pesticides"
                value={searchQuery} // Bind search query to input field
                onChange={handleSearchChange} // Update search query on change
              />
              <button className="btn btn-primary ms-2">Search</button>
            </div>
          </div>
          <div className="col-3">
            <Button
              type="button"
              className="btn btn-primary addbutton mt-3"
              onClick={Form}
            >
              Add Pesticides
            </Button>
          </div>
        </div>
      </div>

      <table className="table table-bordered custom-table">
        <thead className="table-header">
          <tr>
            <th scope="col">Pesticide ID</th>
            <th scope="col">Pesticide Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Stock</th>
            <th scope="col">Manufactured Date</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPesticides.length > 0 ? (
            filteredPesticides.map((pesticide) => (
              <tr key={pesticide.pesticideID}>
                <td>{pesticide.pesticideID}</td>
                <td>{pesticide.pesticidesName}</td>
                <td>{pesticide.price}</td>
                <td>{pesticide.description}</td>
                <td>{pesticide.stock}</td>
                <td>
                  {new Date(pesticide.manufacturedDate).toLocaleDateString()}
                </td>
                <td>{new Date(pesticide.expiryDate).toLocaleDateString()}</td>
                <td>
                  <img
                    src={pesticide.imageUrl}
                    alt={pesticide.pesticidesName || "Crop"}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </td>
                <td className="actions-cell">
                  <div className="button-container">
                  <Button
                    onClick={() => handleEdit(pesticide.pesticideID)}
                  >
                    Edit
                  </Button>
                  {"  "}
                  <Button
                    onClick={() => handleDelete(pesticide.pesticideID)}
                  >
                    Delete
                  </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No pesticides found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PesticidesData;
