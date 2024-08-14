import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSlice"
import adminReducer from "./AdminSlice"
export const store=configureStore({
    reducer:{
        products:productReducer,
        user:userReducer,
        admin:adminReducer,
    },
    middleware:(getDefaltMiddleware)=>getDefaltMiddleware({
        serializableCheck:false
    })
})