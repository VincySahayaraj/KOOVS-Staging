import React, { useState } from "react";
import shoppingbag from "../../assets/images/Shopping-bag.png";
import "./maincategoryproductslider.css";
import AddToCart from "./AddToCart";
import productItem from "../../assets/images/shirts.png";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ShirtSection = ({
  products,
  loading,
  goToProductDetailPage,
  addToWishlist,
  removeWishlist,
  page,
  setPage,
  token,
  reloadRecaptcha,
}) => {
  const [cart, setCart] = useState(false);
  const wishlistProducts = useSelector((state) => state.wishlist.items);

  const paginateResult = () => {
    setPage(page + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={2} //This is important field to render the next data
        next={paginateResult}
        hasMore={true}
      >
        <div class="row image-color mt-3">
          {!loading &&
            products?.length > 0 &&
            products.map((item) => {
              return (
                <>
                  <div class="shirt-col col-xl-3  col-lg-3  col-sm-6  col-6">
                    {" "}
                    <div className="text-category">
                      <div className="favIcon me-2 ">
                        <label for="heart">
                          {wishlistProducts?.some(
                            (wishlistItem) => wishlistItem.id === item.id
                          ) == true ? (
                            <>
                              <i
                                class="fa fa-heart-o"
                                style={{ color: "red" }}
                                aria-hidden="true"
                                onClick={() =>
                                  removeWishlist(item.sku, item.lineId)
                                }
                              ></i>
                            </>
                          ) : (
                            <>
                              <i
                                class="fa fa-heart-o"
                                aria-hidden="true"
                                onClick={() =>
                                  addToWishlist(item, item.id, item.lineId)
                                }
                              ></i>
                            </>
                          )}
                        </label>
                      </div>
                      <div className="prod1">
                        <LazyLoadImage
                          effect="blur"
                          src={item.imageSmallUrl}
                          // src={productItem}
                          className="img-fluid"
                          alt="Koovs product Front image"
                          onClick={() =>
                            goToProductDetailPage(
                              item.productName,
                              item.id,
                              item.lineId
                            )
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <div className="shop-icon">
                          <img
                            src={shoppingbag}
                            onClick={() => setCart(item.id)}
                          />
                          {cart == item.id && (
                            <AddToCart
                              setCart={setCart}
                              item={item}
                              token={token}
                              reloadRecaptcha={reloadRecaptcha}
                            />
                          )}
                        </div>

                        <div className="preview-color">
                          <input className="blue" name="color" type="radio" />
                          <input className="yellow" name="color" type="radio" />
                          <input className="white" name="color" type="radio" />
                        </div>
                      </div>

                      <div className="product-description d-flex justify-content-between px-3">
                        <div className="prodDetail-text">
                          <p className="fw-bold">{item.brandName}</p>
                          <p>{item.productName}</p>
                        </div>
                        <div className="prodDetail-text">
                          <p>₹ {item.discountPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          {loading && <>Loading...</>}
          {/* <p className="viewall-text fw-bold d-sm-block d-lg-none">
          <u style={{ cursor: "pointer" }}>View All</u>
        </p> */}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default ShirtSection;
