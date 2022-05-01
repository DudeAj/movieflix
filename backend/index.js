const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const AppError = require("./utils/AppError")
const UserRoutes = require("./routes/user");
const WatchlistRoutes = require("./routes/watchlist")
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/api/watch', WatchlistRoutes);
app.use("/api/user", UserRoutes);

mongoose.connect("mongodb://localhost:27017/movieflix", (err, res) => {
    if (err) throw err;
    console.log("connected with the database")
});


app.get('/', (req, res) => {
    res.send("how are you doing today");
});

app.all("*", (req, res, next) => {
    const err = new AppError(`Requested URL ${req.path} not found!`, 404);
    next(err);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.json({
        statusCode: statusCode,
        success: 0,
        message: err.message
    })
})

app.listen(9000, () => {
    console.log("Server Started on port 9000");
});