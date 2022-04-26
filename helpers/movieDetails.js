function moviesDetails(movies, url) {
  const data = movies.map((movie) => {
    return {
      id: movie.id,
      img: movie.img,
      title: movie.title,
      date: movie.info.date,
      options: {
        GET: "GET A SINGLE MOVIE",
        PATH: url + movie.id,
      },
    };
  });

  return data;
}

module.exports = moviesDetails;
