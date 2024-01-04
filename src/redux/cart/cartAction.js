import { ADD_TO_CART, REMOVE_FROM_CART, MERGE_CART } from "./cartType";
import { getProductByBatchIdAPI } from "../../api/commonApi";

// merges the cart item from guest token and usertoken
// export const mergeCartItems = async () => {
//   let sku = [];
//   for (let i = 0; i < cartProducts.items.length; i++) {
//     sku.push(data.items[i].product.sku);
//   }
//   sku = sku.toString();
//   let result = await getProductByBatchIdAPI(sku);
//   console.log("this is result", result);
// };
