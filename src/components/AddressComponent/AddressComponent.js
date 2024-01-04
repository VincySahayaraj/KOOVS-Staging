import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./addressComponent.css";
import { addNewAddressApi, selectAddressApi } from "../../api/checkout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { editAddressApi } from "../../api/account";
const AddressComponent = ({ address, loadAddressDetails }) => {
  const navigate = useNavigate();
  const cartDetails = useSelector((state) => state.cart.cartData); //cart global info
  const cartProducts = useSelector((state) => state.cart.items); //cart items info
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [editableAddress, setEditAddress] = useState("");
  const [editAddressId, setEditAddressId] = useState("");
  const [values, setValues] = useState({
    country: "INDIA",
  });

  useEffect(() => {
    if (address) handleChangeSelectedAddress();
  }, [address]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      In case of partial cancellation there may be recovery of shipping charges
      applicable. <br /> For more details check <u>shipping policy</u>
    </Tooltip>
  );

  const changeSelectedAddress = async (id) => {
    let data = await selectAddressApi(id);

    if (data.isServiceable == false) {
      document.getElementById("deliverymsg" + id).innerHTML = data.msg;
    }
    setSelectedAddress(id);
  };
  const handleChangeSelectedAddress = async () => {
    let [detail] = await address.filter(function (address) {
      return address.isDefault == true;
    });

    setSelectedAddress(detail?.id);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleChangeEditAddress = (name) => (event) => {
    setEditAddress({
      ...editableAddress,
      [name]: event.target.value,
    });
  };

  const submitAddress = async () => {
    let obj = {
      isBillingSameAsShipping: true,
      isDefault: false,

      shippingAddress: values,
    };

    let data = await addNewAddressApi(obj);
    if (data) {
      setShowAddressModal(false);
      loadAddressDetails();
    }
  };

  const redirectToCheckout = () => {
    if (address?.length > 0) {
      navigate("/checkout/payment");
    } else {
      toast.error("Please add an address to proceed checkout");
      setShowAddressModal(true);
    }
  };

  // fetch info of editable address
  const editAddress = (id) => {
    let [result] = address.filter((address) => {
      return address.id == id;
    });
    setEditAddressId(id);
    setEditAddress(result.shippingAddress);
    setShowEditAddressModal(true);
  };

  const submitEditAddress = async (id) => {
    let obj = {
      billingAddress: editableAddress,
      shippingAddress: editableAddress,
      isBillingSameAsShipping: true,
      id: editAddressId,
    };

    let result = await editAddressApi(obj);
    if (result) {
      setShowEditAddressModal(false);
      setEditAddressId("");
      setEditAddress("");
    }
  };

  return (
    <>
      <section className="checkout-address">
        <div className="container">
          <div className="row order-summary mt-5">
            <div className="col-12 col-sm-12 col-md-9 col-lg-9">
              <div className="address-view">
                <div class="defaultAddText" data-reactid="30">
                  Select Delivery Address
                </div>
                <div
                  class="addBtn fw-bold"
                  data-reactid="31"
                  onClick={() => {
                    setShowAddressModal(true);
                  }}
                >
                  <u>ADD</u>
                </div>
              </div>
              <div className="row">
                {address &&
                  address.length > 0 &&
                  address.map((item) => {
                    return (
                      <>
                        <div class="card mt-3">
                          <div class="card-body">
                            {item.isDefault && <span>default</span>}
                            <div class="radioDiv">
                              <input
                                type="radio"
                                name="selectAddress"
                                id={item.id}
                                checked={selectedAddress == item.id}
                                onChange={() => changeSelectedAddress(item.id)}
                              />
                              <label for="3055606"></label>
                              <div class="check"></div>
                            </div>

                            <div className="card-address">
                              {" "}
                              <h5 class="card-title">
                                {item.shippingAddress.name}
                              </h5>
                              <p class="card-text">
                                <span>{item.shippingAddress.address}</span>
                                <br />
                                <span>{item.shippingAddress.city}</span>
                                <br />
                                <span>{item.shippingAddress.zip}</span>
                                <br />
                                <span>{item.shippingAddress.state}</span>
                                <br />
                                <span>{item.shippingAddress.country}</span>
                              </p>
                              <span
                                className="fw-bold"
                                onClick={() => {
                                  editAddress(item.id);
                                }}
                              >
                                <u>EDIT</u>
                              </span>
                              <br />
                              {/* service message */}
                              {selectedAddress == item.id && (
                                <span
                                  className="delivery-info"
                                  id={"deliverymsg" + item.id}
                                  dangerouslySetInnerHTML={{
                                    __html: item.servicableMsg,
                                  }}
                                ></span>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className="product-overview">
                <div className="cart-item">
                  <div className="d-flex">3 items</div>

                  <div className="bag-item-lists">
                    {cartProducts?.length > 0 &&
                      cartProducts.map((item) => {
                        return (
                          <>
                            <div className="bag-item">
                              <div className="bag-item-img">
                                <img src={item.product.cartImageUrl} />
                              </div>
                              <div className="bag-item-info">
                                <div>
                                  <div class="bag-item-title">
                                    <a
                                      href="/blue-saint-women-blue-slim-fit-midrise-mildly-distressed-stretchable-jeans-155540-172804.html?ref=cart_1997231"
                                      target="_blank"
                                    >
                                      <p class="product-name">
                                        <span class="brand-name">
                                          {item.product.brandName}
                                        </span>
                                        {item.product.productName}
                                      </p>
                                    </a>
                                  </div>
                                </div>

                                <div className="os-item-summary">
                                  <div className="os-item-details">
                                    <div class="os-size-div">
                                      <div class="size-label">Size :</div>
                                      <div class="size-code">
                                        {" "}
                                        {item.product.sizeCode}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="os-color-div">
                                    <div class="color-label">Color :</div>
                                    <div class="color-code">
                                      <div
                                        class="color-div"
                                        style={{
                                          backgroundColor:
                                            item.product.colorCode,
                                        }}
                                      >
                                        {" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="os-qty-div">
                                    <div class="qty-label">Qty :</div>
                                    <div class="qty-code">{item.qty}</div>
                                  </div>
                                </div>

                                <div class="item-price-wrapper">
                                  <div class="price-div">
                                    <div class="disc-price">
                                      ₹ {item.subTotal}
                                    </div>
                                    <div class="striked-price">
                                      {" "}
                                      ₹ {item.total}
                                    </div>
                                    <div class="disc-perc">
                                      {item.product.discountPercent} % OFF
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="sold-out-hide"></div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-3 col-lg-3  checkout-summary fw-bold">
              <span>PRICE SUMMARY</span>

              <div className="bag-payment-section">
                <div className=" d-flex pricecontent">
                  <div>
                    Bag total <span className="details">Details</span>
                  </div>

                  <div>:</div>
                  <div>₹ {cartDetails?.subTotal}</div>
                </div>

                <div className=" d-flex pricecontent">
                  <div>Shipping charges</div>
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                    <span class="show_info_icon"></span>
                  </OverlayTrigger>
                  <div className="dot">:</div>
                  <div>
                    <span className="shipping-value">
                      {cartDetails?.shippingAmount != "0"
                        ? cartDetails?.shippingAmount
                        : "FREE"}
                    </span>{" "}
                  </div>
                </div>
              </div>

              <div className="bag-payment-section">
                <div className=" d-flex pricecontent">
                  <div>TOTAL PAYABLE</div>

                  <div>:</div>
                  <div>₹ {cartDetails?.payAmount}</div>
                </div>
                <span className="tax-info">PRICES INCLUSIVE OF ALL TAXES</span>
              </div>

              <div className="checkout-btn mt-4">
                <button
                  className="btn w-100 btn-dark rounded-0"
                  onClick={() => redirectToCheckout()}
                >
                  CONFIRM & PAY
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          size="lg"
          show={showEditAddressModal}
          onHide={() => setShowEditAddressModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Shipping Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="address-form">
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  autoComplete="off"
                  onChange={handleChange("name")}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Pin Code</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  onChange={handleChange("zip")}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">City</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  onChange={handleChange("city")}
                />
              </div>{" "}
              <div class="form-group">
                <label for="exampleInputEmail1">State</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  onChange={handleChange("state")}
                />
              </div>{" "}
              <div class="form-group">
                <label for="exampleInputEmail1">Address</label>
                <input
                  required
                  type="email"
                  class="form-control"
                  onChange={handleChange("address")}
                />
              </div>{" "}
              <div class="form-group">
                <label for="exampleInputEmail1">Email </label>
                <input
                  required
                  type="email"
                  class="form-control"
                  onChange={handleChange("email")}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Mobile </label>
                <input
                  required
                  type="number"
                  class="form-control"
                  onChange={handleChange("mobile")}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="btn w-25 btn-dark rounded-0"
              onClick={() => {
                submitAddress();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* edit address section */}

        <>
          <Modal
            size="lg"
            show={showEditAddressModal}
            onHide={() => setShowEditAddressModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Shipping Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="address-form">
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    autoComplete="off"
                    value={editableAddress?.name}
                    onChange={handleChangeEditAddress("name")}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Pin Code</label>
                  <input
                    required
                    type="text"
                    value={editableAddress?.zip}
                    class="form-control"
                    onChange={handleChangeEditAddress("zip")}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">City</label>
                  <input
                    required
                    value={editableAddress?.city}
                    type="text"
                    class="form-control"
                    onChange={handleChangeEditAddress("city")}
                  />
                </div>{" "}
                <div class="form-group">
                  <label for="exampleInputEmail1">State</label>
                  <input
                    required
                    type="text"
                    value={editableAddress?.state}
                    class="form-control"
                    onChange={handleChangeEditAddress("state")}
                  />
                </div>{" "}
                <div class="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <input
                    required
                    type="email"
                    value={editableAddress?.address}
                    class="form-control"
                    onChange={handleChangeEditAddress("address")}
                  />
                </div>{" "}
                <div class="form-group">
                  <label for="exampleInputEmail1">Email </label>
                  <input
                    required
                    value={editableAddress?.email}
                    type="email"
                    class="form-control"
                    onChange={handleChangeEditAddress("email")}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Mobile </label>
                  <input
                    required
                    value={editableAddress?.mobile}
                    type="number"
                    class="form-control"
                    onChange={handleChangeEditAddress("mobile")}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="btn w-25 btn-dark rounded-0"
                onClick={() => {
                  submitEditAddress(editableAddress?.id);
                }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </section>
    </>
  );
};

export default AddressComponent;
