import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MenHomeBanner from "../components/MenHomeBanner/MenBanner";
import MenSlider from "../components/MenSlider/CategoryMenuSlider";
import MenProductSlider from "../components/MenProductSlider/MenCategoryProductSlider";
import MidSeasonSale from "../components/MidSeasonSale/MidSeasonSale";
import MobileMenBanner from "../components/MobileMenBanner/MobileMenBanner";
import LiveInMen from "../components/LiveInMen/LiveInMen";
import { useParams } from "react-router-dom";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";
import WomenHomeBanner from "../components/WomenHomeBanner/WomenBanner";
import { addToWishlistAPI, removeItemFromWishList } from "../api/cart";
import { useDispatch,useSelector } from "react-redux";

const CategoryPage = () => {
  let { category } = useParams();
  let { tag } = useParams();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const [key, setKey] = useState(1);
  const googleCaptcha = useRef();
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    if (category) setCategoryName(category);
  }, [category]);

  // add product to wish list
  const addToWishlist = async (product, productId, lineId) => {
    let prodDetails = {
      product: { skuId: product.sku },
      productId: productId,
      lineId: lineId,
      reCaptcha: token,
    };

    // add to wishlist api
    let data = await addToWishlistAPI(prodDetails);
    if (data) {
      let obj = {
        lineId: lineId,
        sku: prodDetails.product.skuId,
        id: prodDetails.productId,
      };
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: obj,
      });
    }
    reloadRecaptcha();
  };

  const removeWishlist = async (skuId, lineId) => {
    let data = await removeItemFromWishList(skuId, lineId);
    if (data) {
      let obj = {
        skuId: skuId,
        lineId: lineId,
      };
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: obj,
      });
    }
    reloadRecaptcha();
  };
  // reload the recaptcha
  const reloadRecaptcha = async () => {
    setKey(key + 1);

    loadReCaptcha(process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY); //sitekey load recaptcha
  };
  function handleVerify(token) {
    setToken(token);
  }

  return (
    <>
      {" "}
      <ReCaptcha
        key={key}
        ref={googleCaptcha}
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
        action="addToCart"
        verifyCallback={handleVerify}
      />
      <div className="HomeMen">
        <Header />
        {categoryName == "men" || categoryName == "Men" ? (
          <MenHomeBanner />
        ) : categoryName == "women" || categoryName == "Women" ? (
          <WomenHomeBanner />
        ) : (
          <>404</>
        )}

        <MidSeasonSale tag={tag} categoryName={categoryName}/>
        <MobileMenBanner />
        <MenSlider />
        <MenProductSlider addToWishlist={addToWishlist} removeWishlist={removeWishlist} categoryName={categoryName}/>
        <LiveInMen />

        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
