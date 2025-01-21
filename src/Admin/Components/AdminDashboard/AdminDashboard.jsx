import React from "react";
import icon from '../../../assets/img/GrowGreen.png'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaSeedling, FaTractor, FaUserCircle } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import "./AdminDashboard.css"; 

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item text-center my-4">
                <img
                  className="img-fluid"
                  src={icon}
                  alt="Icon"
                  onClick={() => navigate("/admin")}
                  style={{ width: "100px", height: "100px" }}
                />
              </li>
              <li className="nav-item">
                <Link to="/admin/login" className="nav-link">
                  <FaSeedling className="mr-2" /> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/pesticides" className="nav-link">
                  <FaTractor className="mr-2" /> Pesticides
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/contact" className="nav-link">
                  <MdContacts className="mr-2" /> Contacts
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/crop" className="nav-link">
                  <FaUserCircle className="mr-2" /> Crop
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  <IoLogOut className="mr-2" /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
          
          <div className="dashboard-content">
            <div className="table-container">
              <Outlet /> 
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;