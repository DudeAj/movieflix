const UserModel = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.send("User Routes is working");
});


router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    try {
        UserModel.findOne({ email: email }, async (err, user) => {
            if (err) {
                throw new AppError('User Not Found', 404);
            }

            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    }, process.env.JWT_SECRET);

                    res.send({ statusCode: 200, status: 1, result: { name: user.name, email: user.email }, token: token });

                } else {
                    const err = new AppError('Email / Password is incorrect', 404)
                    next(err)
                }
            }
            else {
                const err = new AppError('Check your email/password combination', 404)
                next(err)
            }
        })
    }
    catch (err) {
        next(err);
    }

});

router.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;

    try {

        let saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        UserModel.findOne({ email: email }, (err, user) => {
            if (err) throw new AppError("Something Went Wrong", 404);
            if (!user) {
                UserModel.create({ name: name, email: email, password: hashPassword }, (err, result) => {
                    if (err) throw new AppError("No Result Found", 404);
                    const token = jwt.sign({
                        id: result._id,
                        name: result.name,
                        email: result.email,
                    }, process.env.JWT_SECRET);
                    res.send({ statusCode: 200, status: 1, result: { name: result.name, email: result.email }, token: token });
                });
            } else {
                next(new AppError("User already exists", 404));
            }
        });
    }
    catch (err) {
        next(err);
    }

});


router.post('/get-user', auth, async (req, res, next) => {
    const { tokeninfo } = req;
    //console.log("get user hit")
    UserModel.findOne({ _id: tokeninfo.id }, async (err, user) => {
        if (err)
            next(new AppError('Unable to Fetch Data', 404))
        if (user) {
            res.send({ statusCode: 200, status: 1, result: { name: user.name, email: user.email } });
        }
    });
});

module.exports = router;