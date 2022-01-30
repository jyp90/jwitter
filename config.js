import env from 'dotenv'
env.config();

function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue
    if(value == null) {
        throw new Error(`Key ${key} is undefined`)
    }
    return value
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('EXPIRES_SECONDS', 1800))
    },
    bcrypt: {
        salts: parseInt(required('SALT_ROUNDS', 10))
    },
    host: {
        port: parseInt(required('SERVER_PORT', 8080))
    }
}