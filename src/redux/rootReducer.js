import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducer";
import userReducer from "./user/userReducer";
import wishlistReducer from "./wishlist/wishlistReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist:wishlistReducer
});
export default rootReducer;
