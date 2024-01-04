import React, { useEffect, useState } from "react";
import "./paymentSection.css";
import { BsCreditCard2Front } from "react-icons/bs";
import { BsWallet2 } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import { BiCreditCardFront } from "react-icons/bi";
import {
  Col,
  Modal,
  Nav,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Hdfc from "../../assets/images/HDFC.png";
import SBI from "../../assets/images/SBI.png";
import ICIC from "../../assets/images/ICIC.jpg";
import Axis from "../../assets/images/AXISBANK.png";
import Phonepe from "../../assets/images/PhonePe.png";
import GPay from "../../assets/images/gpay.jpg";
import freecharge from "../../assets/images/freecharge.png";
import informationIcon from "../../assets/images/informationIcon.jpg";
import OtpInput from "react-otp-input";
import { checkCreditCard } from "../../utils/checkCreditCard";
import defaultCardImg from "../../assets/images/creditcard.png";
import visaImg from "../../assets/images/visa.png";
import mastercardImg from "../../assets/images/mastercard.png";
import amexCardImg from "../../assets/images/amexcard.png";
import { useSelector } from "react-redux/es/exports";

const PaymentSection = ({
  paymentModes,
  addressDetails,
  checkForActiveOffers,
  setSelectedPaymentGateway,
  selectedPaymentGateway,
}) => {
  const cartDetails = useSelector((state) => state.cart.cartData); //cart global info
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [details, setDetails] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [thumbCardImg, setThumbCardImg] = useState(defaultCardImg);
  const [otpValue, setOtpValue] = useState();

  const handleChange = (name) => async (event) => {
    if (name == "creditCard") {
      let result = await checkCreditCard(event.target.value);
      console.log("thsi is the final result of credit card change", result);

      if (!result.success) {
        setCardError(result.message);
      } else {
        if (result.type == "AmEx") {
          setThumbCardImg(amexCardImg);
        } else if (result.type == "MasterCard") {
          setThumbCardImg(mastercardImg);
        } else if (result.type == "Visa") {
          setThumbCardImg(visaImg);
        } else {
          setThumbCardImg(defaultCardImg);
        }
        setCardError(false);
      }
    }
  };

  const changePaymentTab = (item) => {
    console.log("item", item);

    setSelectedPaymentGateway(item)
    checkForActiveOffers(item);

  };

  return (
    <>
      <section className="payment-section mt-5">
        <div className="container">
          <div className="row price-range">
            <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12">
              <p className="payTitle">SELECT PAYMENT OPTION</p>
              <div className="row credit-section">
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="creditcard"
                >
                  <Col sm={3} className="card-headings">
                    <Nav variant="pills" className="flex-column">
                      {paymentModes?.length > 0 &&
                        paymentModes.map((item) => {
                          return (
                            <>
                              {item.name != "zeroPayment" && (
                                <Nav.Item
                                  onClick={() => changePaymentTab(item)}
                                >
                                  <Nav.Link eventKey={item.name}>
                                    <FaRegCreditCard className="logo-space" />
                                    {item.name == "creditcard" && "CREDIT CARD"}
                                    {item.name == "debitcard" && "DEBIT CARD"}
                                    {item.name == "netbanking" && "NET BANKING"}
                                    {item.name == "wallet" && "WALLET OR UPI"}
                                    {item.name == "cod" && "CASH ON DELIVERY"}
                                  </Nav.Link>
                                </Nav.Item>
                              )}
                            </>
                          );
                        })}
                    </Nav>
                  </Col>
                  <Col sm={5} className="card-content">
                    <Tab.Content className="form-contents" active="creditcard">
                      {paymentModes?.length > 0 &&
                        paymentModes.map((item) => {
                          return (
                            <>
                              {/* tab for credit card payment */}

                              {item.name == "creditcard" && (
                                <Tab.Pane
                                  eventKey={item.name}
                                  className="acive"
                                >
                                  <p className="fw-bold credit-heading">
                                    CREDIT CARD
                                  </p>
                                  <form className="credit-start">
                                    <div className="d-flex flex-column form-details">
                                      <label>Card Number</label>

                                      <input
                                        type="text"
                                        className="no-border"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        onBlur={handleChange("creditCard")}
                                        style={{ width: "453px" }}
                                      />
                                      <img
                                        src={thumbCardImg}
                                        width="25"
                                        className="card-thumb"
                                      />

                                      {cardError != false && (
                                        <p style={{ color: "red" }}>
                                          * {cardError}
                                        </p>
                                      )}
                                    </div>
                                    <div
                                      className="d-flex card-img"
                                      style={{ width: "453px" }}
                                    ></div>
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex flex-column form-details">
                                        <label>Expiry Month</label>
                                        <input
                                          type="text"
                                          className="no-border"
                                          placeholder="XX"
                                          style={{ width: "210px" }}
                                        ></input>
                                      </div>
                                      <div className="d-flex flex-column expiry-year form-details">
                                        <label>Expiry Year</label>
                                        <input
                                          type="text"
                                          className="no-border"
                                          placeholder="XXXX"
                                          style={{ width: "210px" }}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex flex-column form-details">
                                        <label>CCV</label>
                                        <input
                                          type="text"
                                          className="no-border"
                                          placeholder="XXX"
                                        ></input>
                                      </div>
                                      <p className="three-digits expiry-year form-details">
                                        Last 3 digits printed on back of the
                                        card.
                                      </p>
                                    </div>
                                    <input
                                      type="text"
                                      className="no-border form-details"
                                      placeholder="Name on Card"
                                      style={{ width: "453px" }}
                                    />

                                    <button
                                      type="button"
                                      className="paynow-btn"
                                    >
                                      PAY NOW
                                    </button>
                                  </form>
                                </Tab.Pane>
                              )}

                              {/* for Debit card payments */}

                              {item.name == "debitcard" && (
                                <Tab.Pane eventKey={item.name}>
                                  <p className="fw-bold credit-heading">
                                    DEBIT CARD
                                  </p>
                                  <form className="credit-start">
                                    <div className="d-flex flex-column form-details">
                                      <label>Card Number</label>

                                      <input
                                        type="text"
                                        className="no-border"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        onBlur={handleChange("creditCard")}
                                        style={{ width: "453px" }}
                                      />
                                      <img
                                        src={thumbCardImg}
                                        width="25"
                                        className="card-thumb"
                                      />

                                      {cardError != false && (
                                        <p style={{ color: "red" }}>
                                          * {cardError}
                                        </p>
                                      )}
                                    </div>
                                    <div
                                      className="d-flex card-img"
                                      style={{ width: "453px" }}
                                    ></div>
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex flex-column form-details">
                                        <label>Expiry Month</label>
                                        <input
                                          type="text"
                                          className="no-border"
                                          placeholder="XX"
                                          style={{ width: "210px" }}
                                        ></input>
                                      </div>
                                      <div className="d-flex flex-column expiry-year form-details">
                                        <label>Expiry Year</label>
                                        <input
                                          type="text"
                                          className="no-border"
                                          placeholder="XXXX"
                                          style={{ width: "210px" }}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex flex-column form-details">
                                        <label>CCV</label>
                                        <input
                                          type="text"
                                          className="no-border"
                                          placeholder="XXX"
                                        ></input>
                                      </div>
                                      <p className="three-digits expiry-year form-details">
                                        Last 3 digits printed on back of the
                                        card.
                                      </p>
                                    </div>
                                    <input
                                      type="text"
                                      className="no-border form-details"
                                      placeholder="Name on Card"
                                      style={{ width: "453px" }}
                                    />

                                    <button
                                      type="button"
                                      className="paynow-btn"
                                    >
                                      PAY NOW
                                    </button>
                                  </form>
                                </Tab.Pane>
                              )}

                              {/* for internet banking */}

                              {item.name == "netbanking" && (
                                <Tab.Pane eventKey={item.name}>
                                  <p className="fw-bold credit-heading">
                                    NETBANKING
                                  </p>
                                  <label className="other-payments">
                                    Popular banks
                                  </label>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault1"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault1"
                                    >
                                      <img
                                        src={SBI}
                                        alt="SBI"
                                        className="bank-names"
                                      />
                                    </label>
                                  </div>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault2"
                                      checked
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault2"
                                    >
                                      <img
                                        src={Hdfc}
                                        alt="HDFC"
                                        className="bank-names"
                                      />
                                    </label>
                                  </div>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault2"
                                      checked
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault2"
                                    >
                                      <img
                                        src={ICIC}
                                        alt="HDFC"
                                        className="bank-names"
                                      />
                                    </label>
                                  </div>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault2"
                                      checked
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault2"
                                    >
                                      <img
                                        src={Axis}
                                        alt="HDFC"
                                        className="bank-names"
                                      />
                                    </label>
                                  </div>

                                  <label className="other-payments">
                                    Other banks
                                  </label>
                                  <select
                                    class="form-select"
                                    aria-label="Default select example"
                                  >
                                    <option selected value="">
                                      Select Your bank
                                    </option>
                                    {item?.submodes.map((bank) => {
                                      return (
                                        <>
                                          <option value="1">{bank.name}</option>
                                        </>
                                      );
                                    })}
                                  </select>
                                  <button type="button" className="paynow-btn">
                                    PAY NOW
                                  </button>
                                </Tab.Pane>
                              )}

                              {/* for internet banking */}

                              {item.name == "wallet" && (
                                <Tab.Pane eventKey={item.name}>
                                  <p className="fw-bold credit-heading">
                                    WALLET
                                  </p>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault1"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault1"
                                    >
                                      <img
                                        src={Phonepe}
                                        alt="SBI"
                                        className="bank-names"
                                      />
                                    </label>
                                  </div>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault2"
                                      checked
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault2"
                                    >
                                      <img
                                        src={GPay}
                                        alt="HDFC"
                                        className="bank-names"
                                      />
                                    </label>
                                  </div>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault2"
                                      checked
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault2"
                                    >
                                      <img
                                        src={freecharge}
                                        alt="HDFC"
                                        className="bank-names"
                                      />
                                    </label>
                                  </div>

                                  <button type="button" className="paynow-btn">
                                    PAY NOW
                                  </button>
                                </Tab.Pane>
                              )}

                              {item.name == "cod" && (
                                <>
                                  <Tab.Pane eventKey={item.name}>
                                    <div className="d-inline-block">
                                      <p className="fw-bold credit-heading">
                                        CASH ON DELIVERY
                                      </p>
                                      <p>
                                        {" "}
                                        Please make a payment of
                                        <p className="fw-bold"> ₹2417</p>at the
                                        time of delivery of your order.
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      className="paynow-btn"
                                      onClick={handleShow}
                                    >
                                      CONFIRM YOUR ORDER
                                    </button>

                                    <Modal
                                      show={show}
                                      onHide={handleClose}
                                      className="otpmodal"
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>
                                          Validate Your Mobile Number
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        Please verfiy your mobile number to
                                        confirm order. OTP has been sent to
                                        81xxxxxx85
                                      </Modal.Body>
                                      <div className="d-flex justify-content-center">
                                        <OtpInput
                                          className="otp-input"
                                          value={otpValue}
                                          onChange={(otp) => setOtpValue(otp)}
                                          numInputs={4}
                                          separator={
                                            <span>
                                              <nbsp />
                                              <nbsp />
                                              <nbsp />
                                            </span>
                                          }
                                        />
                                      </div>
                                      <Modal.Body>
                                        Didn't received the OTP ? Resend{" "}
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <Button
                                          variant="primary"
                                          onClick={handleClose}
                                        >
                                          CONFIRM
                                        </Button>
                                      </Modal.Footer>
                                    </Modal>
                                  </Tab.Pane>
                                </>
                              )}
                            </>
                          );
                        })}
                    </Tab.Content>
                  </Col>
                </Tab.Container>
              </div>
            </div>
            <div className="delivery-price col-xl-3 col-lg-3 col-sm-12 col-xs-12">
              <p className="payTitle d-sm-block d-lg-none d-xl-none">OFFERS</p>
              <p className="payTitle">PRICE SUMMARY</p>

              <div className="price-content">
                <div className="price-rate d-flex justify-content-between">
                  <p className="fw-bold ">BAG TOTAL </p>
                  {/* {!details && (
                    <div className="product-total">
                      <div className="d-flex justify-content-center">
                        <p>PRODUCT TOTAL</p>
                        <p>:</p>
                        <p>₹2417</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>PRODUCT DISCOUNT</p>
                        <p>:</p>
                        <p>₹2417</p>
                      </div>
                    </div>
                  )} */}

                  <p
                    className="details-textprice fw-bold"
                    onClick={() => setDetails(!details)}
                  >
                    Details
                  </p>
                  <p style={{ marginLeft: "12px" }}>:</p>
                  <p className="fw-bold">₹ {cartDetails?.subTotal}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="price-taxes">
                    SHIPPING CHARGES
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          style={{ width: "320px" }}
                        >
                          In case of partial cancellation there may be recovery
                          of shipping charges applicable. For more details check{" "}
                          <u>Shipping Policy.</u>
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <img
                          src={informationIcon}
                          style={{ cursor: "pointer" }}
                          alt="information-icon"
                        />
                      </span>
                    </OverlayTrigger>
                  </p>
                  <p className="colon-placing">:</p>
                  <p>
                    {cartDetails?.shippingAmount == 0
                      ? "FREE"
                      : cartDetails?.shippingAmount}
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="fw-bold">TOTAL PAYABLE</p>
                  <p style={{ marginLeft: "57px" }}>:</p>
                  <p className="fw-bold">₹ {cartDetails?.payAmount}</p>
                </div>

                <p className="price-taxes">Prices inclusive all taxes</p>
              </div>

              <div className="delivery-address d-sm-none d-lg-block">
                <p className="fw-bold">DELIVERY ADDRESS</p>
                <div className="delivery-details">
                  <p className="fw-bold">
                    {addressDetails?.shippingAddress?.name}
                  </p>
                  <p>{addressDetails?.shippingAddress?.city}</p>
                  <p>
                    {addressDetails?.shippingAddress?.state},{" "}
                    {addressDetails?.shippingAddress?.zip},{" "}
                    {addressDetails?.shippingAddress?.country}
                  </p>
                  <p className="fw-bold">
                    {addressDetails?.shippingAddress?.mobile}
                  </p>
                  <p className="fw-bold">
                    {addressDetails?.shippingAddress?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentSection;
