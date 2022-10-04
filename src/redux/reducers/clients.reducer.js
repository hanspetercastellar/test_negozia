import { createSlice } from "@reduxjs/toolkit";


const reducer = createSlice({
    name:"clients",
    initialState: {
        items:[],
        rowEditing: {},
        openEditModal: false,
        statusSaved: {},
    },
    reducers: {
        successClients: (state, action)  => {
            console.log(action)
            state.items = action.payload
        },
        success: (state, action) => {
            state.statusSaved = action.payload;
        },
        failure: (state, action) => {

        },
        rowEditing: (state, action) => {
            state.rowEditing = action.payload
        },
        openModal: (state, action) => {
            state.openModal = action.payload
        }
    }

})

export const actionsConst = {
    FETCH_ALL: 'FETCH_ALL',
    POST_CLIENT: 'POST_CLIENT',
    PATCH_CLIENT: 'PATCH_CLIENT',
    DELETE_CLIENT: 'DELETE_CLIENT',
}

export const { successClients, openModal, success,rowEditing } = reducer.actions

export default reducer.reducer