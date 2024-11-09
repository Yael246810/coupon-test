import { guardReducer } from "./GuardAppState";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./UserAppState";
import { couponsReducer } from "./CouponAppState";

const rootReducer = {
  user: userReducer,
  guardReducer: guardReducer,
  couponsReducer: couponsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
