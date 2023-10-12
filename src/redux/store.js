import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./msgsSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
export default store;
