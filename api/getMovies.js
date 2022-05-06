const axios = require("axios");
const cheerio = require("cheerio");

async function getMovies(url, moviesData) {
  const res = await axios.get(url);
  const html = res.data;
  const $ = cheerio.load(html);

  $(".video-files").each((index, video) => {
    $(".file-one", video).each((i, item) => {
      const img = $(item).find(".thumbnail img").attr("src");
      const title = $(item).find(".thumbnail img").attr("title");
      const link = $(item).children(".info").find("h2 a").attr("href");
      const date = $(item)
        .children(".info")
        .find(".meta .inner span")
        .attr("title");

      const data = {
        id: title.replace(/\s/g, "-").toLocaleLowerCase(),
        img,
        title,
        info: {
          link,
          date,
        },
      };
      moviesData.push(data);
    });
  });
}

module.exports = getMovies;
