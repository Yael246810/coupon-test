import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  adminType: null,
};

export const ActionType = {
  LOGGED_IN_AS_ADMIN: "LOGGED_IN_AS_ADMIN",
  LOGGED_OUT: "LOGGED_OUT",
};

const guardSlice = createSlice({
  name: "guard",
  initialState,
  reducers: {
    loggedInAsAdmin(state, action) {
      state.isAdmin = true;
      state.adminType = action.payload.adminType;
    },

    loggedOut(state) {
      state.isAdmin = false;
      state.adminType = null;
    },
  },
});

export const { loggedInAsAdmin, loggedOut } = guardSlice.actions;

export const guardReducer = guardSlice.reducer;
