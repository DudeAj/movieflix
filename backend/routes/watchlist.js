const express = require('express');
const AppError = require('../utils/AppError');
const router = express.Router();
const auth = require('../middlewares/auth');
const WatchlistModel = require('../models/watchlist');


router.post('/add-watchlist', auth, async (req, res, next) => {
    const { tokeninfo } = req;
    const { itemId, poster, type } = req.body;

    try {
        WatchlistModel.create({ userid: tokeninfo.id, itemId: itemId, poster: poster, type: type }, (err, result) => {
            if (err) throw new AppError(err, 404);
            if (result) {
                res.json({ sendStatus: 200, status: 1, message: "Added to the Watch List" });
            }
        });
    }
    catch (err) {
        next(err, 404)
    }
});

router.get('/watchlist', auth, async (req, res, next) => {
    const { tokeninfo } = req;
    try {
        WatchlistModel.find({ userid: tokeninfo.id }, (err, result) => {
            if (err) throw new AppError(err, 404);

            if (result) {
                const responsedata = [];
                result.forEach(item => {
                    const dataset = {
                        id: item._id,
                        itemId: item.itemId,
                        poster: item.poster,
                        type: item.type,
                    }
                    responsedata.push(dataset)
                })
                console.log(result)
                res.json({ sendStatus: 200, status: 1, results: responsedata });
            }
        })
    } catch (err) {

    }
})


module.exports = router;