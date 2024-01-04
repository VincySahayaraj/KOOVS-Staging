import React, { useEffect, useState } from "react";
import "./myaccount.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteAddressApi, updateProfileApi } from "../../api/account";
const MyAccount = ({ shippingAddress,loadMyAddress }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    if (user.user) {
      setValues({
        email: user.user.email,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        phone: user.user.phone,
        gender: user.user.gender,
      });
    }
  }, [user]);

  // For changing login values
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const updateAccountInfo = async (e) => {
    e.preventDefault();

    let result = await updateProfileApi(values);
    if (result)
      dispatch({
        type: "USER_UPDATE",
        payload: result.data,
      });
  };

  const removeAddress = async (id) => {
    let consent=window.confirm("Are you sure to delete this address?")
    if(!consent) return;
    let status = await deleteAddressApi(id);
  };

  return (
    <>
      <section className="myaccount row">
        <div className="myaccount-form col-xs-12 col-sm-12 col-md-9 col-lg-9 pt-4">
          <div className="form">
            <form className="pt-3 " onSubmit={updateAccountInfo}>
              <div class="form-group ">
                <h6 className="pt-2">Email Address</h6>

                <input
                  type="email"
                  class="form-control"
                  required
                  defaultValue={values?.email}
                  disabled
                  placeholder="Email Address"
                />
              </div>
              <h6 className="pt-2">First Name</h6>
              <div class="form-group pt-3 ">
                <input
                  required
                  defaultValue={values?.firstName}
                  onChange={handleChange("firstName")}
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>
              <h6 className="pt-2">Last Name</h6>
              <div class="form-group pt-3 ">
                <input
                  type="text"
                  onChange={handleChange("lastName")}
                  defaultValue={values?.lastName}
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>

              <h6 className="pt-2">Phone Number</h6>
              <div className="  pt-3">
                <div class="form-group ">
                  <input
                    required
                    type="number"
                    // min={10}
                    // max={10}
                    onChange={handleChange("phone")}
                    defaultValue={values?.phone}
                    class="form-control "
                    placeholder="Phone Number"
                  />
                </div>
                {/* <button
                  type="submit"
                  className="btn btn-dark rounded-0 w-25 ph-remove-btn"
                >
                  {" "}
                  REMOVE
                </button> */}
              </div>

              <div className="submit-btn pt-5">
                <button
                  type="submit"
                  className="btn update-info btn-dark rounded-0"
                >
                  {" "}
                  UPDATE INFORMATION
                </button>
              </div>
            </form>

            {shippingAddress?.length > 0 &&
              shippingAddress.map((address, index) => {
                return (
                  <>
                    <div className=" pt-3 col gx-5">
                      <div>
                        <span className="pt-3 fw-bold">
                          Shipping address {index + 1}
                        </span>
                      </div>

                      <div className="pt-4">
                        <span className="pt-3">
                          {address.shippingAddress.name}
                          <br />
                          {address.shippingAddress.address}
                          <br />
                        </span>
                        <br />{" "}
                        <span className="pt-3">
                          {address.shippingAddress.zip},
                          {address.shippingAddress.city},{" "}
                          {address.shippingAddress.state}
                          <br />
                          <br />
                        </span>
                        <span
                          className="fw-bold"
                          onClick={() => {
                            removeAddress(address.id);
                          }}
                          style={{cursor:"pointer"}}
                        >
                          <u>Remove</u>
                          <br />
                        </span>
                        <br />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
