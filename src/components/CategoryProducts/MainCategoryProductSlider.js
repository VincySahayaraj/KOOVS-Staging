import React, { useEffect, useState } from "react";
import "./maincategoryproductslider.css";
import "react-multi-carousel/lib/styles.css";
import productItem from "../../assets/images/shirts.png";
import shoppingbag from "../../assets/images/Shopping-bag.png";
import filterIcon from "../../assets/images/filtericon.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./arrowandborder.css";
import { IoIosArrowDown } from "react-icons/io";
import { Range } from "react-range";
import ClipIcon from "../../assets/images/clipicon.png";
import AddToCart from "./AddToCart";
import ShirtSection from "./ShirtSection";

function MenCategoryProductSlider({
  products,
  filterTypes,
  result,
  changeSortOption,
  applyFilter,
  filterType,
  loading,
  setLoading,
  goToProductDetailPage,
  addToWishlist,
  removeWishlist,
  page,
  setPage,
  token,
  reloadRecaptcha,
  sortLabel,
}) {
  const [isActive, setActive] = useState(false);
  const [isShow, setShow] = useState(false);
  const [isSelect, setSelect] = useState(false);
  const [cart, setCart] = useState(false);
  const [val, setVal] = React.useState({ min: 0, max: 100 });
  const STEP = 1;
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 30,
  });
  // const MAX = 100;
  const [values, setValues] = React.useState([0, 30]);

  useEffect(() => {
    if (filterTypes) {
      console.log("filter typee", filterTypes);

      var filterItem = filterTypes.findIndex((item) => item.id === "price_fq");

      filterItem = filterTypes[filterItem];

      if (filterItem) {
        let len = filterItem.data.length;

        let getInitialRate = parseInt(getSecondPart(filterItem.data[0].id, 0));
        let getEndRate = parseInt(
          getSecondPart(filterItem.data[len - 1].id, 1)
        );
        setValues([getInitialRate, getEndRate]);
        setPriceRange({
          min: getInitialRate,
          max: getEndRate,
        });
      }
    }
  }, [filterTypes]);

  // to get string part after - hyphen
  function getSecondPart(str, index) {
    return str.split("-")[index];
  }

  return (
    <section className="Maincategory_product_slider">
      <div className="container-fluid">
        <div className="actions justify-content-between d-none d-lg-flex">
          <div
            className="d-flex filtertext-category"
            style={{ cursor: "pointer" }}
          >
            <p className="fw-bold"> Filter</p>
            <img src={filterIcon} onClick={() => setShow(!isShow)}></img>
            {isShow && (
              <div className="d-none d-lg-flex">
                {filterTypes?.length > 0 &&
                  filterTypes?.map((item) => {
                    return (
                      <>
                        {/* mapping based on Brand value */}

                        {item.id == "brand_fq" && (
                          <>
                            <Dropdown className="dropdown-text d-inline mx-2">
                              <Dropdown.Toggle id="dropdown-autoclose-true">
                                Brand
                                <IoIosArrowDown className="downarrowicon" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Header className="dropdown-header">
                                  Brand
                                </Dropdown.Header>
                                {item.data.map((subItem) => {
                                  return (
                                    <>
                                      <Dropdown.Item
                                        href="#"
                                        className="items"
                                        onClick={() =>
                                          applyFilter(item.id, subItem.id)
                                        }
                                      >
                                        {subItem.label}
                                        {filterType.brand_fq == subItem.id && (
                                          <i
                                            class="fa fa-check check-tick"
                                            aria-hidden="true"
                                          ></i>
                                        )}
                                      </Dropdown.Item>
                                    </>
                                  );
                                })}
                              </Dropdown.Menu>
                            </Dropdown>
                          </>
                        )}

                        {item.id == "color_fq" && (
                          <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle id="dropdown-autoclose-true">
                              Color <IoIosArrowDown className="downarrowicon" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {item.data.map((subItem) => {
                                return (
                                  <>
                                    <Dropdown.Item
                                      href="#"
                                      className="colors"
                                      onClick={() =>
                                        applyFilter(item.id, subItem.id)
                                      }
                                    >
                                      <span
                                        className="color-black"
                                        style={{
                                          backgroundColor: subItem.code,
                                        }}
                                      ></span>
                                      {filterType.color_fq == subItem.id && (
                                        <i
                                          class="fa fa-check check-tick"
                                          aria-hidden="true"
                                        ></i>
                                      )}
                                      <p>{subItem.label}</p>
                                    </Dropdown.Item>
                                  </>
                                );
                              })}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}

                        {item.id == "size_fq" && (
                          <>
                            <Dropdown className="d-inline mx-2">
                              <Dropdown.Toggle id="dropdown-autoclose-true">
                                Size{" "}
                                <IoIosArrowDown className="downarrowicon" />
                              </Dropdown.Toggle>

                              <Dropdown.Menu
                                className="size"
                                id="size-selector"
                              >
                                {item.data.map((subItem) => {
                                  return (
                                    <>
                                      <Dropdown.Item
                                        href="#"
                                        className="colors"
                                        onClick={() =>
                                          applyFilter(item.id, subItem.id)
                                        }
                                      >
                                        {filterType.size_fq == subItem.id && (
                                          <i
                                            class="fa fa-check check-tick"
                                            aria-hidden="true"
                                          ></i>
                                        )}
                                        <p style={{ padding: "0px" }}>
                                          {subItem.label}
                                        </p>
                                      </Dropdown.Item>
                                    </>
                                  );
                                })}
                              </Dropdown.Menu>
                            </Dropdown>
                          </>
                        )}

                        {/* showing the price range if */}
                        {item.id == "price_fq" && (
                          <>
                            <Dropdown className=" d-inline mx-2">
                              <Dropdown.Toggle id="dropdown-autoclose-true">
                                Price range{" "}
                                <IoIosArrowDown className="downarrowicon" />
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="priceRange">
                                <Dropdown.Item>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      marginTop: "1rem",
                                      marginBottom: "2rem",
                                      fontWeight: 500,
                                      fontSize: "12px",
                                      color: "#000",
                                    }}
                                  >
                                    <div>{`€${val.min}`}</div>
                                    <div>{`€${val.max}`}</div>
                                  </div>
                                  <Range
                                    values={values}
                                    step={STEP}
                                    min={priceRange.min}
                                    max={priceRange.max}
                                    onChange={(values) => {
                                      setValues(values);
                                    }}
                                    //apply filter
                                    onFinalChange={(values) => {
                                      applyFilter(item.id, values);
                                    }}
                                    renderTrack={({ props, children }) => (
                                      <div
                                        onMouseDown={props.onMouseDown}
                                        onTouchStart={props.onTouchStart}
                                        style={{
                                          ...props.style,
                                          height: "6px",
                                          border: "2px solid",
                                          display: "flex",
                                          width: "100%",
                                        }}
                                      >
                                        <div
                                          ref={props.ref}
                                          style={{
                                            height: "5px",
                                            width: "100%",
                                            borderRadius: "4px",
                                            alignSelf: "center",
                                          }}
                                        >
                                          {children}
                                        </div>
                                      </div>
                                    )}
                                    renderThumb={({ props, isDragged }) => (
                                      <div
                                        {...props}
                                        style={{
                                          ...props.style,
                                          height: "56px",
                                          width: "56px",
                                          borderRadius: "4px",
                                          background: `url(${ClipIcon})`,
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          backgroundSize: "contain",
                                        }}
                                      ></div>
                                    )}
                                  />
                                  <output
                                    style={{ marginTop: "30px" }}
                                    id="output"
                                  >
                                    {values[0].toFixed(1)} -{" "}
                                    {values[1].toFixed(1)}
                                  </output>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </>
                        )}
                      </>
                    );
                  })}
              </div>
            )}
          </div>
          <div>
            <p className="fw-bold d-sm-none d-lg-flex filtertext-category">
              Sort by:{" "}
              <u style={{ cursor: "pointer" }}>
                <p id="newcategory" onClick={() => setActive(!isActive)}>
                  {sortLabel}
                </p>
              </u>
            </p>
          </div>
        </div>
        {isActive && (
          <div className="d-none d-lg-flex listsorting">
            <ol className="justify p-3">
              {/* sort options based on backend api */}
              {result?.sortOptions?.data &&
                result?.sortOptions?.data.map((item) => {
                  return (
                    <>
                      <li
                        className="sort-list"
                        style={{ cursor: "pointer" }}
                        onClick={() => changeSortOption(item.id, item.label)&&setActive(!isActive)}
                      >
                        {item.label}
                      </li>
                    </>
                  );
                })}
            </ol>
          </div>
        )}

        <ShirtSection
          products={products}
          loading={loading}
          goToProductDetailPage={goToProductDetailPage}
          addToWishlist={addToWishlist}
          removeWishlist={removeWishlist}
          page={page}
          setPage={setPage}
          token={token}
          reloadRecaptcha={reloadRecaptcha}
        />

        <p className="viewall-text fw-bold d-sm-block d-lg-none">
          <u style={{ cursor: "pointer" }}>View All</u>
        </p>
      </div>
    </section>
  );
}

export default MenCategoryProductSlider;
