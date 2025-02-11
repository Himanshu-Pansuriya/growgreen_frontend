import React from "react";
import icon from "../../../assets/img/GrowGreen.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  AiFillAppstore,
  AiFillDollarCircle,
  AiFillFileText,
  AiFillQuestionCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { GiFarmTractor, GiFruitBowl } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="container-fluid admin-dashboard">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 col-lg-3 bg-dark text-white sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item text-center my-4">
                <img
                  className="img-fluid dashboard-logo"
                  src={icon}
                  alt="Icon"
                  onClick={() => navigate("/admin")}
                  style={{ width: "130px", height: "130px", cursor: "pointer" }}
                />
              </li>

              <li className="nav-item">
                <Link to="/admin/login" className="nav-link text-white">
                  <FaUsers className="icon me-3" /> <span>Users</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/pesticides" className="nav-link text-white">
                  <GiFarmTractor className="icon me-3" /> <span>Pesticides</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/contact" className="nav-link text-white">
                  <FiPhoneCall className="icon me-3" /> <span>Contacts</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/crop" className="nav-link text-white">
                  <GiFruitBowl className="icon me-3" /> <span>Crops</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/blog" className="nav-link text-white">
                  <AiFillFileText className="icon me-3" /> <span>Blogs</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/faqs" className="nav-link text-white">
                  <AiFillQuestionCircle className="icon me-3" /> <span>FAQs</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/transactions" className="nav-link text-white">
                  <AiFillDollarCircle className="icon me-3" /> <span>Transactions</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={handleLogout} className="nav-link text-white">
                  <AiOutlineLogout className="icon me-3" /> <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main role="main" className="col-md-10 col-lg-9 ml-sm-auto px-4 main-content">
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
