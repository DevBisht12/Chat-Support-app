import express from 'express';
import userAuth from '../middleware/authUser.js';
const app = express();

// app.post('/',userAuth,accessChat)
// app.post('/creategroup',userAuth,createGroup)

export default app