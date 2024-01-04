import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import FavouriteProducts from "../components/FavouriteProducts/FavouriteProducts";
import Footer from "../components/Footer/Footer";
import { loadSingleProduct } from "../api/commonApi";
import { useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";

const ProductDetail = () => {
  let { productId, lineId } = useParams();
  const [productDetails, setProductDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const googleCaptcha = useRef();
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (productId && lineId) loadProducts();
  }, [productId, lineId]);
  const loadProducts = async () => {
    setLoading(true);
    let data = await loadSingleProduct(productId, lineId);
    setProductDetails([data]);
    setLoading(false);
  };

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

  const reLoadCaptchaKey = () => {
    googleCaptcha.current.execute();
  };
  return (
    <>
      <ReCaptcha
        ref={googleCaptcha}
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
        action="addToCart"
        verifyCallback={handleVerify}
        key={key}
      />{" "}
      <Header />
      {!loading ? (
        <>
          <ProductDescription
            productData={productDetails}
            reCaptcha={token}
            reLoadCaptchaKey={reLoadCaptchaKey}
          />
          <FavouriteProducts
            skuId={productDetails[0]?.data[0]?.product.sku}
            reCaptcha={token}
            reloadRecaptcha={reloadRecaptcha}
          />
        </>
      ) : (
        <>
          <div>
            <div class="skeleton-uuypnq47b80"></div>{" "}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductDetail;
