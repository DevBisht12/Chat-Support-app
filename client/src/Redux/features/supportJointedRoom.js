import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSupportJoined: false,
};

export const supportStatusSlice = createSlice({
  name: 'supportRoomStatus',
  initialState,
  reducers: {
    checkSupportStatus: (state, action) => {
      state.isSupportJoined = action.payload;
    }
  }
});

export const { checkSupportStatus } = supportStatusSlice.actions;

export default supportStatusSlice.reducer;
