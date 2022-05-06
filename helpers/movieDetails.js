function moviesDetails(movies, url) {
  const data = movies.map((movie) => {
    return {
      id: movie.id,
      img: movie.img,
      title: movie.title,
      date: movie.info.date,
    };
  });

  return data;
}

module.exports = moviesDetails;
