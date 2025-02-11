import "./FAQsData.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function FAQsData() {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const token = getCurrenttoken();

  // Fetch FAQs from API when the component mounts
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/FAQ",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs data");
        }
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };
    fetchFAQs();
  }, []);

  // Delete a FAQ
  const handleDelete = async (faqid) => {
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
          const response = await fetch(`http://localhost:5045/api/FAQ/${faqid}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          });
          if (!response.ok) {
            throw new Error("Failed to delete FAQ");
          }
          setFaqs((faqs) => faqs.filter((faq) => faq.faqid !== faqid));
          Swal.fire("Deleted!", "FAQ has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  // Navigate to the Add FAQ form
  const handleAdd = () => {
    navigate("/admin/faqsform");
  };

  // Navigate to the Edit FAQ form
  const handleEdit = (faqid) => {
    navigate(`/admin/faqsform/${faqid}`);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter FAQs based on the search query
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ width: "80vw" }}>
      <h1 className="faqs-heading">FAQs</h1>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 d-flex">
            <div className="search d-flex w-100">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search FAQs"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-primary ms-2">Search</button>
            </div>
          </div>
          <div className="col-3">
            <Button
              type="button"
              className="btn btn-primary addbutton mt-3"
              onClick={handleAdd}
            >
              Add FAQ
            </Button>
          </div>
        </div>
      </div>

      <table className="table table-bordered custom-table">
        <thead className="table-header">
          <tr>
            <th scope="col">FAQ ID</th>
            <th scope="col">Question</th>
            <th scope="col">Answer</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <tr key={faq.faqid}>
                <td>{faq.faqid}</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td className="actions-cell">
                    <div className="button-container">
                  <Button
                    type="button"
                    className="mb-1"
                    size="sm"
                    onClick={() => handleEdit(faq.faqid)}
                  >
                    Edit
                  </Button>
                  {"  "}
                  <Button
                    type="button"
                    className="mb-1"
                    size="sm"
                    onClick={() => handleDelete(faq.faqid)}
                  >
                    Delete
                  </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No FAQs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FAQsData;
