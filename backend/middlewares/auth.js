require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const AppErrr = require('../utils/AppError');
module.exports = (req, res, next) => {
    const token = req.headers['auth-token'];

    if (!token) {
        console.log('token Not Found', token)
        next(new AppErrr("token Not Found", 404))
    }
    else {
        try {
            const tokeninfo = jwt.verify(token, process.env.JWT_SECRET)

            UserModel.findOne({ _id: tokeninfo.id }, (err, data) => {
                if (!data) {
                    next(new AppErrr("user does not exist", 404));
                }
                req.tokeninfo = tokeninfo
                next();
            })
        }
        catch (err) {
            next(new AppErrr("Token Expired", 404));
        }
    }
}
