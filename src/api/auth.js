import axios from "axios";
import { toast } from "react-hot-toast";

const clientServer = process.env.REACT_APP_CLIENT_SERVER;

// check if user is valid for signup a user.
export const checkIfUserValid = async (userData) => {
  let authToken = await JSON.parse(localStorage.getItem("guestToken"));
  const config = {
    headers: {
      "X-AUTH-TOKEN": authToken,
      "X-API-CLIENT": "WEB",
    },
  };
  let obj = {};

  try {
    let response = await axios.post(
      clientServer + "/koovs-auth-service/v1/auth/validate-user",
      { email: userData.email, phone: userData.phoneNumber },
      config
    );

    if (response.status == 200) {
      obj = {
        error: false,
      };
      return obj;
    }
  } catch (err) {
    obj = {
      error: true,
      message: err?.response?.data?.errorMessage,
    };
    return obj;
  }
};

//Api for registering the user to website
export const signUpUserApi = async (userData, token) => {
  let authToken = await JSON.parse(localStorage.getItem("guestToken"));

  try {
    let ipAddress = await getMyIpAddress();
    const config = {
      headers: {
        "X-API-CLIENT": "WEB",
        "X-AUTH-TOKEN": authToken,
        "X-CAPTCHA-TOKEN": token,
        "X-CAPTCHA-ACTION": "sign_up",
        "X-REMOTE-IP": ipAddress,
      },
    };
    let userPayload = {
      name: userData.fullName,
      email: userData.email,
      phone: userData.phoneNumber,
      password: userData.password,
      gender: userData.gender,
    };

    let { data } = await axios.post(
      clientServer + "/koovs-auth-service/v1/auth/sign-up",
      userPayload,
      config
    );
    if (!data.errorMessage) {
      toast.success("Successfully created account");
      return data;
    } else return false;
  } catch (err) {
    console.log("err", err);
  }
};

//gather the IP address of user
export const getMyIpAddress = async () => {
  try {
    const res = await axios.get("https://geolocation-db.com/json/");

    return res.data.IPv4;
  } catch (err) {
    console.log("err");
  }
};

// check user's token api //retrieve user data then

export const checkUserToken = async () => {
  const config = {
    headers: {
      "X-API-CLIENT": "WEB",
      "X-AUTH-TOKEN": JSON.parse(localStorage.getItem("userToken")),
    },
  };
  try {
    const res = await axios.get(
      clientServer + "/koovs-auth-service/v1/auth/validate-token",
      config
    );

    return res.data;
  } catch (err) {
    console.log("err", err);

    return false;
  }
};

export const userLoginAPI = async (userData) => {
  let ipAddress = await getMyIpAddress();
  const config = {
    headers: {
      "X-API-CLIENT": "WEB",
      "X-AUTH-TOKEN": JSON.parse(localStorage.getItem("guestToken")),
      "X-CAPTCHA-ACTION": "login",
      "X-REMOTE-IP": ipAddress,
      "X-CAPTCHA-TOKEN": userData?.reCaptcha,
    },
  };
  try {
    const res = await axios.post(
      clientServer + "/koovs-auth-service/v1/auth/login",
      { email: userData.email, password: userData.password },
      config
    );
    localStorage.setItem("userToken", JSON.stringify(res.data.data.token));
    toast.success("Successfully Logged In");
    return res.data.data;
  } catch (err) {
    let data = {
      message: err.response.data.errorMessage,
      error: true,
    };
    return data;
  }
};

export const getVisitorToken = async () => {
  try {
    const config = {
      headers: {
        "X-API-CLIENT": "WEB",
        "Access-Control-Allow-Origin": "*",
      },
    };
    let { data } = await axios.post(
      clientServer + "/koovs-auth-service/v1/auth/register-client",
      {},
      config
    );

    let token = data.data.token;
    return token;
  } catch (err) {
    console.log("err", err);
  }
};
