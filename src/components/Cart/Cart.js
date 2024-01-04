import React, { useEffect, useState } from "react";
import "./cart.css";
import cartProductImg from "../../assets/images/Outline/cartProduct.png";
import payment from "../../assets/images/Outline/payment.png";
import {
  getCartItems,
  removeCartItem,
  updateCartQuantity,
} from "../../api/cart";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";
import { useSelector } from "react-redux";
import { getProductByBatchIdAPI } from "../../api/commonApi";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.items);
  const [cartItems, setCartItems] = useState([]);
  const [productInDetail, setProductInDetail] = useState([]);
  const [cartData, setCartData] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [key, setKey] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    reloadRecaptcha();
    loadCartItems();
  }, []);

  const reloadRecaptcha = () => {
    setKey(key + 1);
    loadReCaptcha(process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY); //sitekey load recaptcha
  };

  function handleVerify(token) {
    setToken(token);
  }

  const loadCartItems = async () => {
    setLoading(true);
    let data = await getCartItems();
    if (data) {
      setCartData(data);
      setCartItems(data.items);
      loadCartByBatchId(data);
    }

    // recalculating the count
    dispatch({
      type: "INITIALIZE_CART",
      payload: data,
    });
    setLoading(false);
  };

  const loadCartByBatchId = async (data) => {
    let sku = [];
    for (let i = 0; i < data.items.length; i++) {
      sku.push(data.items[i].product.sku);
    }
    sku = sku.toString();
    let result = await getProductByBatchIdAPI(sku);
    console.log("this is result", result);
    setProductInDetail(result.data);
  };

  const removeItemFromCart = async (skuId) => {
    let consent = window.confirm("Are you sure to remove this item from cart?");
    if (!consent) return;
    let data = await removeCartItem(skuId);
    if (data) {
      loadCartItems();
    }
  };

  const loadingPlaceHolder = () => {
    return (
      <>
        <div className="skeleton-z66nckdn7j3"></div>{" "}
      </>
    );
  };

  //   update single products quantity
  const updateQuantity = async (product, quantity) => {
    // get FeDetails, lot , and other meta details from previously stored product data//
    var [temp] = productInDetail.filter((item) => {
      return item.product.sku == product.product.sku;
    });

    [temp] = temp.quantity.data.filter((item) => {
      return item.skuId == product.product.sku;
    });

    let obj = {
      sku: product.product.sku,
      quantity: quantity,
      vendor: temp.feDetails.vendor,
      warehouse: temp.feDetails.warehouse,
      lot: temp.feDetails.lot,
      reCaptcha: token,
    };

    let result = await updateCartQuantity(obj);
    reloadRecaptcha();
    loadCartItems();
  };

  return (
    <>
      <ReCaptcha
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
        action="addToCart"
        key={key}
        verifyCallback={handleVerify}
      />
      <section className="cart">
        <div className="container-fluid">
          <div className="col-12">
            <h5 className="py-4">
              <b>Shopping Cart</b>
            </h5>

            <div className="w-75 mx-auto">
              <div className="row">
                <div className="col"></div>
                <div className="col-9">
                  {loading && loadingPlaceHolder()}
                  {cartItems?.length > 0 && (
                    <>
                      <div className="row">
                        {!loading && (
                          <>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Item</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Size</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Total</th>
                                </tr>
                              </thead>

                              <tbody>
                                {cartItems?.length > 0 &&
                                  cartItems.map((item) => {
                                    return (
                                      <>
                                        <tr key={item.total}>
                                          <th scope="row" className="w-50">
                                            <LazyLoadImage
                                              effect="blur"
                                              src={item?.product?.cartImageUrl}
                                              width="67px"
                                              height="67px"
                                            />
                                            <div>
                                              {item?.product?.productName}
                                            </div>
                                          </th>
                                          <td className="w-25">
                                            {" "}
                                            <div className="pt-4">
                                              ₹ {item.total}
                                            </div>
                                          </td>
                                          <td className="w-25 total-price">
                                            {" "}
                                            <div className="pt-4">
                                              {item.product.sizeCode}
                                            </div>
                                          </td>
                                          <td className="w-25">
                                            {" "}
                                            <div className="pt-4 ">
                                              <input
                                                type="number"
                                                id={item.product.sku}
                                                defaultValue={item.qty}
                                                className="quantity-box"
                                                min="1"
                                                autoComplete="off"
                                                onChange={(e) =>
                                                  updateQuantity(
                                                    item,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>
                                          </td>
                                          <td className="w-25 total-price">
                                            {" "}
                                            <div className="pt-4">
                                              ₹ {item.payAmount}    
                                            </div>
                                          </td>
                                          <td className="w-25">
                                            {" "}
                                            <div className="pt-4">
                                              <i
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  removeItemFromCart(
                                                    item.product.sku
                                                  )
                                                }
                                                className="fa fa-times"
                                                aria-hidden="true"
                                              ></i>
                                            </div>
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })}
                              </tbody>
                            </table>
                            <div className="pt-3">
                              {" "}
                              <hr className="line" />
                            </div>

                            <div className="d-flex bd-highlight mb-3 cart-total">
                              <div className="mr-auto p-2 bd-highlight text-bold">
                                Sub Total
                              </div>
                              <div className="p-2 bd-highlight text-bold">
                                ₹ {cartData.total}
                              </div>
                            </div>

                            <div className="d-flex bd-highlight mb-3 cart-total">
                              <div className="mr-auto p-2 bd-highlight text-bold">
                                Discount
                              </div>
                              <div className="p-2 bd-highlight text-bold">
                                ₹ {cartData.discount}
                              </div>
                            </div>
                            <div className="d-flex bd-highlight mb-3 cart-total">
                              <div className="mr-auto p-2 bd-highlight text-bold">
                                APPLICABLE TAX & CHARGES
                              </div>
                              <div className="p-2 bd-highlight text-bold">
                                ₹ {cartData.gst}
                              </div>
                            </div>

                            <div className="d-flex bd-highlight mb-3 cart-total">
                              <div className="mr-auto p-2 bd-highlight text-bold">
                                Total
                              </div>
                              <div className="p-2 bd-highlight text-bold">
                                ₹ {cartData.subTotal}
                              </div>
                            </div>

                            <div className="pt-0 last-line">
                              {" "}
                              <hr className="line" />
                            </div>
                            <div className="d-flex bd-highlight mb-3 cart-total">
                              <div className="mr-auto p-2 bd-highlight text-bold">
                                Continue shopping
                              </div>
                              <div className="p-2 bd-highlight text-bold">
                                <u>Update cart</u>
                              </div>
                            </div>
                            <div className="pt-3">
                      <Link to="/checkout/address" style={{textDecoration:"none"}}>   <button className="btn btn-dark px-5 rounded-0 mx-auto d-flex">
                                CHECKOUT
                              </button></Link>   
                            </div>
                          </>
                        )}
                      </div>

                      <div>
                        <img src={payment} className="img-fluid" />
                      </div>
                    </>
                  )}

                  {!cartItems?.length && (
                    <>
                      <div className="w-75 mx-auto">
                        <p>
                          It appears that your cart is currently empty!
                          <br />
                          You can continue browsing here.
                        </p>
                      </div>
                      <div className="col-12 mt-5">
                        <Link to="/" style={{ textDecoration: "none" }}>
                          {" "}
                          <button className="btn btn-dark px-5 rounded-0 mx-auto d-flex">
                            GO TO SHOP
                          </button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className="col"></div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5"></div>
        </div>
      </section>
    </>
  );
};

export default Cart;
