import React, { useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import koovslogo from "../../assets/images/KoovsLogo.png";
import koovsicon from "../../assets/images/Icon.png";
import { loadHeaderCategory } from "../../api/commonApi";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cartData = useSelector((state) => state.cart.items);

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadHeaderItems();
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    document.getElementById("menu-toggle").checked = false;
  }, [pathname]);

  const loadHeaderItems = async () => {
    setLoading(true);
    let data = await loadHeaderCategory();
    setMenu(data);
    setLoading(false);
  };

  const toggleMainMenus = (e) => {
    let viewportWidth = window.innerWidth;
    if (viewportWidth < 767) {
      e.target.classList.toggle("open-main");
    }
  };

  const toggleSubClass = (e) => {
    e.target.classList.toggle("open-sub");
  };

  const loadingPlaceholder = () => {
    let temp = [1, 2, 3, 4, 5];
    return (
      <>
        {temp.map((count) => {
          return (
            <>
              <li className="main-menu" key={count}>
                <ul className="nav-menu">
                  <li
                    className="nav-main-menu w-100"
                    onClick={(e) => this.toggleMainMenus(e)}
                  >
                    {" "}
                    <Skeleton count={10} />
                    <ul>
                      <li>
                        <Card style={{ width: "14rem", border: "none" }}></Card>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </>
          );
        })}
      </>
    );
  };

  const logoutUser = () => {
    dispatch({
      type: "USER_LOGOUT",
      payload: null,
    });
    toast.success("successfully logged Out");
    document.getElementById("menu-toggle").checked = false;
    navigate("/");
  };

  return (
    <header>
      <div className="top-nav">
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button" id="clickClose"></div>
        </label>
        <ul className="menu">
          <li className="main-menu d-lg-none">
            <button className="btn btn-outline-dark rounded-0 px-5 mx-auto">
              SEARCH
            </button>
          </li>
          {loading && loadingPlaceholder()}

          {menu?.length > 0 &&
            menu.map((mainMenu) => {
              return (
                <>
                  <li className="main-menu" key={mainMenu}>
                    <ul className="nav-menu">
                      <li
                        className="nav-main-menu w-100"
                        onClick={(e) => toggleMainMenus(e)}
                      >
                        {mainMenu.title}
                        <ul>
                          {mainMenu?.children.length > 0 &&
                            mainMenu.children.map((subMenu) => {
                              return (
                                <>
                                  {subMenu.action === "DROP_DOWN" ? (
                                    <>
                                      {" "}
                                      <li
                                        className="nav-sub-menu"
                                        key={subMenu}
                                        onClick={(e) => toggleSubClass(e)}
                                      >
                                        {subMenu.title}
                                        <ul>
                                          {subMenu?.children?.length > 0 &&
                                            subMenu.children.map(
                                              (subMenuChild) => {
                                                return (
                                                  <>
                                                    <li key={subMenuChild}>
                                                      <Link
                                                        className="nav-link"
                                                        to={
                                                          subMenuChild.links[0]
                                                            .href
                                                        }
                                                      >
                                                        {subMenuChild.title}
                                                      </Link>
                                                    </li>
                                                  </>
                                                );
                                              }
                                            )}
                                        </ul>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <li key={subMenu}>
                                        {" "}
                                        <Link
                                          className="nav-link"
                                          to={subMenu.links[0].href}
                                        >
                                          {subMenu.title ===
                                          "NEW ARRIVALS:FOOTWEAR & ACCESSORIES" ? (
                                            <>NEW ARRIVAL:FOOTWEAR</>
                                          ) : (
                                            <>{subMenu.title}</>
                                          )}
                                        </Link>
                                      </li>
                                    </>
                                  )}
                                </>
                              );
                            })}
                        </ul>
                      </li>
                    </ul>
                  </li>
                </>
              );
            })}
          <li className="main-menu">
            <ul>
              {!user?.isLoggedIn ? (
                <>
                  <li>
                    {" "}
                    <Link className="nav-link" to="/signup/register">
                      Log in / create account{" "}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    {" "}
                    <Link className="nav-link" to="/user/account">
                      My Account
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link className="nav-link" to="/">
                  Online support{" "}
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/">
                  Footwear
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" to="/">
                  <u>Shipping to Denmark</u>
                </Link>
              </li>
              {user?.isLoggedIn && (
                <li
                  onClick={() => {
                    logoutUser();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <u>Logout</u>
                </li>
              )}
            </ul>
          </li>
        </ul>
        <div className="nav-brand">
          <Link to="/">
            <img src={koovslogo} alt="Koovs Logo" />
          </Link>
        </div>
        <div className="d-flex align-items-center gap-4">
          <Link to="/search">
            <img
              src={koovsicon}
              height="23"
              alt="Koovs Search icon"
              className="d-none d-lg-block"
            />
          </Link>
          <div>
            {user.isLoggedIn ? (
              <Link className="nav-link d-none d-lg-block" to="/user/account">
                Account{" "}
              </Link>
            ) : (
              <Link className="nav-link d-none d-lg-block" to="/signup/login">
                Login
              </Link>
            )}
          </div>
          <div>
            <Link className="nav-link" to="/cart">
              Cart ({cartData?.length > 0 ? cartData.length : 0})
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
