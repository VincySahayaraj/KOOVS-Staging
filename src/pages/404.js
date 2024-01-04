import React, { useEffect, useState } from "react";
import { getVisitorToken } from "../api/auth";
import FourNotFourBody from "../components/404/FourNotFourBody";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";
import { useDispatch, useSelector } from "react-redux";

function FourNotFour() {
  const userDetails = useSelector((state) => state.user);
  //   useEffect(() => {
  //     console.log("user detailssssss", userDetails);
  //   }, [userDetails]);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     loadReCaptcha("6LdSHv0UAAAAACfq2Tk2XQrk1kek189iNpni7nCI");

  //   }, []);
  //   const [token, setToken] = useState();

  //   function handleVerify(token) {
  //     console.log("token---------", token);
  //   }
  return (
    <>
      <Header />
      <FourNotFourBody />

      {/* <ReCaptcha
        sitekey="6LdSHv0UAAAAACfq2Tk2XQrk1kek189iNpni7nCI"
        action="signup_actionn"
        verifyCallback={handleVerify}
      /> */}
      <Footer />
    </>
  );
}

export default FourNotFour;
