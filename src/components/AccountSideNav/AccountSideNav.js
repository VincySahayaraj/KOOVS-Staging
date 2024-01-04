import React from "react";
import { Link } from "react-router-dom";
import "./accountsidenav.css";
const AccountSideNav = ({ children, index }) => {
  return (
    <>
      <section className=" container-fluid account-section d-flex">
        <div className="account-actions col-3 pt-4">
          <h4>Account</h4>

          <div className="account-nav ">
            <div className=" d-flex flex-column pt-3">
              <Link
                to="/signup/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <span className={`${index == 1 && "active"}`}>
                  Sign In / Register
                </span>
              </Link>
              <span className={`${index == 2 && "active"}`}>
                Orders and Returns
              </span>
              <Link
                to="/user/account"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <span className={`${index == 3 && "active"}`}>
                  My Information
                </span>
              </Link>
              <Link
                to="/wishlist"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <span className={`${index == 4 && "active"}`}>Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col ">{children}</div>
      </section>
    </>
  );
};

export default AccountSideNav;
