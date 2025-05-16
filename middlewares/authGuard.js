const jwt = require("jsonwebtoken");
const configs = require("./../configs");

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.cookies['access-token'];
        
        if (accessToken) {
            const decoded = jwt.verify(
                accessToken, 
                configs.auth.accessTokenSecretKey
            );

            if (decoded.role == 'admin') {
                req.user = decoded;

                next();
            } else {
                return res.redirct('/auth/login');
            }

        } else {
            return res.redirct('/auth/login');
        }


    } catch (err) {
        return res.redirct('/auth/login');
    }
};