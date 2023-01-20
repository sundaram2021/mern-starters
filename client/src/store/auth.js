import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    getUser: (user, {payload}) => {
        console.log(user);
        user.user = payload.user;
        user.isAuthenticated = true;
    },
  },
});

export const { getUser} = authSlice.actions
export default authSlice.reducer