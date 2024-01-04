import React from "react";
import "./branditems.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import sneakersimg from "../../assets/images/sneakers.png";
class BrandItems extends React.Component {
  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 30,
        slidesToSlide: 1, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
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
      <section className="BrandItem py-1 d-block d-lg-none">
        <div className="container px-0">
          <div className="row g-1">
            <div className="row" id="carousel-slide">
              <Carousel
                infinite={true}
                partialVisible={true}
                interval={2000}
                touch={true}
                arrows={false}
                responsive={responsive}
                renderButtonGroupOutside={true}
                swipeable={true}
                draggable={false}
                autoPlay={true}
                autoPlaySpeed={2000}
              >
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img src={sneakersimg} className="img-fluid" alt="Koovs " />
                    <p>Sneakers</p>
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img src={sneakersimg} className="img-fluid" alt="Koovs " />
                    <p>PULL & BEAR</p>
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img src={sneakersimg} className="img-fluid" alt="Koovs " />
                    <p>COSMETICS</p>
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <img src={sneakersimg} className="img-fluid" alt="Koovs " />
                    <p>SANDALS</p>
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

export default BrandItems;
