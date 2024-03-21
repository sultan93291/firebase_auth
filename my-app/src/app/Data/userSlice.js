import { createSlice } from "@reduxjs/toolkit";

const initialState = {
user:null
};

// Action creators and reducers...

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = state => state.user.user;
const reducerUser = userSlice.reducer;

export default reducerUser;
