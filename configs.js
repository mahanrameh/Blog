require('dotenv').config();


module.exports = {
    db: {
        uri: process.env.DB_URI,
        poolSize: process.env.DB_POOL_SIZE || 10
    },

    port: parseInt(process.env.PORT,) || 4000,

    auth: {
        accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS,
        refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS,
    }
}