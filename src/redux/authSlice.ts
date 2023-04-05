import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: "",
  },
  reducers: {
    login: (state, action:PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    logout: (state) => {
      state.authToken = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;