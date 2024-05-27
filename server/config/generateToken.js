import jwt from 'jsonwebtoken';

const jwt_secret = 'jflkjlkavlkamlaksmslka';

const generateToken = (id) => {
    return jwt.sign({ id }, jwt_secret, {
        expiresIn: '3d'
    });
};

export default generateToken;
