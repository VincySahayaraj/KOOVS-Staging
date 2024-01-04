import React, { useEffect, useState } from "react";
import "./registerform.css";
// for google captcha v3
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";
import { checkIfUserValid, signUpUserApi } from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function RegisterForm() {
  const [token, setToken] = useState();
  const [values, setValues] = useState();
  const [error, setError] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const [key, setKey] = useState(1);
  const navigate = useNavigate();

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
    if (name == "MALE") {
      setValues({ ...values, gender: "MALE" });
      return;
    } else if (name == "WOMEN") {
      setValues({ ...values, gender: "WOMEN" });
      return;
    }
    if (name == "email" || name == "phoneNumber") {
      setError(false);
    }
    setValues({ ...values, [name]: event.target.value });
  };
  // signup form submit
  const submitSignUp = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    let ifUserValid = await checkIfUserValid(values);
    if (ifUserValid.error) {
      // in case of user validation failed show the message
      setError(ifUserValid.message);
      setBtnLoading(false);
    } else {
      // user validation is successfull so, call the signUp API

      let signUpResp = await signUpUserApi(values, token);

      if (signUpResp?.data?.user) {
        // dispatch user to REDUX state
        dispatch({
          type: "USER_SIGNUP",
          payload: signUpResp.data,
        });
        navigate(-1);
      }
      setBtnLoading(false);
    }
  };

  return (
    <>
      <ReCaptcha
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
        action="sign_up"
        key={key}
        verifyCallback={handleVerify}
      />

      <section className=" d-md-block d-lg-block section-register-form pt-5">
        <div className="col-sm-12 col-xs-12  col-md-9 col-lg-9 register-form">
          <h4>Create Account</h4>

          <form className="pt-3 " onSubmit={submitSignUp}>
            <div class="form-group ">
              <input
                required
                type="text"
                class="form-control"
                placeholder="Full Name"
                onChange={handleChange("fullName")}
              />
            </div>
            <div class="form-group pt-3 ">
              <input
                required
                type="email"
                class="form-control"
                placeholder="Email Address"
                onChange={handleChange("email")}
              />
            </div>
            <div class="form-group pt-3 ">
              <input
                required
                type="password"
                class="form-control"
                placeholder="Password"
                onChange={handleChange("password")}
              />
            </div>
            <div class="form-group pt-3 ">
              <input
                type="text"
                required
                class="form-control"
                placeholder="Phone Number"
                onChange={handleChange("phoneNumber")}
              />
            </div>

            <div className="row">
              <div class=" col form-group pt-3 ">
                <input
                  required
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender"
                  onChange={handleChange("MALE")}
                />
                <label class="form-check-label radio" for="flexRadioDefault1">
                  Men
                </label>
              </div>
              <div class=" col form-group pt-3 ">
                <input
                  required
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender"
                  onChange={handleChange("FEMALE")}
                />
                <label class="form-check-label radio" for="flexRadioDefault1">
                  Women
                </label>
              </div>
            </div>

            {/* <div className="info-text pt-3">
            <span>
              To personalize your account, please enter your date of birth and
              country of residence.{" "}
            </span>
          </div>

          <div className="row g-3">
            <div class="col-4">
              <select class="form-select" aria-label="Default select example">
                <option selected>2022</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div class="col-4">
              <select class="form-select" aria-label="Default select example">
                <option selected>01</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div class="col-4">
              <select class="form-select" aria-label="Default select example">
                <option selected>01</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="pt-2">
            <select class="form-select" aria-label="Default select example">
              <option selected>01</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="row g-3 pt-2">
            <div className="col-4">
              <select class="form-select" aria-label="Default select example">
                <option selected>+45</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-8">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Phone Number"
              />
            </div>
          </div> */}

            {error ? (
              <div className="col-8 pt-3">
                <span style={{ color: "red" }}>*{error}</span>
              </div>
            ) : (
              <></>
            )}
            <div class="form-group form-check pt-3">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label
                class="form-check-label checkbox-confirm"
                for="exampleCheck1"
              >
                I wish to receive newsletter to receive info on new products,
                sales and events.{" "}
              </label>
            </div>
            <div class="form-group form-check pt-3">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label
                class="form-check-label checkbox-confirm"
                for="exampleCheck1"
              >
                I have read and understood the Terms and Conditions.{" "}
              </label>
            </div>
            <div className="submit-btn pt-2">
              {btnLoading ? (
                <>
                  {" "}
                  <button type="button" className="btn btn-dark rounded-0 w-50">
                    {" "}
                    LOADING...
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button type="submit" className="btn btn-dark rounded-0 w-50">
                    {" "}
                    Create
                  </button>
                </>
              )}
            </div>
          </form>
          <div className="privacy-text pt-3">
            <span>
              This site it protected by reCAPTCHA and Google Privacy Policy and
              Terms of Service apply.{" "}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterForm;
