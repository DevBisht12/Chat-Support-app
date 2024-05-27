import jwt from 'jsonwebtoken';
import User from '../database/models/userModel.js';
const jwt_secret = 'jflkjlkavlkamlaksmslka';

const userAuth=async (req, res,next) => {
    let token;

    if(req.headers.authorization&&req.headers.authorization.startswith('Bearer ')){
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token)
            const decoded = jwt.verify(token, jwt_secret);

            req.user= await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized , token not found")
        }
    }
}

export default userAuth;