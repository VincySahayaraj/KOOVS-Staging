import axios from "axios";
import { toast } from "react-hot-toast";

const clientServer = process.env.REACT_APP_CLIENT_SERVER;

export const getMyProfileApi = async () => {
  const config = {
    headers: {
      "X-API-CLIENT": "WEB",
      "X-AUTH-TOKEN": JSON.parse(localStorage.getItem("userToken")),
    },
  };
  try {
    const res = await axios.get(
      clientServer + "/koovs-auth-service/v1/auth/update-password",
      config
    );

    return res.data;
  } catch (err) {
    return false;
  }
};

export const getMyAddressApi = async () => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      "X-API-CLIENT": "WEB",
      Authorization: authToken,
      "X-AUTH-TOKEN": authToken,
    },
  };
  try {
    const res = await axios.get(
      clientServer + "/jarvis-order-service/v1/address",
      config
    );

    return res.data;
  } catch (err) {
    console.log("err", err);

    return false;
  }
};

export const updateProfileApi = async (profileData) => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      "X-API-CLIENT": "WEB",
      Authorization: authToken,
      "X-AUTH-TOKEN": authToken,
    },
  };
  try {
    const res = await axios.put(
      clientServer + "/koovs-auth-service/v1/auth/update-profile",
      profileData,
      config
    );

    toast.success("Profile updated successfully");
    return res.data;
  } catch (err) {
    console.log("err", err);

    return false;
  }
};

export const deleteAddressApi = async (id) => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      "X-API-CLIENT": "WEB",
      Authorization: authToken,
    },
  };
  try {
    const res = await axios.delete(
      clientServer + "/jarvis-order-service/v1/address/" + id,
      config
    );

    toast.success("Address successfully Deleted");
    return true;
  } catch (err) {
    console.log("err", err);

    return false;
  }
};

export const editAddressApi = async (address) => {
  let authToken = await JSON.parse(localStorage.getItem("userToken"));

  const config = {
    headers: {
      "X-API-CLIENT": "WEB",
      Authorization: authToken,
    },
  };
  try {
    const res = await axios.put(
      clientServer + "/jarvis-order-service/v1/address",
      address,
      config
    );

    toast.success("Address updated successfully");
    return true;
  } catch (err) {
    console.log("err", err);
    toast.error(err.response.data.message);
    return false;
  }
};
