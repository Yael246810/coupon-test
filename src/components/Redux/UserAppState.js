import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  email: "",
  type: "ADMIN",
};

export const ActionType = {
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_LOGGED_OUT: "USER_LOGGED_OUT",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedInAction(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.type = action.payload.type;
    },

    userLoggedOutAction(state) {
      state.email = initialState.email;
      state.id = initialState.id;
      state.token = initialState.token;
      state.type = initialState.type;
    },
  },
});

export const { userLoggedInAction, userLoggedOutAction } = userSlice.actions;

export const userReducer = userSlice.reducer;
