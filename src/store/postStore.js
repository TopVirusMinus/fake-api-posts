import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        insert:(state, action) =>{

        },
        remove:(state, action) =>{
            state = state.filter(p => p.id != action.payload)
        },
        update:(state, action) =>{
        }
    }
})

const store = configureStore(postSlice);
export const {insert, remove, update} = postSlice.actions;
export default store;

