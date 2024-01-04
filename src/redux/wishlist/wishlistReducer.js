import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  INITIALIZE_WISHLIST,
} from "./wishlistType";

const initialState = {
  items: [],
};

const wishlistReducer = (state = initialState, action) => {
  var doesItemExist;

  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case REMOVE_FROM_WISHLIST:
      let remainingArr = state.items.filter(
        (item) => item.sku != action.payload.skuId
      );
      return {
        items: remainingArr,
      };

    case INITIALIZE_WISHLIST:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};
export default wishlistReducer;
