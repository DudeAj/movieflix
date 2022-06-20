const express = require('express');
const AppError = require('../utils/AppError');
const router = express.Router();
const auth = require('../middlewares/auth');
const WatchlistModel = require('../models/watchlist');


router.post('/add-watchlist', auth, async (req, res, next) => {
    const { tokeninfo } = req;
    const { itemId, poster, type } = req.body;

    try {

        WatchlistModel.find({ userid: tokeninfo.id, itemId: itemId }, (err, data) => {
            if (data.length > 0) {

                next(new AppError("Already in watchlist", 201));
            }
            else {
                WatchlistModel.create({ userid: tokeninfo.id, itemId: itemId, poster: poster, type: type }, (err, result) => {
                    if (err) throw new AppError(err, 404);
                    if (result) {
                        res.json({ sendStatus: 200, status: 1, message: "Added to the Watch List" });
                    }
                });
            }
        })

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
                    if (!item.watched) {
                        const dataset = {
                            id: item._id,
                            itemId: item.itemId,
                            poster: item.poster,
                            type: item.type,
                            watched: item.watched
                        }
                        responsedata.push(dataset)
                    }
                })
                res.json({ sendStatus: 200, status: 1, results: responsedata });
            }
        })
    } catch (err) {
        next(err, 404)
    }
});

router.get('/watched', auth, async (req, res, next) => {
    const { tokeninfo } = req;
    try {
        WatchlistModel.find({ userid: tokeninfo.id }, (err, result) => {
            if (err) throw new AppError(err, 404);
            if (result) {
                const responsedata = [];
                result.forEach(item => {
                    if (item.watched) {
                        const dataset = {
                            id: item._id,
                            itemId: item.itemId,
                            poster: item.poster,
                            type: item.type,
                            watched: item.watched
                        }
                        responsedata.push(dataset)
                    }

                })
                res.json({ sendStatus: 200, status: 1, results: responsedata });
            }
        })
    } catch (err) {
        next(err, 404)
    }
});

router.post('/add-watched', auth, async (req, res, next) => {
    const { tokeninfo } = req;
    const { itemId } = req.body;



    try {
        //find and update the watched status
        WatchlistModel.findOneAndUpdate({ userid: tokeninfo.id, itemId: itemId }, { watched: true }, (err, result) => {
            if (err) throw new AppError(err, 404);
            if (result) {
                res.json({ sendStatus: 200, status: 1, message: "Added to Watched" });
            }
        });
    }
    catch (err) {
        next(err, 404)
    }
});

router.post('/delete', auth, async (req, res, next) => {
    const { tokeninfo } = req;
    const { itemId } = req.body;



    try {
        //find and update the watched status
        WatchlistModel.findOneAndRemove({ userid: tokeninfo.id, itemId: itemId }, (err, result) => {
            if (err) throw new AppError(err, 404);
            if (result) {
                res.json({ sendStatus: 200, status: 1, message: "Item Successfully Deleted" });
            }
        });
    }
    catch (err) {
        next(err, 404)
    }
});



module.exports = router;