import React, { useEffect, useState } from "react";
import styles from "./searchproduct.module.css";
import searchItem2 from "../../assets/images/Searchjacket3.png";
import shoppingbag from "../../assets/images/Shopping-bag.png";
import { GrClose } from "react-icons/gr";
import { BsArrowUpLeft } from "react-icons/bs";
import {
  loadSearchProductResults,
  loadSearchSuggestions,
} from "../../api/commonApi";
import { useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SearchProduct = () => {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [page, setPage] = useState(0);

  // get the products on changing the query params
  useEffect(() => {
    let keyword = searchParams.get("s");
    setSearchKeyword(keyword);
    if (keyword) {
      loadSearchResultProducts(keyword);
    }
    setSuggestedKeywords([]);
  }, [searchParams]);

  // loads the search result products based on the query params
  const loadSearchResultProducts = async (keyword, isInfinityScroll) => {
    // loader will only show if the search is not from infinity scroll
    if (!isInfinityScroll) {
      setProductsLoading(true);
    }
    let data = await loadSearchProductResults(keyword, page);

    if (data?.data[0]?.data) {
      setSearchResult((previous) => [...previous, ...data?.data[0]?.data]);
    } else {
      setSearchResult([]);
    }
    setProductsLoading(false);
  };

  // load the search suggestion keywords
  const loadSearchSuggestion = async (e) => {
    let keyword = e.target.value;
    let data = await loadSearchSuggestions(keyword);
    if (data?.data[0].suggestionData) {
      setSuggestedKeywords(data?.data[0].suggestionData);
    } else {
      setSuggestedKeywords([]);
    }
  };

  const loadingProductPlaceholder = () => {
    let mapArray = [1, 2, 3, 4];
    return (
      <>
        <div className={styles.searchContent}>
          <div className={styles.text_search}>
            <p>Loading the best results for keyword “{searchKeyword}”:</p>
          </div>
          <div className={`${styles.image_color} row g-1`}></div>
        </div>
      </>
    );
  };

  //navigates to product detail page by making url friendly
  const goToProductDetailPage = (title, id, lineId) => {
    let slug = title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product/${slug}/${id}/${lineId}`);
  };

  const paginateResult = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (page) loadSearchResultProducts(searchKeyword, true);
  }, [page]);

  return (
    <>
      <section className={styles.search_products}>
        <div className={`${styles.search_function} d-lg-block d-none`}></div>

        <div className="d-flex" style={{ alignItems: "center" }}>
          <input
            type="text"
            className={` ${styles.type_text} d-lg-block d-none`}
            placeholder="Type to search"
            id={`${styles.type_text}  `}
            onChange={(e) => {
              loadSearchSuggestion(e);
            }}
          ></input>
          <GrClose
            className={`${styles.closeBtn}`}
            onClick={() => navigate(-1)}
          />
        </div>
        <div className={`${styles.search_box} d-lg-none d-block`}>
          <input
            type="search"
            id="searchProduct"
            name="searchProduct"
            placeholder="SEARCH"
            className={`mt-4 ${styles.btnStyle}`}
            onChange={(e) => {
              loadSearchSuggestion(e);
            }}
          />
        </div>

        {suggestedKeywords.length > 0 &&
          suggestedKeywords.map((item) => {
            return (
              <>
                <div
                  key={item.title}
                  className={` container-fluid  ${styles.search_suggestion}`}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      "/search?s=" + item.title,

                      { replace: true }
                    )
                  }
                >
                  <div className={` ${styles.prediction} `}>
                    <span>{item.title}</span>
                    <span>
                      <BsArrowUpLeft />{" "}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        {/* loading placeholder for product */}
        {productsLoading && loadingProductPlaceholder()}

        {!productsLoading && searchResult?.length > 0 && (
          <div className={styles.searchContent}>
            <div className={styles.text_search}>
              <p>
                The following products have been found matching your search “
                {searchKeyword}”:
              </p>
            </div>
            <InfiniteScroll
              dataLength={searchResult.length} //This is important field to render the next data
              next={paginateResult}
              hasMore={true}
            >
              <div className={`${styles.image_color} row g-1`}>
                {searchResult.length > 0 &&
                  searchResult.map((item) => {
                    return (
                      <>
                        <div
                          className={`${styles.shirt_col}  col-sm-6  col-6 col-lg-3  d-lg-block`}
                        >
                          {" "}
                          <div
                            className={styles.text_category}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              goToProductDetailPage(
                                item.productName,
                                item.id,
                                item.lineId
                              )
                            }
                          >
                            <div className={styles.new}>
                              <span>new in</span>
                            </div>
                            <div>
                              <div className={`${styles.favIcon} me-2`}>
                                <label for="heart">
                                  <i
                                    className="fa fa-heart-o"
                                    aria-hidden="true"
                                  ></i>
                                </label>
                              </div>
                            </div>
                            <div>
                              {" "}
                              <LazyLoadImage
                                src={item.imageSmallUrl}
                                className="img-fluid"
                                alt="Koovs product Front image"
                                effect="blur"
                              />
                            </div>
                            <div
                              className={`${styles.shop_icon} d-sm-block d-lg-none d-xl-none`}
                            >
                              <LazyLoadImage src={shoppingbag} effect="blur" />
                            </div>
                            <div className={`${styles.preview_color}`}>
                              <input
                                className={styles.darkblue}
                                name="color"
                                type="radio"
                              />
                              <input
                                className={styles.skyblue}
                                name="color"
                                type="radio"
                              />
                              <input
                                className={styles.blue}
                                name="color"
                                type="radio"
                              />
                              <input
                                className={styles.yellow}
                                name="color"
                                type="radio"
                              />
                              <input
                                className={styles.white}
                                name="color"
                                type="radio"
                              />
                            </div>
                            <div
                              className={`${styles.product_description} d-flex justify-content-between px-3`}
                            >
                              <div className={styles.prodDetail_text}>
                                <p className="fw-bold">{item.brandName}</p>
                                <p>{item.productName}t</p>
                              </div>
                              <div className={styles.prodDetail_text}>
                                <p>₹ {item.discountPrice}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}

                <div
                  className={` ${styles.shirt_col}   col-lg-3  d-sm-none`}
                ></div>
              </div>
            </InfiniteScroll>
          </div>
        )}
      </section>
    </>
  );
};

export default SearchProduct;
