const express = require("express");
const getMovies = require("../api/getMovies");
const moviesDetails = require("../helpers/movieDetails");
const movies = require("../helpers/moviesArr");
const apicache = require("apicache");

const router = express.Router();
const caches = apicache.middleware;

router.get("/movies", caches("30 minutes"), async (req, res) => {
  await getMovies("https://www.thenetnaija.co/videos/movies", movies);
  try {
    const filteredData = movies.filter(
      (val, index, arr) => index > arr.length - 19
    );
    const filteredMovie = {
      count: filteredData.length,
      _movies: moviesDetails(
        filteredData,
        "https://netnaijarebuildapi.herokuapp.com/api/movie/"
      ),
    };

    res.status(200).json(filteredMovie);
  } catch (error) {
    res.status(400).json({
      err: error.message,
    });
  }
});

router.get("/movies/:id", caches("60 minutes"), async (req, res) => {
  const id = req.params.id;
  await getMovies(
    `https://www.thenetnaija.co/videos/movies/page/${id}`,
    movies
  );
  try {
    const filteredData = movies.filter(
      (val, index, arr) => index > arr.length - 19
    );
    const filteredMovie = {
      count: filteredData.length,
      _movies: moviesDetails(
        filteredData,
        "https://netnaijarebuildapi.herokuapp.com/api/movie/"
      ),
    };

    res.status(200).json(filteredMovie);
  } catch (error) {
    res.status(400).json({
      err: error.message,
    });
  }
});

module.exports = router;
