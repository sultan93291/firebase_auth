import reducerUser from "@/app/Data/userSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    user: reducerUser,
  },
});
