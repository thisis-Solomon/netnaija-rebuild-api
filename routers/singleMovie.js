const express = require("express");
const download_movie_url = require("../api/getDownloadLink");
const storyLine = require("../api/getMovie");
const getMovies = require("../api/getMovies");
const movies = require("../helpers/moviesArr");

const router = express.Router();

router.get("/movie/:id", async (req, res) => {
  await getMovies("https://www.thenetnaija.co/videos/movies", movies);
  const id = req.params.id;
  const movieID = movies.filter((movie) => movie.id === parseInt(id));
  const { info: movie_link } = movieID[0];
  const movie_data = [id];

  await storyLine(movie_link.link, movie_data);
  await download_movie_url(movie_data[1].movie_info.video_link, movie_data);

  res.json(movie_data);
});

module.exports = router;
