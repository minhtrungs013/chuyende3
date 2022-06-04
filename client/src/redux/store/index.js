import authReducer from "../login/index.js";

import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: { auth: authReducer},
});
export default store;
