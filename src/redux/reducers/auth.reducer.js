import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:null,
    loading:false,
    fail:false,
    udata:{}
}

const authReducer = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {
        successLogin: (state, action)  => {
            state.udata = action.payload.user
            state.token = action.payload.access_token
            state.loading = false
            state.fail = false
        },
        isFetching: (state, action) => {
            state.loading = action.payload
            state.fail = false
        },
        failedLogin: (state, action) => {
            state.loading = false
            state.fail = true
        }
    }

})

export const { successLogin, failedLogin, isFetching } = authReducer.actions

export const loggedIn = (state) => state.auth.token
export const loading = (state) => state.auth.loading
export const loginFail = (state) => state.auth.fail

export const actionAuth = {
    LOGIN: 'LOGIN',
}
 
export default authReducer.reducer