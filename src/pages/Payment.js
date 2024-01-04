import React, { useEffect, useState } from "react";
import {
  checkForActiveOffersApi,
  getCurrentSelectedAddress,
  getPaymentGatewaysApi,
} from "../api/checkout";
import Header from "../components/Header/Header";
import PaymentSection from "../components/PaymentSection/PaymentSection";

function PaymentPage() {
  const [paymentModes, setPaymentModes] = useState("");
  const [addressDetails, setAddressDetails] = useState();
  const [selectedPaymentGateway,setSelectedPaymentGateway]=useState("")

  useEffect(() => {
    loadPaymentGateways();
  }, []);
  const loadPaymentGateways = async () => {
    let result = await getPaymentGatewaysApi();

    console.log("result", result);
    setPaymentModes(result?.data?.paymentModes);
    let address = await getCurrentSelectedAddress();
    setAddressDetails(address);
  };

  const checkForActiveOffers = async (item) => {
  let obj={
    
  }
    await checkForActiveOffersApi();
  };
  return (
    <>
      <Header />
      <PaymentSection
        paymentModes={paymentModes}
        addressDetails={addressDetails}
        checkForActiveOffers={checkForActiveOffers}
        setSelectedPaymentGateway={setSelectedPaymentGateway}
        selectedPaymentGateway={selectedPaymentGateway}
      />
    </>
  );
}

export default PaymentPage;
