import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice.js';
// import supportStatusReducer from '../features/supportJointedRoom.js'; 
import supportReducer from '../features/supportSlice.js'
import socketIOReducer from '../features/socketIoSlice.js'


const store = configureStore({
  reducer: {
    user: userReducer,
    roomId:supportReducer,
    socketIO:socketIOReducer,

  },
});

export default store;
