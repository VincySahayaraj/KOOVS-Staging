import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP, USER_UPDATE } from "./userType";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const userReducer =  (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      localStorage.setItem("userToken", JSON.stringify(action.payload.token));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
      };

    case USER_LOGIN:
      return { ...state, isLoggedIn: true, user: action.payload.data };

    case USER_LOGOUT:
      localStorage.removeItem("userToken");

      return { isLoggedIn: false, user: null };

    case USER_UPDATE:
      return { ...state, isLoggedIn: true, user: action.payload };

    default:
      return state;
  }
};

export default userReducer;
