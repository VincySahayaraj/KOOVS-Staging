import React from "react";
import { Carousel } from "react-bootstrap";
import womenbannerimg from "../../assets/images/womenbannerimg1.png";
import Womencarouselimg1 from "../../assets/images/WomenCarouselimg.png";
import "./womenbanner.css";
import LazyLoad from "react-lazy-load";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const WomenBanner = () => {
  return (
    <section className="men-banner">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <LazyLoad offsetTop={200}>
              <Carousel controls={true} interval={700}>
                <Carousel.Item>
                  <div className="carousel-heading">
                    <h4 className="fw-bold">New arrivals!</h4>
                    <p>Shop selected spring and summer styles</p>
                  </div>
                  <div className="Menbanner-Image">
                    <LazyLoadImage
                    effect="blur"
                      src={Womencarouselimg1}
                      className="w-100 img-fluid"
                      alt="DMG banner Image"
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="carousel-heading">
                    <h4 className="fw-bold">New arrivals!</h4>
                    <p>Shop selected spring and summer styles</p>
                  </div>
                  <div className="Menbanner-Image">
                    <LazyLoadImage
                    effect="blur"
                      src={Womencarouselimg1}
                      alt="Koovs banner Image"
                      className="w-100 img-fluid"
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="carousel-heading">
                    <h4 className="fw-bold">New arrivals!</h4>
                    <p>Shop selected spring and summer styles</p>
                  </div>
                  <div className="Menbanner-Image">
                    <LazyLoadImage
                    effect="blur"
                      src={Womencarouselimg1}
                      alt="Koovs banner Image"
                      className="w-100 img-fluid"
                    />
                  </div>
                </Carousel.Item>
              </Carousel>
            </LazyLoad>
          </div>
          <div className="col-12 col-lg-6  d-none d-lg-block">
            <div className="category-carousel">
              <div className="text-menbanner d-flex justify-content-between">
                <p>Influencer Collections</p>
                <p>
                  <u style={{ cursor: "pointer" }}>View All</u>
                </p>
              </div>
              <LazyLoadImage
              effect="blur"
                src={womenbannerimg}
                alt="Koovs banner Image"
                className="w-100 img-fluid"
              />
              <span className="centered">Jen Cellabos × KOOVS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenBanner;
