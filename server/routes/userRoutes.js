import express from 'express';
import UserController from '../controllers/userController.js';

const app = express();


// app.get('/',(req,res)=>{
//     res.send('Testing user routes')
// })
app.post('/signup',UserController.registerUser)
app.post('/login',UserController.loginUser)
app.get('/getallusers',UserController.getAllUsers)
app.get(`/userdetails/:id`, UserController.getUserDetails);
app.post('/update/User',UserController.updateUserDetails)


export default app