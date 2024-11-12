import { createSlice } from "@reduxjs/toolkit";

// Initial state for admin authentication
const initialState = {
  isAdmin: false, // Tracks if the user is an admin
  adminType: null, // Will hold the type of admin (e.g., super admin, regular admin)
};

// Action types for login/logout
export const ActionType = {
  LOGGED_IN_AS_ADMIN: "LOGGED_IN_AS_ADMIN",
  LOGGED_OUT: "LOGGED_OUT",
};

const guardSlice = createSlice({
  name: "guard",
  initialState,
  reducers: {
    // Action when the user logs in as an admin
    loggedInAsAdmin(state, action) {
      state.isAdmin = true;
      state.adminType = action.payload.adminType;
    },

    // Action when the user logs out
    loggedOut(state) {
      state.isAdmin = false;
      state.adminType = null;
    },
  },
});

// Export the actions to use them in components
export const { loggedInAsAdmin, loggedOut } = guardSlice.actions;

// Export the reducer to configure the store
export const guardReducer = guardSlice.reducer;
