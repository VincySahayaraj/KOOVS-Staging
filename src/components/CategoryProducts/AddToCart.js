import React, { useEffect, useState } from "react";
import style from "./addtocart.module.css";
import { GrClose } from "react-icons/gr";
import "./arrowandborder.css";
import { getProductByBatchIdAPI } from "../../api/commonApi";
import { useDispatch } from "react-redux";
import { addToCartAPI } from "../../api/cart";
import toast from "react-hot-toast";
const Addtocart = ({ setCart, item, token, reloadRecaptcha }) => {
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  useEffect(() => {
    if (item) setCurrentItem(item);
    loadSizeBysku(item.sku);
  }, [item]);

  const loadSizeBysku = async (skuId) => {
    let { data } = await getProductByBatchIdAPI(skuId);
    console.log(data);
    setProductDetail(data[0]);
  };

  // set the size of the selected product
  const selectSize = (id) => {
    if (!selectedColor) {
      setSelectedColor(productDetail.attributes?.colors[0].id);
    }
    console.log("size change", id);
    setSelectedSize(id);
  };

  // add to cart functionality

  const addProductToCart = async (product) => {
    setBtnLoading(true);
    // checking if product has only one color then keeps the product's default color to selected

    if (selectedSize && selectedColor) {
      // mapping the SKUID of product that corresponding to color and size id.
      const result = await productDetail.mapping.data.filter(getSkuId);

      function getSkuId(obj) {
        return obj.colorId == selectedColor && obj.sizeId == selectedSize;
      }
      let skuId = result[0].skuId;
      let prodDetails = await productDetail.quantity.data.filter(
        getProudctBySkuId
      );
      function getProudctBySkuId(obj) {
        return obj.skuId == skuId;
      }

      prodDetails = {
        product: prodDetails[0],
        reCaptcha: token,
      };

      // add to cart api
      let data = await addToCartAPI(prodDetails);
      if (data) {
        let cart = {
          product: { sku: prodDetails.product.skuId },
          qty: 1,
          vendor: prodDetails.product.feDetails.vendor,
          warehouse: prodDetails.product.feDetails.warehouse,
          lot: prodDetails.product.feDetails.lot,
        };

        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        }); // increase the cart count.
      }
    } else {
      toast.error("Please select a variant");
    }
    setBtnLoading(false);
    reloadRecaptcha();
  };

  return (
    <>
      <div className={style.view_addtocart} style={{ bottom: "80px" }}>
        <div className="container">
          <div className={`${style.closebutton} d-flex `}>
            <GrClose className={style.closeicon} onClick={() => setCart("")} />
            <p className={`${style.filterbutton} d-flex `}>Choose Size</p>
          </div>

          <div className={style.sizebutton_align}>
            <p>SIZE</p>
            <div className={style.button_model}>
              {productDetail?.attributes?.sizes.map((size) => {
                return (
                  <>
                    <span
                      type="button"
                      className={`${size.isOutOfStock && "crossbutton"} ${
                        style.size_button
                      } ${selectedSize == size.id && style.added_to_cart}`}
                      onClick={() => !size.isOutOfStock && selectSize(size.id)}
                    >
                      {size.code}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
          <p style={{ color: "#000", fontSize: "12px", fontWeight: "500" }}>
            {productDetail?.product?.styletipMaterial}
          </p>
        </div>

        {!btnLoading ? (
          <button
            type="button"
            className={style.cartbutton}
            onClick={() => addProductToCart(productDetail?.product)}
          >
            ADD TO CART
          </button>
        ) : (
          <button type="button" className={style.cartbutton}>
            PLEASE WAIT..
          </button>
        )}
      </div>
    </>
  );
};

export default Addtocart;
