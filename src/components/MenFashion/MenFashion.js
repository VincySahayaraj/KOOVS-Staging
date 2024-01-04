import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./menfashion.css";
import { loadProductByCategoryApi } from "../../api/commonApi";
import { Card, Placeholder } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MenFashion() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 0,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 0,
      slidesToSlide: 2, // optional, default to 1.
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
  }, []);

  const loadWomenCategoryItems = async () => {
    setLoading(true);
    let size=5,sort="relevence",page=0
    let data = await loadProductByCategoryApi("men","shirts",size,sort,page);
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
            <h5 className="fw-bold">Men</h5>
            <p className="fw-bold">
            <a>  <u>View All</u></a>
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
              swipeable={true}
              draggable={false}
              autoPlay={true}
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
                          <img
                            src={item.imageSmallUrl}
                            className="img-fluid"
                            alt="Koovs product Front "
                          />
                          <img
                            src={item.imageSmallUrl}
                            className="img-fluid rear-img"
                            alt="Koovs rear product "
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

export default MenFashion;
