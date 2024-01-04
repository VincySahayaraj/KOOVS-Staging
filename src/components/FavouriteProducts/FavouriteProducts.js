import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./favouriteproducts.css";
import headbandimg from "../../assets/images/headband.png";
import shopimg from "../../assets/images/Shopping-bag.png";
import { Link, useNavigate } from "react-router-dom";
import {
  getProductByBatchIdAPI,
  similiarProductAPI,
} from "../../api/commonApi";
import { addToWishlistAPI, removeItemFromWishList } from "../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const FavouriteProducts = ({ skuId, reCaptcha, reloadRecaptcha }) => {
  const wishlistProducts = useSelector((state) => state.wishlist.items);
  const [similiarProductSize, setSimiliarProductSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [productDetail, setProductDetail] = useState(null);

  const dispatch = useDispatch();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 0,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      dots: true,
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 60,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      dots: true,
      breakpoint: { max: 464, min: 0 },
      items: 3,
      partialVisibilityGutter: 15,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const navigate = useNavigate();

  const [similiarProducts, setSimiliarProducts] = useState([]);
  useEffect(() => {
    if (skuId) loadSuggestedProducts();
  }, [skuId]);

  const loadSuggestedProducts = async () => {
    let data = await similiarProductAPI(skuId);
    setSimiliarProducts(data?.data);
  };
  //navigates to product detail page by making url friendly
  const goToProductDetailPage = (title, id, lineId) => {
    let slug = title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product/${slug}/${id}/${lineId}`);
  };

  // add product to wish list
  const addToWishlist = async (product, productId, lineId) => {
    console.log("product,", product, "id", productId, "lineid", lineId);
    let prodDetails = {
      product: { skuId: product.sku },
      productId: productId,
      lineId: lineId,
      reCaptcha: reCaptcha,
    };

    // add to wishlist api
    let data = await addToWishlistAPI(prodDetails);
    if (data) {
      let obj = {
        lineId: lineId,
        sku: prodDetails.product.skuId,
        id: prodDetails.productId,
      };
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: obj,
      });
    }
    reloadRecaptcha();
  };

  const removeFromWishlist = async (skuId, lineId) => {
    await removeItemFromWishList(skuId, lineId);
    let obj = {
      skuId: skuId,
      lineId: lineId,
    };
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: obj,
    });
  };

  // set the size of the selected product
  const selectSize = (id) => {
    setSelectedSize(id);
  };

  // size returning for shop the outfit section//

  useEffect(() => {
    console.log("similiear produts", similiarProducts);
    loadSimiarProductSize();
  }, [similiarProducts]);

  const loadSimiarProductSize = async () => {
    let result = [];
    for (let i = 0; i < 2; i++) {
      let { data } = await getProductByBatchIdAPI(similiarProducts[0].sku);

      result.push(data[0]);
    }
    console.log("data on api result", result);
    setSimiliarProductSize(result);
  };

  return (
    <section className="favourite-products py-lg-5">
      {similiarProducts.length !== 0 && (
        <>
          <div className="container-fluid">
            <div className="row pb-4 pb-lg-0">
              <div className="col-12 col-lg-6">
                <h5 className="fw-bold pb-4 pt-4 pt-lg-0">
                  Shop the whole outfit{" "}
                </h5>
                <div>
                  {similiarProducts.slice(0, 2).map((data, index) => {
                    return (
                      <>
                        <div className="product-outfit d-flex gap-lg-4 gap-2 mb-3">
                          <div
                            onClick={() =>
                              goToProductDetailPage(
                                data.productName,
                                data.id,
                                data.lineId
                              )
                            }
                          >
                            <LazyLoadImage
                              effect="blur"
                              src={data.imageSmallUrl}
                              className="img-fluid proimage"
                              alt="Koovs "
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-between">
                            <div
                              className="fw-bold"
                              onClick={() =>
                                goToProductDetailPage(
                                  data.productName,
                                  data.id,
                                  data.lineId
                                )
                              }
                            >
                              <p className="mb-0">{data.brandName}</p>
                              <p className="mb-0">{data.productName}</p>
                              <div>₹ {data.discountPrice}</div>
                            </div>
                            <div>
                              <div className="preview-color pb-0 pb-lg-2">
                                {data.mainColor.map((color) => {
                                  return (
                                    <>
                                      <input
                                        className="blue"
                                        style={{ background: color }}
                                        name="color"
                                        type="radio"
                                      />
                                    </>
                                  );
                                })}
                              </div>
                              <div className="preview-size">
                                <ul className="d-flex align-items-center">
                                  {similiarProductSize?.length > 0 &&
                                    similiarProductSize[
                                      index
                                    ]?.attributes?.sizes.map((size) => {
                                      return (
                                        <>
                                          <li
                                            className={`${
                                              size.isOutOfStock && "no-stock"
                                            } ${
                                              selectedSize == size.id &&
                                              "list-active"
                                            }`}
                                            onClick={() =>
                                              !size.isOutOfStock &&
                                              selectSize(size.id)
                                            }
                                          >
                                            {" "}
                                            {size.code}
                                          </li>
                                        </>
                                      );
                                    })}

                                  {/* <li>S</li>
                                  <li className="no-stock">M</li>
                                  <li>L</li>
                                  <li>XL</li>
                                  <li>XXL</li> */}
                                </ul>
                                <LazyLoadImage
                                  effect="blur"
                                  src={shopimg}
                                  className="img-fluid "
                                  alt="Koovs "
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="col-12 col-lg-6 d-none d-lg-block">
                <h5 className="fw-bold pb-4">You might also like</h5>
                <div className="row">
                  {similiarProducts.slice(2, 4).map((data) => {
                    return (
                      <>
                        <div className="col-12 col-lg-6">
                          <div className="position-relative">
                            <LazyLoadImage
                              effect="blur"
                              src={data.imageSmallUrl}
                              className="img-fluid proimage"
                              alt="Koovs "
                              onClick={() =>
                                goToProductDetailPage(
                                  data.productName,
                                  data.id,
                                  data.lineId
                                )
                              }
                            />
                            <div className="heart-cart">
                              <div className="favIcon me-2">
                                <label for="heart1">
                                  {wishlistProducts.some(
                                    (wishlistItem) =>
                                      wishlistItem.id === data.id
                                  ) == true ? (
                                    <i
                                      style={{ color: "red" }}
                                      class="fa fa-heart-o"
                                      aria-hidden="true"
                                      onClick={() =>
                                        removeFromWishlist(
                                          data.sku,
                                          data.lineId
                                        )
                                      }
                                    ></i>
                                  ) : (
                                    <>
                                      <i
                                        class="fa fa-heart-o"
                                        aria-hidden="true"
                                        onClick={() =>
                                          addToWishlist(
                                            data,
                                            data.id,
                                            data.lineId
                                          )
                                        }
                                      ></i>
                                    </>
                                  )}
                                </label>
                              </div>
                              <div className="d-flex flex-column align-items-end">
                                <LazyLoadImage
                                  effect="blur"
                                  src={shopimg}
                                  className="img-fluid m-2"
                                  alt="Koovs "
                                />
                                <div className="preview-color">
                                  {data.mainColor.map((color) => {
                                    return (
                                      <>
                                        <input
                                          className="blue"
                                          style={{ background: color }}
                                          name="color"
                                          type="radio"
                                        />
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="product-name d-flex align-items-center fw-bold p-3"
                            onClick={() =>
                              goToProductDetailPage(
                                data.productName,
                                data.id,
                                data.lineId
                              )
                            }
                          >
                            <div className="flex-grow-1 product_meta">
                              <p className="mb-0">{data.brandName}</p>
                              <p className="mb-0">{data.productName}</p>
                            </div>
                            <div>₹ {data.discountPrice}</div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="row d-lg-none bg-green pt-3">
              <div className="d-flex justify-content-between">
                <h5 className="fw-bold"></h5>
              </div>
              <div className="row pe-0" id="carousel-slide">
                <Carousel
                  infinite="true"
                  showDots
                  partialVisible={true}
                  interval={3000}
                  touch={true}
                  dots={true}
                  arrows={false}
                  responsive={responsive}
                  renderButtonGroupOutside={true}
                  swipeable={true}
                  draggable={false}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                >
                  {similiarProducts.slice(2).map((data, index) => {
                    return (
                      <>
                        <div className="cards overflow-hidden">
                          <Link to="/productdetail">
                            <div className="bg-grey">
                              <LazyLoadImage
                                effect="blur"
                                src={data.imageSmallUrl}
                                className="img-fluid proimage mob-prodImage"
                                alt="Koovs "
                              />
                              {/* <img
                                src={headbandimg}
                                className='img-fluid '
                                alt='Koovs rear product '
                              /> */}
                              <p className="fw-bold">{data.brandName}</p>
                              <p className="mb-0">{data.productName}</p>
                              <p>₹ {data.discountPrice}</p>
                            </div>
                          </Link>
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
      )}
    </section>
  );
};

export default FavouriteProducts;
