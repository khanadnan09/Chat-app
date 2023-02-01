import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../ReduxStore/UserSlice";
export const store = configureStore({
  reducer: {
    user:UserReducer
  },
})