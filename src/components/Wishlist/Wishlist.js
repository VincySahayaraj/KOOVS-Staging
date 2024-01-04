import React, { useEffect } from "react";
import WishlistProduct from "./WishlistProduct";

const Wishlist = ({ products,getWishlistItemsByBatchId }) => {
  return (
    <>
      <section className="wishlist-section pt-5">
        <p className="mobile-wishheading d-sm-block d-lg-none">Wishlist</p>
        <div className="row gx-7">
          <WishlistProduct products={products} getWishlistItemsByBatchId={getWishlistItemsByBatchId}/>

          <section className="share-wishlist d-sm-block d-lg-none">
            <p>
              {" "}
              Share your wishlist with friends and family. Maybe your wish will
              come true!
            </p>
            <div className="share-frds d-flex">
              <button type="button" className="share-button">
                share
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
