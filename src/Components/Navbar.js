import logo from "../img/logo.png";
function Navbar() {
  return (
    <>
      <div class="container-fluid bg-white sticky-top">
        <div class="container">
          <nav class="navbar navbar-expand-lg bg-navbar-light py-2 py-lg-0">
            <a href="index.html" className="navbar-brand">
              <img className="img-fluid" src={logo} alt="Logo" />
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
                <a href="index.html" class="nav-item nav-link active">
                  Home
                </a>
                <a href="about.html" class="nav-item nav-link">
                  About
                </a>
                <a href="product.html" class="nav-item nav-link">
                  Products
                </a>
                <a href="store.html" class="nav-item nav-link">
                  Store
                </a>
                <div class="nav-item dropdown">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div class="dropdown-menu bg-light rounded-0 m-0">
                    <a href="feature.html" class="dropdown-item">
                      Features
                    </a>
                    <a href="blog.html" class="dropdown-item">
                      Blog Article
                    </a>
                    <a href="testimonial.html" class="dropdown-item">
                      Testimonial
                    </a>
                    <a href="404.html" class="dropdown-item">
                      404 Page
                    </a>
                  </div>
                </div>
                <a href="contact.html" class="nav-item nav-link">
                  Contact
                </a>
              </div>
              <div class="border-start ps-4 d-none d-lg-block">
                <button type="button" class="btn btn-sm p-0">
                  <i class="fa fa-search"></i>
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
