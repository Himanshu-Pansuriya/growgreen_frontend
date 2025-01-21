import carousel1 from "../../assets/img/Carousel1.jpeg"
import carousel2 from "../../assets/img/Carousel2.jpeg"
import about1 from "../../assets/img/about-1.jpg"
import about2 from "../../assets/img/about-2.jpg"
import about3 from "../../assets/img/about-3.jpg"
import about4 from "../../assets/img/about-4.jpg"
import about5 from "../../assets/img/about-5.jpg"
import about6 from "../../assets/img/about-6.jpg"
import testemonial1 from"../../assets/img/testimonial-1.jpg"
import testemonial2 from"../../assets/img/testimonial-2.jpg"
import testemonial3 from"../../assets/img/testimonial-3.jpg"
import Footer from "../Footer/Footer"

function HomePage() {
  return (
  <>
        {/* <!-- Carousel Start --> */}
    <div class="container-fluid px-0 mb-5">
        <div id="header-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item ">
                    <img class="w-100" src={carousel1} alt="Image"/>
                    <div class="carousel-caption">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-7 text-center">
                                    <p class="fs-4 text-white animated zoomIn">Welcome to <strong class="text-dark">TEA House</strong></p>
                                    <h1 class="display-1 text-dark mb-4 animated zoomIn">Organic & Quality Tea Production</h1>
                                    <a href="" class="btn btn-light rounded-pill py-3 px-5 animated zoomIn">Explore More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item active" >
                    <img class="w-100" src={carousel2} alt="Image"/>
                    <div class="carousel-caption">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-7 text-center">
                                    <p class="fs-4 text-white animated zoomIn">Welcome to <strong class="text-dark">TEA House</strong></p>
                                    <h1 class="display-1 text-dark mb-4 animated zoomIn">Organic & Quality Tea Production</h1>
                                    <a href="" class="btn btn-light rounded-pill py-3 px-5 animated zoomIn">Explore More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    {/* <!-- Carousel End --> */}

    <Footer/>

  </>
  );
}

export default HomePage;
