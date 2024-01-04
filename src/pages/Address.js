import React, { useEffect, useState } from "react";
import AddressComponent from "../components/AddressComponent/AddressComponent";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { loadMyAddressDetailsApi } from "../api/checkout";
const Address = () => {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    loadAddressDetails();
  }, []);

  const loadAddressDetails = async () => {
    let data = await loadMyAddressDetailsApi();
    setAddress(data);
  };

  return (
    <>
      <Header />
      <AddressComponent
        address={address}
        loadAddressDetails={loadAddressDetails}
      />
      <Footer />
    </>
  );
};

export default Address;
