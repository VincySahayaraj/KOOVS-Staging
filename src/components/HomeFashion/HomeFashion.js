import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./homefashion.css";
import { loadProductByCategoryApi } from "../../api/commonApi";
import { Card, Placeholder } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function HomeFashion({ category, subCategory, title, link }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 0,
      slidesToSlide: 1, // optional, default to 1
      autoPlay: false,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 0,
      slidesToSlide: 2, // optional, default to 1.
      autoPlay: false,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      partialVisibilityGutter: 30,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const [menItems, setMenItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadWomenCategoryItems();
  }, [category, subCategory]);

  const loadWomenCategoryItems = async () => {
    setLoading(true);
    let size = 5,
      sort = "relevence",
      page = 0;
    let data = await loadProductByCategoryApi(
      category,
      subCategory,
      size,
      sort,
      page
    );
    setMenItems(data[0].data);
    setLoading(false);
  };

  //navigates to product detail page by making url friendly
  const goToProductDetailPage = (title, id, lineId) => {
    let slug = title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product/${slug}/${id}/${lineId}`);
  };

  const loadingPlaceholder = () => {
    return (
      <>
        <Carousel
          infinite={true}
          partialVisible={true}
          interval={3000}
          touch={true}
          arrows={false}
          responsive={responsive}
          renderButtonGroupOutside={true}
          swipeable={true}
          draggable={false}
          autoPlay={true}
          autoPlaySpeed={2000}
        >
          <Card style={{ width: "18rem", border: "none" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} className="image_placeholder">
                  &nbsp &nbsp &nbsp{" "}
                </Placeholder>
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={3} /> <br />
                <Placeholder xs={2} />
              </Placeholder>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", border: "none" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} className="image_placeholder">
                  &nbsp &nbsp &nbsp{" "}
                </Placeholder>
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={3} /> <br />
                <Placeholder xs={2} />
              </Placeholder>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", border: "none" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} className="image_placeholder">
                  &nbsp &nbsp &nbsp{" "}
                </Placeholder>
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={3} /> <br />
                <Placeholder xs={2} />
              </Placeholder>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", border: "none" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} className="image_placeholder">
                  &nbsp &nbsp &nbsp{" "}
                </Placeholder>
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={3} /> <br />
                <Placeholder xs={2} />
              </Placeholder>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", border: "none" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} className="image_placeholder">
                  &nbsp &nbsp &nbsp{" "}
                </Placeholder>
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={3} /> <br />
                <Placeholder xs={2} />
              </Placeholder>
            </Card.Body>
          </Card>
        </Carousel>
      </>
    );
  };

  return (
    <section className="men-fashion py-5">
      <div className="bg-light-blue"></div>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold">{title}</h5>
            <p className="fw-bold">
              <Link
                to={link}
                style={{ color: "black", textDecoration: "none" }}
              >
                {" "}
                <u>View All</u>
              </Link>
            </p>
          </div>
          <div className="row" id="carousel-slide">
            {loading && loadingPlaceholder()}
            <Carousel
              partialVisible={true}
              interval={3000}
              touch={true}
              arrows={false}
              responsive={responsive}
              renderButtonGroupOutside={true}
              swipeable={isMobile ? true : false}
              draggable={false}
              autoPlay={isMobile ? true : false}
              autoPlaySpeed={2000}
              infinite={true}
            >
              {menItems?.length > 0 &&
                menItems.map((item) => {
                  return (
                    <>
                      <div
                        className="cards overflow-hidden"
                        onClick={() =>
                          goToProductDetailPage(
                            item.productName,
                            item.id,
                            item.lineId
                          )
                        }
                      >
                        <div className="bg-grey">
                          <LazyLoadImage
                            src={item.imageSmallUrl}
                            className="img-fluid"
                            alt="Koovs product Front "
                            effect="blur"
                          />
                          <LazyLoadImage
                            src={item.imageSmallUrl}
                            className="img-fluid rear-img"
                            alt="Koovs rear product "
                            effect="blur"
                          />
                          <p className="fw-bold">{item.productName}</p>
                          <p>{item.brandName}</p>
                          <p>{item.price} €</p>
                        </div>
                      </div>
                    </>
                  );
                })}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeFashion;
