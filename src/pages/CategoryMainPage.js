import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import CategoryHeader from "../components/CategoryProducts/CategoryHeader";
import CategoryMainMenuSlider from "../components/CategoryProducts/MainCategoryMenuSlider";
import CategoryMainProductSlider from "../components/CategoryProducts/MainCategoryProductSlider";
import { useParams } from "react-router-dom";
import {
  loadProductByCategoryApi,
  loadProductsByFilter,
} from "../api/commonApi";
import { useNavigate } from "react-router-dom";
import { addToWishlistAPI, removeItemFromWishList } from "../api/cart";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";
import { useDispatch } from "react-redux";
const CategoryMainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { category } = useParams();
  let { subcategory } = useParams();

  const [result, setResult] = useState();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("relevance");
  const [sortLabel, setSortLabel] = useState("relevance");
  const [filterTypes, setFilterTypes] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [filterType, setFilterType] = useState({
    brand_fq: "",
    color_fq: "",
    price_fq: "",
    size_fq: "",
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const googleCaptcha = useRef();
  const [key, setKey] = useState(1);

  useEffect(() => {
    let loadFromUrl = true;
    loadProductItemsBycategory(loadFromUrl);
  }, [category, subcategory, sort]);

  useEffect(() => {
    let loadFromUrl = false;
    // loading from pagination
    loadProductItemsBycategory(loadFromUrl);
  }, [page]);

  useEffect(() => {
    reloadRecaptcha();
  }, []);

  // reload the recaptcha
  const reloadRecaptcha = async () => {
    setKey(key + 1);

    loadReCaptcha(process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY); //sitekey load recaptcha
  };

  function handleVerify(token) {
    setToken(token);
  }

  //loading product items by category
  const loadProductItemsBycategory = async (loadFromUrl) => {
    if ((category, subcategory)) {
      let data = await loadProductByCategoryApi(
        category,
        subcategory,
        limit,
        sort,
        page
      );
      if (loadFromUrl) {
        setProducts(data[0].data);
        setFilterTypes(data[1].data);
        setResult(data[0]);
      } else {
        setProducts((previous) => [...previous, ...data[0].data]);
      }
    }
  };

  const changeSortOption = async (option, label) => {
    setSort(option);
    setSortLabel(label);
  };

  // apply a new filter
  const applyFilter = (type, val) => {
    if (type == "price_fq") {
      val = val[0] + "-" + val[1];
    }
    const newobj = { ...filterType };
    newobj[type] = val;
    setFilterType(newobj);

    console.log("objj",newobj)
  };

  useEffect(() => {
    loadFilteredResults(filterType);
  }, [filterType]);

  const loadFilteredResults = async () => {
    setLoading(true);
    let filteredResults = await loadProductsByFilter(
      category,
      subcategory,
      limit,
      sort,
      page,
      filterType
    );
    if (filteredResults) {
      setProducts(filteredResults[0]?.data);
      // setFilterTypes(filteredResults[1]?.data);
      setResult(filteredResults[0]);
    }

    setLoading(false);
  };

  //navigates to product detail page by making url friendly
  const goToProductDetailPage = (title, id, lineId) => {
    let slug = title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product/${slug}/${id}/${lineId}`);
  };

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

  return (
    <>
      <ReCaptcha
        key={key}
        ref={googleCaptcha}
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
        action="addToCart"
        verifyCallback={handleVerify}
      />
      <Header />
      <CategoryHeader
        category={category}
        subcategory={subcategory}
        result={result}
        changeSortOption={changeSortOption}
      />
      <CategoryMainMenuSlider products={products} />{" "}
      {/* shows the btn categories*/}
      <CategoryMainProductSlider
        products={products}
        filterTypes={filterTypes}
        result={result}
        changeSortOption={changeSortOption}
        applyFilter={applyFilter}
        filterType={filterType}
        loading={loading}
        setLoading={setLoading}
        goToProductDetailPage={goToProductDetailPage}
        addToWishlist={addToWishlist}
        removeWishlist={removeWishlist}
        page={page}
        token={token}
        setPage={setPage}
        reloadRecaptcha={reloadRecaptcha}
        sortLabel={sortLabel}
      />
    </>
  );
};

export default CategoryMainPage;
