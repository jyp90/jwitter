import jwt from 'jsonwebtoken'
import * as userRepository from '../data/auth'
import env from 'dotenv';

const AUTH_ERR = { message : 'Authentication Failed'}

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERR)
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token, 
        env.SECRET_KEY,
        async (error, decoded) => {
            if(error) {
                return res.status(401).json(AUTH_ERR)
            }
            const user = await userRepository.findById(decoded.id)
            if (!user) {
                return res.status(401).json(AUTH_ERR)
            }
            req.userId = user.id;
            next();
        }
    )
} 