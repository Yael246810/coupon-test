import { createSlice } from "@reduxjs/toolkit";

// Initial state without TypeScript types
const initialState = {
  id: 0,
  token: "",
  email: "",
  type: "ADMIN", // Assuming ClientType.ADMIN is just a string value
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
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.type = action.payload.type;
      console.log(
        "new state after login - token= " +
          state.token +
          " type = " +
          state.type +
          " email: " +
          state.email
      );
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
