import { Link } from "react-router-dom";
import logo from "../../assets/img/GrowGreen.png"
function Navbar() {
  return (
    <>
      <div class="container-fluid bg-white sticky-top">
        <div class="container">
          <nav class="navbar navbar-expand-lg bg-navbar-light py-2 py-lg-0">
            <a href="index.html" className="navbar-brand">
              <img className="img-fluid" src={logo} alt="Logo" style={{borderRadius : "0px 0px 30px 30px"}}/>
            </a>
            <button
              type="button"
              class="navbar-toggler ms-auto me-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav ms-auto">
                <Link to={"/home"} class="nav-item nav-link active">
                  Home
                </Link>
                <Link to={"/about"} class="nav-item nav-link">
                  About
                </Link>
                <Link to={"/pesticides"} class="nav-item nav-link">
                  Pesticides
                </Link>
                <Link to={"/home"} class="nav-item nav-link">
                  Home
                </Link>
                <div class="nav-item dropdown">
                  <Link
                    class="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </Link>
                  <div class="dropdown-menu bg-light rounded-0 m-0">
                    <Link to={"/home"} class="dropdown-item">
                      Features
                    </Link>
                    <Link to={"/home"} class="dropdown-item">
                      Features
                    </Link>
                    <Link to={"/home"} class="dropdown-item">
                      Features
                    </Link>
                    <Link to={"/home"} class="dropdown-item">
                      Features
                    </Link>
                  </div>
                </div>
                <Link to={"/home"} class="nav-item nav-link">
                  Home
                </Link>
              </div>
              <div class="border-start ps-4 d-none d-lg-block">
                <button type="button" class="btn btn-sm p-0">
                  <i class="fa fa-login"></i>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Navbar;
