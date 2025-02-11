import "./BlogData.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function BlogData() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // Track filter type (10, 20, or custom)
  const [customDate, setCustomDate] = useState(""); // Track custom date input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Blog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCurrenttoken()}`, // Add the token to the Authorization header
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch blogs data");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };
  
    fetchBlogs();
  }, []);
  

  const handleDelete = async (blogID) => {
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
            `http://localhost:5045/api/Blog/${blogID}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete blog");
          }
          setBlogs((blogs) => blogs.filter((blog) => blog.blogID !== blogID));
          Swal.fire("Deleted!", "Blog has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  function handleAdd() {
    navigate("/admin/blogform");
  }

  const handleEdit = (blogID) => {
    navigate(`/admin/blogform/${blogID}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredBlogs = blogs.filter((blog) => {
    const blogDate = new Date(blog.publishedDate);
    const today = new Date();
  
    // Normalize both dates without affecting time zones
    const diffTime = today.getTime() - blogDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 

    const matchesSearchQuery =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.detail.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesDateFilter =
      filter === "all" ||
      (filter === "5" && diffDays <= 5 && diffDays >= 0) ||
      (filter === "10" && diffDays <= 10 && diffDays >= 0) ||
      (filter === "custom" && customDate && blogDate >= new Date(customDate));
      
    return matchesSearchQuery && matchesDateFilter;
  });
  
  

  return (
    <div className="container" style={{ width: "80vw" }}>
      <h1 className="blogs-heading">Blogs</h1>
      <div className="container">
        <div className="d-flex align-items-start gap-3">
          {/* Search Bar */}
          <div className="d-flex search-blog">
            <div className="search w-100 align-items-center">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Find Blogs"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-primary ms-2">Search</button>
            </div>
          </div>

          {/* Filter Options */}
          <div className="d-flex align-items-center">
            <select
              className="form-select me-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="5">Last 5 days</option>
              <option value="10">Last 10 days</option>
              <option value="custom">From date</option>
            </select>
            {filter === "custom" && (
              <input
                type="date"
                className="form-control"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            )}
          </div>

          {/* Add Blog Button */}
          <div >
            <Button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              Add Blog
            </Button>
          </div>
        </div>
      </div>

      <table className="table table-bordered custom-table">
        <thead className="table-header">
          <tr>
            <th scope="col">Blog ID</th>
            <th scope="col">Admin Name</th>
            <th scope="col">Title</th>
            <th scope="col">Detail</th>
            <th scope="col">Published Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <tr key={blog.blogID}>
                <td>{blog.blogID}</td>
                <td>{blog.userName}</td>
                <td>{blog.title}</td>
                <td>{blog.detail}</td>
                <td>{new Date(blog.publishedDate).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <div className="button-container">
                    <Button
                      type="button"
                      className="mb-1"
                      size="sm"
                      onClick={() => handleEdit(blog.blogID)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="mb-1"
                      onClick={() => handleDelete(blog.blogID)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BlogData;
