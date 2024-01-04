import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./productdescription.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { getProductByBatchIdAPI } from "../../api/commonApi";
import { Link } from "react-router-dom";
import {
  addToCartAPI,
  addToWishlistAPI,
  getWishlistItems,
  removeItemFromWishList,
} from "../../api/cart";

const ProductDescription = ({ productData, reCaptcha, reLoadCaptchaKey }) => {
  const wishlistProducts = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    setProductDetail(productData[0]?.data[0]);
    setLoading(false);
  }, [productData]);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState(false);
  // set the size of the selected product
  const selectSize = (id) => {
    setError(false);
    setBtnLoading(true);

    if (!selectedColor) {
      setSelectedColor(productDetail.attributes?.colors[0].id);
    }

    setSelectedSize(id);
    setAddedToCart(false);
    setBtnLoading(false);
  };

  //  set the color of the selected product
  const selectColor = async (id) => {
    setError(false);

    setLoading(true);
    let mapping = productDetail?.mapping?.data;
    setSelectedColor(id);

    var batchSkuId = mapping.filter(function (item) {
      return item.colorId == id;
    });

    let { data } = await getProductByBatchIdAPI(batchSkuId[0].skuId);

    setProductDetail(data[0]);
    setAddedToCart(false);

    setLoading(false);
  };

  // add to cart functionality

  const addProductToCart = async (product) => {
    setBtnLoading(true);
    // checking if product has only one color then keeps the product's default color to selected

    if (selectedSize && selectedColor) {
      // mapping the SKUID of product that corresponding to color and size id.
      const result = await productDetail.mapping.data.filter(getSkuId);

      function getSkuId(obj) {
        return obj.colorId == selectedColor && obj.sizeId == selectedSize;
      }
      let skuId = result[0].skuId;
      let prodDetails = await productDetail.quantity.data.filter(
        getProudctBySkuId
      );
      function getProudctBySkuId(obj) {
        return obj.skuId == skuId;
      }

      prodDetails = {
        product: prodDetails[0],
        reCaptcha: reCaptcha,
      };

      // add to cart api
      let data = await addToCartAPI(prodDetails);
      if (data) {
        let cart = {
          product: { sku: prodDetails.product.skuId },
          qty: 1,
          vendor: prodDetails.product.feDetails.vendor,
          warehouse: prodDetails.product.feDetails.warehouse,
          lot: prodDetails.product.feDetails.lot,
        };

        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        }); // increase the cart count.
        setAddedToCart(true);
      }
    } else {
      setError("Please select color and size of product");
    }

    reLoadCaptchaKey();
    setBtnLoading(false);
  };

  // add product to wish list
  const addToWishlist = async (product) => {
    // checking if product has only one color then keeps the product's default color to selected

    if (selectedSize && selectedColor) {
      // mapping the SKUID of product that corresponding to color and size id.
      const result = await productDetail.mapping.data.filter(getSkuId);

      function getSkuId(obj) {
        return obj.colorId == selectedColor && obj.sizeId == selectedSize;
      }
      let skuId = result[0].skuId;
      let prodDetails = await productDetail.quantity.data.filter(
        getProudctBySkuId
      );
      function getProudctBySkuId(obj) {
        return obj.skuId == skuId;
      }

      prodDetails = {
        product: prodDetails[0],
        productId: productDetail.product.id,
        lineId: productDetail.product.lineId,
        reCaptcha: reCaptcha,
      };

      // add to wishlist api
      let data = await addToWishlistAPI(prodDetails);
      // add to wishlist state dispatch
      if (data) {
        let obj = {
          lineId: prodDetails.lineId,
          sku: prodDetails.product.skuId,
          id: prodDetails.productId,
        };
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: obj,
        }); // increase the wishlist count.
      }
    } else {
      setError("Please select color and size of product");
    }

    reLoadCaptchaKey();
  };

  const removeWishlist = async (skuId, lineId) => {
    await removeItemFromWishList(skuId, lineId);
    let result = await getWishlistItems();
    dispatch({
      type: "INITIALIZE_WISHLIST",
      payload: result.data,
    });
  };

  return (
    <section className="product-detail">
      {productDetail != null && !loading ? (
        <>
          <div className="container-fluid px-0 b-bottom">
            <div className="row mt-3">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
                <Breadcrumb.Item
                  href={`/category/${productDetail.product.gender}`}
                >
                  <Link to={`/category/${productDetail.product.gender}`}>
                    {" "}
                    {productDetail.product.gender}{" "}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  href={`/category/${productDetail.product.gender}/${productDetail.product.masterCategoryName[0]}`}
                >
                  <Link
                    to={`/category/${productDetail.product.gender}/${productDetail.product.masterCategoryName[0]}`}
                  >
                    {" "}
                    {productDetail.product.masterCategoryName[0]}{" "}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item href={window.location.pathname}>
                  <Link to={window.location.pathname}>
                    {" "}
                    {productDetail.product.productName}{" "}
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="container-fluid ImageDesc">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="float-start w-75 me-2 mt-3 position-relative">
                  <div className="favIcon me-2 d-lg-block d-none">
                    <label for="heart">
                      {/* check if item is already added to wishlist */}
                      {wishlistProducts.some(
                        (wishlistItem) =>
                          wishlistItem.id === productDetail.product.id
                      ) == true ? (
                        <>
                          <i
                            style={{ color: "red" }}
                            class="fa fa-heart-o"
                            aria-hidden="true"
                            onClick={() =>
                              removeWishlist(
                                productDetail?.product.sku,
                                productDetail.product.lineId
                              )
                            }
                          ></i>
                        </>
                      ) : (
                        <>
                          <i
                            class="fa fa-heart-o"
                            aria-hidden="true"
                            onClick={() =>
                              addToWishlist(productDetail?.product)
                            }
                          ></i>
                        </>
                      )}
                    </label>
                  </div>
                  <Slider
                    asNavFor={nav2}
                    ref={(slider1) => setNav1(slider1)}
                    arrows={true}
                    fade={true}
                  >
                    {productDetail.product.imageUrls?.map((img) => {
                      return (
                        <>
                          <div>
                            <img
                              src={img}
                              className="img-fluid w-100 "
                              alt="Koovs"
                            />
                          </div>
                        </>
                      );
                    })}
                  </Slider>
                </div>
                <div className="slideshow-gallery mt-2">
                  <Slider
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    vertical={true}
                  >
                    {productDetail.product.imageUrls?.map((img) => {
                      return (
                        <>
                          <div>
                            <img src={img} className="img-fluid" alt="Koovs " />
                          </div>
                        </>
                      );
                    })}
                  </Slider>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="w-75 mx-auto d-table pt-lg-5 pt-3">
                  <div className="product-name d-flex align-items-center fw-bold">
                    <div className="favIcon me-2 position-relative me-4 d-lg-none">
                      {/* <input type="checkbox" id="heart3" /> */}
                      <label for="heart3">
                        {/* check if item is already added to wishlist */}
                        {wishlistProducts.some(
                          (wishlistItem) =>
                            wishlistItem.id === productDetail.product.id
                        ) == true ? (
                          <>
                            <i
                              style={{ color: "red" }}
                              class="fa fa-heart-o"
                              aria-hidden="true"
                              onClick={() =>
                                removeWishlist(
                                  productDetail?.product.sku,
                                  productDetail.product.lineId
                                )
                              }
                            ></i>
                          </>
                        ) : (
                          <>
                            <i
                              class="fa fa-heart-o"
                              aria-hidden="true"
                              onClick={() =>
                                addToWishlist(productDetail?.product)
                              }
                            ></i>
                          </>
                        )}

                        {/* <i
                          class="fa fa-heart-o"
                          aria-hidden="true"
                          onClick={() => addToWishlist(productDetail?.product)}
                        ></i> */}
                      </label>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">{productDetail.product.brandName}</p>
                      <p className="mb-0">{productDetail.product.commodity}</p>
                    </div>
                    <div>₹ {productDetail.product.discountPrice}</div>
                  </div>
                  <br />
                  <div className="d-flex align-items-center py-lg-4 py-0">
                    <div className="w-25">COLOR</div>
                    <div className="preview-color">
                      {/* color mapping from api */}

                      <>
                        {productDetail.attributes?.colors.map((color) => {
                          return (
                            <>
                              <input
                                className="blue multiColor"
                                style={{ background: color.code }}
                                name="color"
                                type="radio"
                                onChange={() => selectColor(color.id)}
                                defaultChecked={
                                  productDetail?.product?.colorCode ==
                                    color.code && true
                                }
                              />
                            </>
                          );
                        })}
                      </>
                    </div>
                  </div>
                  <div className="d-flex align-items-center pb-lg-4 pb-0">
                    <div className="w-25">SIZE</div>
                    <div className="preview-size">
                      <ul className="d-flex align-items-center">
                        {/* size mapping from API  */}
                        {productDetail.attributes?.sizes.map((size) => {
                          return (
                            <>
                              <li
                                className={`${
                                  size.isOutOfStock && "no-stock"
                                } ${selectedSize == size.id && "list-active"}`}
                                onClick={() =>
                                  !size.isOutOfStock && selectSize(size.id)
                                }
                              >
                                {size.code}
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {error && <div style={{ color: "red" }}>*{error}</div>}
                  <br />

                  {btnLoading ? (
                    <>
                      <button className="btn w-100 btn-dark rounded-0">
                        PLEASE WAIT...
                      </button>
                    </>
                  ) : (
                    <>
                      {addedToCart ? (
                        <button className="btn w-100 btn-dark rounded-0">
                          ADDED TO CART
                        </button>
                      ) : (
                        <button
                          className="btn w-100 btn-dark rounded-0"
                          onClick={() =>
                            addProductToCart(productDetail?.product)
                          }
                        >
                          ADD TO CART
                        </button>
                      )}
                    </>
                  )}

                  <div className="product-desc pt-5">
                    <div className="product-spec-mobile">
                      <h5>DESCRIPTION</h5>
                      <p className="p-desc">
                        {productDetail.product.brandDescription}{" "}
                      </p>
                    </div>
                    <div className="product-spec-mobile">
                      <h5 className="pt-lg-3 ">DETAILS</h5>
                      <div
                        className="productSpec"
                        dangerouslySetInnerHTML={{
                          __html: productDetail.product.productDescription,
                        }}
                      />
                    </div>
                    <div className="product-spec-mobile">
                      <h5 className="pt-lg-3">SIZE AND FIT</h5>

                      {/* <div dangerouslySetInnerHTML={{
                          __html: productDetail.product.styletipSizeFit
                        }}> </div> */}
                    </div>
                    <h6 className="pt-4">
                      <a
                        onClick={() =>
                          window.open(
                            productDetail?.product?.sizeGuideUrl[0]?.href,
                            "Koovs Size Chart",
                            "height=560,width=500"
                          )
                        }
                      >
                        {" "}
                        <u>FIND YOUR SIZE</u>
                      </a>
                    </h6>

                    <div className="product-spec-mobile">
                      <h5 className="pt-lg-5 pt-lg-3">SHIPPING AND RETURN</h5>
                      <ul>
                        <li>{productDetail.product.deliveryText}</li>
                      </ul>
                    </div>
                    <h6 className="pt-lg-4 pt-lg-3">
                      <u>MORE INFORMATION</u>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div>
            <div class="skeleton-uuypnq47b80"></div>{" "}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDescription;
