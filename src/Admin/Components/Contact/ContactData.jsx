import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import "../Pesticides/PesticidesData.css"; // Using the same CSS file for consistent design.
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function ContactData() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const token = getCurrenttoken(); // Replace with your actual token

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Contact", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch contact data");
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchContacts();
  }, [token]);

  const handleDelete = async (contactID) => {
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
            `http://localhost:5045/api/Contact/${contactID}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`, // Add token to header
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete contact");
          }
          setContacts((contacts) =>
            contacts.filter((contact) => contact.contactID !== contactID)
          );
          Swal.fire("Deleted!", "Contact has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.mobileNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="container" style={{ width: "80vw" }}>
      <h1 className="pesticides-heading">Contacts</h1>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 d-flex">
            <div className="search d-flex w-100">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Find Contacts"
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
            <th scope="col">Contact ID</th>
            <th scope="col">User Name</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile No</th>
            <th scope="col">Email</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <tr key={contact.contactID}>
                <td>{contact.contactID}</td>
                <td>{contact.userName}</td>
                <td>{contact.name}</td>
                <td>{contact.mobileNo}</td>
                <td>{contact.email}</td>
                <td>{contact.description}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(contact.contactID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ContactData;
