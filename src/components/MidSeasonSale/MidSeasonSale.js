import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./midseasonsale.css";

import { Link, useParams } from "react-router-dom";
import {
  loadProductByCategoryApi,
  loadProductsByTag,
} from "../../api/commonApi";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

function MidSeasonSale({categoryName}) {
  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisible: false,
      partialVisibilityGutter: 0,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisible: true,
      partialVisibilityGutter: 60,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2.5,
      partialVisible: true,
      partialVisibilityGutter: 10,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  let { category } = useParams();
  let { tag } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) loadCategoryItems();
  }, [category]);

  const loadCategoryItems = async () => {
    let subCategory;
    if (category == "men") {
      subCategory = "jeans";
    } else if (category == "women") {
      subCategory = "tops";
    }
    setLoading(true);
    let data;
    if (tag) {
   
      data = await loadProductsByTag(category, tag, 5, "relevance", 0);
    } else {
      data = await loadProductByCategoryApi(
        category,
        subCategory,
        5,
        "relevance",
        0
      );
    }

    setProducts(data[0].data);

    setLoading(false);
  };

  //navigates to product detail page by making url friendly
  const goToProductDetailPage = (title, id, lineId) => {
    let slug = title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product/${slug}/${id}/${lineId}`);
  };
  return (
    <section className="women-fashion py-lg-5 pt-4">
      {!loading && products.length > 0 ? (
        <>
          <div className="bg-light-blue"></div>
          <div className="container-fluid">
            <div className="row">
              <div className="d-flex justify-content-between">
                <h5 className="fw-bold">{tag?tag:<>Mid season sale </>}</h5>
                <p className="fw-bold">
                <Link to={`/category/${categoryName}/mid-season-sale`} style={{color:"black"}}> <u>View All</u></Link> 
                </p>
              </div>
              <div className="row women" id="carousel-slide">
                <Carousel
                  infinite="true"
                  partialVisible={true}
                  interval={3000}
                  touch={true}
                  arrows={false}
                  responsive={responsive}
                  renderButtonGroupOutside={true}
                  swipeable={isMobile ? true : false}
                  draggable={isMobile ? true : false}
                  autoPlay={isMobile ? true : false}
                  autoPlaySpeed={2000}
                  containerClass="carousel-new"
                >
                  {products.length > 0 &&
                    products.map((item) => {
                      return (
                        <>
                          <div
                            className="cards overflow-hidden"
                            key={item.sku}
                            style={{ cursor: "pointer" }}
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
                                alt="Koovs product Front image"
                              />
                              {/* <img
                                src={headbandimg}
                                alt="Koovs rear product image"
                                className="rear-img"
                              /> */}
                              <p className="fw-bold">{item.brandName}</p>
                              <p>{item.productName}s</p>
                              <p>₹ {item.discountPrice}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </Carousel>
              </div>
            </div>
          </div>
          <br />
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

export default MidSeasonSale;
