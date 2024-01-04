import React from "react";
import "./stories.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import storiesimg from "../../assets/images/Screenshot.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

class Stories extends React.Component {
  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 0,
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
      <section className="stories pb-5">
        <div className="container-fluid">
          <div className="row g-lg-1">
            <div className="stylestories">
              <h5 className="fw-bold">Style stories</h5>
              <p className="d-none d-lg-block">
                Get inspired by our latest campaigns
              </p>
              <p className="d-block d-lg-none mb-0">
                <a>
                  <u>View All</u>
                </a>
              </p>
            </div>
            <div className="row" id="carousel-slide">
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
                    <LazyLoadImage src={storiesimg} className="img-fluid" alt="Koovs " effect="blur" />
                    <p className="fw-bold">Back to the 00’s</p>
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <LazyLoadImage src={storiesimg} className="img-fluid" alt="Koovs " effect="blur"/>
                    <p className="fw-bold">Back to the 00’s</p>
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <LazyLoadImage src={storiesimg} className="img-fluid" alt="Koovs " effect="blur"/>
                    <p className="fw-bold">Back to the 00’s</p>
                  </div>
                </div>
                <div className="cards overflow-hidden">
                  <div className="img-content">
                    <LazyLoadImage src={storiesimg} className="img-fluid" alt="Koovs " effect="blur"/>
                    <p className="fw-bold">Back to the 00’s</p>
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

export default Stories;
