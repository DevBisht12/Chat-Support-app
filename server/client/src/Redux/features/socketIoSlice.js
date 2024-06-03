import { createSlice } from "@reduxjs/toolkit";

const initialState={
    socketIO:''
}


export const socketIOSlice= createSlice({
    name:'socketIO',
    initialState,
    reducers:{
        setSocketIO:(state,action)=>{
            state.socketIO=action.payload
        }
    }
})


export const {setSocketIO}=socketIOSlice.actions

export default socketIOSlice.reducer;