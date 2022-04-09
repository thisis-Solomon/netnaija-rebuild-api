const express = require("express");
const rateLimiter = require("express-rate-limit")

const firstPageMoviesRouter = require("./routers/firstPageMovies")
const singleMovieRouter = require("./routers/singleMovie")
const nextPageMoviesRouter = require("./routers/nextPageMovies");
const path = require("path");

const app = express();
app.use(express.json())
app.use(express.static("public"))

const requestLimit = rateLimiter({
    windowMs: 60 * 60 * 1000, //1hour
    max: 100,
    message: "Too many accounts created from this IP, please try again after an hour",
    standardHeaders: true,
	legacyHeaders: false,
})

const PORT = process.env.PORT || 3002;

app.get("/",(req, res) =>{
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.use("/api", requestLimit ,firstPageMoviesRouter)
app.use("/api", requestLimit, nextPageMoviesRouter)
app.use("/api", requestLimit, singleMovieRouter)

app.listen(PORT, () => console.log(`server listening at: ${PORT}`));