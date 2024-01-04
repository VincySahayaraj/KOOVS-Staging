// all apis related to checkout can be found here..

import axios from "axios";
import toast from "react-hot-toast";
const clientServer = process.env.REACT_APP_CLIENT_SERVER;
export const loadMyAddressDetailsApi = async () => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      Authorization: authToken,
      "X-API-CLIENT": "WEB",
    },
  };

  try {
    let { data } = await axios.get(
      clientServer + "/jarvis-order-service/v1/address",
      config
    );
    console.log("this is data", data);
    return data;
  } catch (err) {}
};

export const selectAddressApi = async (id) => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      Authorization: authToken,
      "X-API-CLIENT": "WEB",
    },
  };
  try {
    let { data } = await axios.put(
      clientServer + `/jarvis-order-service/v2/address/select/${id}`,
      {},
      config
    );

    return data;
  } catch (err) {}
};

// add new address

export const addNewAddressApi = async (address) => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      Authorization: authToken,
      "X-API-CLIENT": "WEB",
    },
  };
  try {
    let data = await axios.post(
      clientServer + `/jarvis-order-service/v1/address`,
      address,
      config
    );

    if (data.status == 200) {
      toast.success("created new address");
      return true;
    } else {
      return false;
    }
  } catch (err) {
    toast.error(err.response.data.message);
    return false;
  }
};

export const getCurrentSelectedAddress = async () => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      Authorization: authToken,
      "x-api-client": "WEB",
    },
  };
  try {
    let { data } = await axios.get(
      clientServer + `/jarvis-order-service/v2/address/select`,
      config
    );
    console.log("-----", data);
    return data;
  } catch (err) {
    toast.error("Something went wrong");
    return false;
  }
};

export const getPaymentGatewaysApi = async () => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      Authorization: authToken,
      "x-api-client": "WEB",
    },
  };
  try {
    let { data } = await axios.get(
      clientServer + `/jarvis-order-service/v2/payment/batch/payment-modes-v3`,
      config
    );

    return data;
  } catch (err) {
    toast.error("Something went wrong");
    return false;
  }
};

export const checkForActiveOffersApi = async () => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      Authorization: authToken,
      "x-api-client": "WEB",
    },
  };
  try {
    let { data } = await axios.get(
      clientServer + `/jarvis-order-service/v2/payment/apply-offer-discount`,
      config
    );

    console.log("data from discount", data);
    return data;
  } catch (err) {

    return false;
  }
};
