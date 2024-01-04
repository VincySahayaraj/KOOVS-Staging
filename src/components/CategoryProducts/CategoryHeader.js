import React, { useState } from "react";
import styles from "./categoryheader.module.css";
import filterIcon from "../../assets/images/filtericon.png";
import { AiOutlinePlus } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import { Breadcrumb } from "react-bootstrap";

function CategoryHeader({ category, subcategory, result,changeSortOption}) {
  const [isActive, setActive] = useState(false);
  const [isView, setView] = useState(false);
  const [filter, setFilter] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 30,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 60,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      partialVisibilityGutter: 140,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <section tabIndex={0} className={styles.maincategory_products}>
        <div
          className={`${styles.maincategory_function} d-lg-block d-none`}
        ></div>

        <div className="container-fluid px-0 b-bottom">
          <div className="row mt-3">
            <Breadcrumb>
              <Breadcrumb.Item href="/">
                {" "}
                <span style={{ textDecoration: "none", color: "black" }}>
                  Home
                </span>{" "}
              </Breadcrumb.Item>
              <Breadcrumb.Item href={`/category/`}>
                <Link
                  to={`/category/${category}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <span style={{ textDecoration: "none", color: "black" }}>
                    {category}
                  </span>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item href={`/category/`}>
                <Link
                  to={window.location.pathname}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span style={{ textDecoration: "none", color: "black" }}>
                    {subcategory}
                  </span>{" "}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <div className={`${styles.category_box} d-lg-none d-flex`}>
          {/* <Link className="filter" to="/filter">   */}
          <img
            src={filterIcon}
            className={styles.filtermaincategory}
            onClick={() => setFilter(!filter)}
          ></img>

          {filter && <CategoryFilter setFilter={setFilter} />}
          <input
            type="text"
            id="maincategoryProduct"
            name="maincategoryProduct"
            placeholder="T-SHIRTS,TOPS,SHIRTS"
            className={`mt-4 ${styles.categorybtnStyle}`}
          />
          <span
            className={styles.plusicon}
            onClick={() => setActive(!isActive)}
          >
            <AiOutlinePlus />
          </span>
        </div>

        {isActive && (
          <div className={`${styles.listsortingmobile} d-flex d-lg-none`}>
            <ol className="justify p-3">
              {result?.sortOptions?.data &&
                result?.sortOptions?.data.map((item) => {
                  return (
                    <>
                      <li className={styles.list_sortmobile} onClick={()=>changeSortOption(item.id)&&setActive(false)}>{item.label}</li>
                    </>
                  );
                })}
            </ol>
          </div>
        )}

        <div
          className={`${styles.mobile_view}  ${
            isView
              ? styles.text_maincategorymobile_auto
              : styles.text_maincategorymobile_less
          }`}
        >
          <div className={`${styles.text_maincategorymobile}  justify`}>
            <p
              className={`${
                isView
                  ? styles.text_maincategorymobile_expand
                  : styles.text_maincategorymobile_min
              }`}
              style={{
                WebkitBoxOrient: "vertical",
                WebkitOverflow: "hidden",
              }}
            >
              Super-versatile and forver on-trend, the humle shirt lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud. Consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostru.Ut enim ad minim veniam, quis nostru.
            </p>
          </div>

          <section
            className={`${styles.slider_viewcategory} d-block d-lg-none py-3`}
          >
            <div className={`container ${styles.slider_viewcategory}`}>
              <div className="row">
                <div className={styles.category_sliderbox}>
                  {/* <Carousel interval={3000} touch={true} arrows={false} responsive={responsive} renderButtonGroupOutside={true} swipeable={true} draggable={false} autoPlay={true}
                                        autoPlaySpeed={2000}> */}
                  <div className={`mx-2 ${styles.ctgry_item}`}>
                    <div
                      className={`  ${styles.category_mobilesliderbtn} bg-white p-2 border border-dark text-center`}
                    >
                      Denim shirts
                    </div>
                  </div>
                  <div className={`mx-2 ${styles.ctgry_item}`}>
                    <div
                      className={`  ${styles.category_mobilesliderbtn} bg-white p-2 border border-dark text-center`}
                    >
                      Printed
                    </div>
                  </div>
                  <div className={`mx-2 ${styles.ctgry_item}`}>
                    <div
                      className={`  ${styles.category_mobilesliderbtn} bg-white p-2 border border-dark text-center`}
                    >
                      Plain Shirts
                    </div>
                  </div>
                  <div className={`mx-2 ${styles.ctgry_item}`}>
                    <div
                      className={`  ${styles.category_mobilesliderbtn} bg-white p-2 border border-dark text-center`}
                    >
                      striped shirts
                    </div>
                  </div>
                  {/* </Carousel> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <p className="fw-bold d-flex d-lg-none justify-content-center">
        <u
          onClick={() => setView(!isView)}
          style={{
            cursor: "pointer",
            paddingTop: "7px",
          }}
        >
          View {isView ? "less" : "more"}
        </u>
      </p>
    </>
  );
}

export default CategoryHeader;
