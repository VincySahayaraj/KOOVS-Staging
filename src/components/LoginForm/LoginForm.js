import React, { useEffect, useRef, useState } from "react";
import "./loginform.css";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";
import { userLoginAPI } from "../../api/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductByBatchIdAPI } from "../../api/commonApi";
const LoginForm = () => {
  const cartData = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [token, setToken] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);
  const googleCaptcha = useRef();
  const dispatch = useDispatch();
  const [key, setKey] = useState(1);

  useEffect(() => {
    reloadRecaptcha();
  }, []);

  const reloadRecaptcha = () => {
    setKey(key + 1);
    loadReCaptcha(process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY); //sitekey load recaptcha
  };

  function handleVerify(token) {
    setToken(token);
  }

  // For changing login values
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setError(false);
  };

  const submitLogin = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    let userData = {
      email: values.email,
      password: values.password,
      reCaptcha: token,
    };

    let userLogin = await userLoginAPI(userData);
    if (!userLogin?.error) {
      // merge the cart data//

      const loadCartByBatchId = async (data) => {
        let sku = [];
        for (let i = 0; i < cartData.length; i++) {
          sku.push(cartData.product.sku);
        }
        sku = sku.toString();
        let result = await getProductByBatchIdAPI(sku);
        console.log("this is result", result);
      };

      // dispatches the login state

      dispatch({
        type: "USER_LOGIN",
        payload: userLogin,
      });
      // navigate("/user/account");
      // window.location.href = "/user/account";
      navigate(-1)
    } else {
      // reloads the recaptcha key with new one
      googleCaptcha.current.execute();

      setError(userLogin?.message);
    }

    setBtnLoading(false);
  };

  return (
    <>
      <ReCaptcha
        ref={googleCaptcha}
        key={key}
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
        action="login"
        verifyCallback={handleVerify}
      />
      <section className="login row">
        <div className="login-form col-xs-12 col-sm-12 col-md-9 col-lg-9 pt-4">
          <h6>Sign In</h6>

          <div className="form">
            <form className="pt-3 " onSubmit={submitLogin}>
              <div class="form-group ">
                <input
                  type="email"
                  class="form-control"
                  onChange={handleChange("email")}
                  required
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group pt-3 ">
                <input
                  required
                  type="password"
                  class="form-control"
                  onChange={handleChange("password")}
                  placeholder="Password"
                />
              </div>
              <div class="form-group pt-3 ">
                {error ? (
                  <>
                    <span className="error_message">*{error}</span>{" "}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="forgot-password">
                <span>Forgot your password.?</span>
              </div>

              <div className="submit-btn pt-5">
                {!btnLoading ? (
                  <button type="submit" className="btn w-50 btn-dark rounded-0">
                    {" "}
                    SIGN IN
                  </button>
                ) : (
                  <button type="button" className="btn w-50 btn-dark rounded-0">
                    {" "}
                    PLEASE WAIT...
                  </button>
                )}
              </div>
            </form>
            <div className="privacy-text pt-3">
              <span>
                This site it protected by reCAPTCHA and Google Privacy Policy
                and Terms of Service apply.{" "}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LoginForm;
