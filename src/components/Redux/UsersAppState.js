import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const ActionType = {
  GOT_ALL_USERS: "GOT_ALL_USERS",
  ADDED_USER: "ADDED_USER",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    gotAllUsersAction(state, action) {
      state.users = action.payload;
    },

    addedUserAction(state, action) {
      state.users.push(action.payload);
    },
  },
});

export const { gotAllUsersAction, addedUserAction } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
