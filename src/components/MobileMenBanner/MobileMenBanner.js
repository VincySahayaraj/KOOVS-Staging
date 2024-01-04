import React from "react";
import "./mobilemenbanner.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import menbannerimg from "../../assets/images/menbannerimg.png";
import MenBannerimg1 from "../../assets/images/MenBannerimg1.png";

function mobilemenbanner() {
  {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 0,
        slidesToSlide: 1, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1.5,
        partialVisibilityGutter: 60,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 100,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
    return (
      <section className="stories pb-5 d-block d-lg-none">
        <div className="container-fluid">
          <div className="row g-lg-1">
            <div className="stylestories">
              <h5 className="fw-bold d-sm-block d-lg-none d-md-none mb-0 ">
                Influencer Collaboration
              </h5>
              <p className="d-sm-block d-lg-none d-md-none mb-0">
                <u>View All</u>
              </p>
            </div>
            <div
              className="row stories d-sm-block d-lg-none d-md-none"
              id="carousel-slide"
            >
              <Carousel
                infinite="true"
                partialVisible={true}
                interval={1000}
                touch={true}
                arrows={false}
                responsive={responsive}
                renderButtonGroupOutside={true}
                swipeable={true}
                draggable={false}
                autoPlay={true}
                autoPlaySpeed={3000}
              >
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img
                      src={MenBannerimg1}
                      className="img-fluid"
                      alt="Koovs image"
                    />
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img
                      src={menbannerimg}
                      className="img-fluid"
                      alt="Koovs image"
                    />
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img
                      src={MenBannerimg1}
                      className="img-fluid"
                      alt="Koovs image"
                    />
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img
                      src={MenBannerimg1}
                      className="img-fluid"
                      alt="Koovs image"
                    />
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img
                      src={MenBannerimg1}
                      className="img-fluid"
                      alt="Koovs image"
                    />
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img
                      src={MenBannerimg1}
                      className="img-fluid"
                      alt="Koovs image"
                    />
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default mobilemenbanner;
