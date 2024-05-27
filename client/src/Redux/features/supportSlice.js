import {createSlice} from '@reduxjs/toolkit'


const initialState={
    roomId:''
}


export const roomIdSlice= createSlice({
    name:'roomId',
    initialState,
    reducers:{
        getRoomId:(state,action)=>{
            state.roomId=action.payload
        }
    }
});


export const {getRoomId}=roomIdSlice.actions;

export default roomIdSlice.reducer; 