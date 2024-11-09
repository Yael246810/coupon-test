import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupons: [],
};

export const ActionType = {
  GOT_ALL_COUPONS: "GOT_ALL_COUPONS",
  GOT_SINGLE_COUPON: "GOT_SINGLE_COUPON",
  ADDED_COUPON: "ADDED_COUPON",
  UPDATED_COUPON: "UPDATED_COUPON",
  DELETED_COUPON: "DELETED_COUPON",
  REMOVED_COUPONS: "REMOVED_COUPONS",
};

const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    gotAllCouponsAction(state, action) {
      state.coupons = action.payload;
    },
    gotSingleCouponAction(state, action) {
      state.coupons.push(action.payload);
    },

    addedCouponAction(state, action) {
      state.coupons.push(action.payload.coupon);
    },

    updatedCouponAction(state, action) {
      const updatedCoupon = action.payload;
      const idx = state.coupons.findIndex(
        (coupon) => coupon.id === updatedCoupon.id
      );

      if (idx !== -1) {
        state.coupons[idx] = { ...state.coupons[idx], ...updatedCoupon };
      }
    },

    deletedCouponAction(state, action) {
      state.coupons = state.coupons.filter(
        (coupon) => coupon.id !== action.payload
      );
    },

    removeCoupons(state) {
      state.coupons = [];
    },
  },
});

export const {
  gotAllCouponsAction,
  gotSingleCouponAction,
  addedCouponAction,
  updatedCouponAction,
  deletedCouponAction,
  removeCoupons,
} = couponsSlice.actions;

export const couponsReducer = couponsSlice.reducer;
