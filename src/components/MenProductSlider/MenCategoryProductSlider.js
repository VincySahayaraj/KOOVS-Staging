import React, { useEffect, useState } from "react";
import "./categoryproductslider.css";
import "react-multi-carousel/lib/styles.css";
import productItem from "../../assets/images/shirts.png";
import shoppingbag from "../../assets/images/Shopping-bag.svg";
import { Link, useParams } from "react-router-dom";
import { loadProductByCategoryApi } from "../../api/commonApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function MenCategoryProductSlider({
  addToWishlist,
  removeWishlist,
  categoryName,
}) {
  const wishlistProducts = useSelector((state) => state.wishlist.items);
  let { category } = useParams();
  const navigate = useNavigate();

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
    let data = await loadProductByCategoryApi(
      category,
      subCategory,
      5,
      "latest",
      0
    );
    setProducts(data[0].data);

    setLoading(false);
  };

  //navigates to product detail page by making url friendly
  const goToProductDetailPage = (title, id, lineId) => {
    let slug = title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product/${slug}/${id}/${lineId}`);
  };
  return (
    <section className="category_product_slider">
      <div className="container-fluid">
        <div className="actions d-flex justify-content-between">
          <h5 className="fw-bold">New in </h5>
          <p className="fw-bold d-none d-lg-block">
            <Link
              to={`/category/${categoryName}/new-arrivals`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <u style={{ cursor: "pointer" }}>View All</u>
            </Link>
          </p>
        </div>

        <div class="row image-color">
          {products.length > 0 &&
            products.slice(0, 4).map((item) => {
              return (
                <>
                  <div class="shirt-col col-xl-3  col-lg-3  col-sm-6  col-6">
                    {" "}
                    <div className="text-category">
                      <div className="new">
                        <span>new in</span>
                      </div>
                      <div>
                        <div className="favIcon me-2">
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
                      </div>
                      <div>
                        {" "}
                        <LazyLoadImage
                          src={item.imageSmallUrl}
                          className="img-fluid"
                          alt="Koovs product Front image"
                          style={{ cursor: "pointer" }}
                          effect="blur"
                          onClick={() =>
                            goToProductDetailPage(
                              item.productName,
                              item.id,
                              item.lineId
                            )
                          }
                        />
                      </div>
                      <div className="shop-icon d-sm-block d-lg-none d-xl-none">
                        <LazyLoadImage src={shoppingbag} effect="blur" />
                      </div>
                      <div className="preview-color">
                        {item?.mainColor?.length > 0 &&
                          item.mainColor.map((color) => {
                            return (
                              <>
                                <input
                                  className="blue"
                                  name="color"
                                  style={{ background: color }}
                                  type="radio"
                                />
                              </>
                            );
                          })}
                      </div>
                      <div className="product-description d-flex justify-content-between px-3">
                        <div className="prodDetail-text">
                          <p className="fw-bold">{item.brandName}</p>
                          <p className="d-none">{item.productName}</p>
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

          <p className="viewall-text fw-bold d-sm-block d-lg-none">
            <u style={{ cursor: "pointer" }}>View All</u>
          </p>
        </div>
      </div>
    </section>
  );
}

export default MenCategoryProductSlider;
