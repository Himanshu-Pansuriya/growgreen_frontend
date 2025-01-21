import "../Pesticides/PesticidesData.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PesticidesForm from "./PesticidesForm";

function PesticidesData() {
  const [pesticides, setPesticides] = useState([]);
  const navigate = useNavigate();
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
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete pesticide");
        }
        setPesticides((pesticides) => pesticides.filter((pesticide) => pesticide.pesticideID !== pesticideID));
        Swal.fire("Deleted!", "Pesticide has been deleted.", "success");
        } catch (error) {
        Swal.fire("Error", error.message, "error");
        }
      }
      });
    };

    fetchPesticides();
  }, []);
  function Form() {
    navigate("/admin/pesticidesform");
  }
  return (
    <div className="container">
      <h1 className="text-center">Pesticides</h1>
      <Button type="button" className="btn btn-primary" onClick={Form}>
        Add Pesticides
      </Button>
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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pesticides.map((pesticide) => (
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
                <Button
                  type="button"
                  className="btn btn-outline-success btn-xs"
                >
                  <i className="bi bi-pencil"></i> Edit
                </Button>
                {"  "}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(pesticide.pesticideID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PesticidesData;
