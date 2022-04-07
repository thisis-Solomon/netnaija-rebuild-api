const axios = require("axios")
const cheerio = require("cheerio")

async function download_movie_url(downloadLink, movie_data){
    const {data} = await axios.get(downloadLink)
    const html = data
    const $ = cheerio.load(html)
    const download = $(".download").html().trim()
    // movie_data.push({download})
}

module.exports = download_movie_url