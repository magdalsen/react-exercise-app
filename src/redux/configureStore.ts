import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import authReducer from "./authSlice";
import counterReducer from "./moneySlice"
import orderSlice from "./orderSlice"

const reducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  invoice: orderSlice,
});
export const store = configureStore({ reducer });
// dodajemy dodatkowe hooki i typy do zabezpieczenia reduxa
// typescript wywnioskuje RootState z store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;