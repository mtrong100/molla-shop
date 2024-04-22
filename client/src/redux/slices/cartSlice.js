import { createSlice } from "@reduxjs/toolkit";
import { COUPON_CODES } from "../../utils/constants";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    shippingMethod: {
      name: "Standard",
      price: 10.0,
    },
    cart: [],
    couponCode: "molla",
  },
  reducers: {
    selectShipppingMethod: (state, action) => {
      const { name, price } = action.payload;
      state.shippingMethod = {
        name,
        price,
      };
    },
    selectCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    addProductToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product });
      }
    },
    removeProductFromCart: (state, action) => {
      const productId = action.payload;

      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    increaseProductQuantity: (state, action) => {
      const productId = action.payload;

      const product = state.cart.find((item) => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseProductQuantity: (state, action) => {
      const productId = action.payload;

      const product = state.cart.find((item) => item.id === productId);
      if (product) {
        if (product.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== productId);
        } else {
          product.quantity -= 1;
        }
      }
    },
  },
});

export const {
  selectShipppingMethod,
  addProductToCart,
  removeProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  selectCouponCode,
} = cartSlice.actions;

export const calculateSubTotal = (state) =>
  state.cart.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const calculateTotal = (state) => {
  let total = calculateSubTotal(state) + state.cart.shippingMethod?.price;
  const couponCode = state.cart.couponCode;
  if (couponCode) {
    const coupon = COUPON_CODES.find((code) => code.label === couponCode);
    if (coupon) {
      const discountAmount = (calculateSubTotal(state) * coupon.discount) / 100;
      total -= discountAmount;
    }
  }
  return total;
};
export default cartSlice.reducer;
