import { data, Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getCurrentUsername } from "../LoginPage/LoginPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import "../Navbar/Navbar.css";

function Navbar() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = getCurrentUsername();
    setUserName(username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <>
      <div className="container-fluid bg-white sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light py-2 py-lg-0">
            <a className="navbar-brand">
              <img
              onClick={()=>{navigate("/home")}}
                className="img-fluid"
                src="https://res.cloudinary.com/himanshuhp/image/upload/v1738031516/GrowGreen_u9atih.png"
                alt="Logo"
                style={{ borderRadius: "0px 0px 30px 30px" }}
              />
            </a>
            <button
              type="button"
              className="navbar-toggler ms-auto me-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto">
                <Link to={"/home"} className="nav-item nav-link active">
                  Home
                </Link>
                <Link to={"/about"} className="nav-item nav-link">
                  About
                </Link>
                <Link to={"/pesticides"} className="nav-item nav-link">
                  Pesticides
                </Link>
                <Link to={"/crop"} className="nav-item nav-link">
                  Crop
                </Link>
                <Link to={"/contact"} className="nav-item nav-link">
                  Contact
                </Link>
                <Link to={"/blog"} className="nav-item nav-link">
                  Blogs
                </Link>
                <Link to={"/faqs"} className="nav-item nav-link">
                  FAQs
                </Link>
              </div>
              <div className="d-flex align-items-center me-lg-3 profile">
                <div className="">
                  <FontAwesomeIcon className="me-1" icon={faUser} />
                  {userName}
                </div>

                <div>
                  <FontAwesomeIcon
                    className="ms-3 logoutbutton"
                    onClick={handleLogout}
                    icon={faSignOutAlt}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Navbar;
