import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth.reducer'
import clientReducer from "./clients.reducer";

const slices = combineReducers({
    auth: authReducer,
    client: clientReducer
})

export default slices