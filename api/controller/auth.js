import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {} from 'express-async-errors'
import * as userREpository from '../data/auth.js'

const jwtSecretKey = '1232312313'
const jwtExpiresInDays = '2d'
const bcrptSaltRounds = 10

export async function signup(req, res) {
    const { username, password, name, email, url } = req.body;
    const found = await userREpository.findByUsername(username);
    if( found ) {
        return res.status(409).json( 
            { message: `${username} already exists`}
        )
    }
    const hashed = await bcrypt.hash(password, bcrptSaltRounds)
    const userId = await userREpository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    })
    const token = createJwtToken(userId)
    res.status(201).json( { token, username })
}

export async function login(req, res) {
    const { username, password } = req.body;
    const user = await userREpository.findByUsername(username);
    if (!user) {
        return res.status(404).json({ 
            message: `Invalid user or password`
        })
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
          message: 'Invalid user or password'
      })  
    }
    const token = createJwtToken(user.id)
    res.status(200).json( {
        token, username
    })
}

function createJwtToken(id) {
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays})
}