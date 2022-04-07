const axios = require("axios")
const cheerio = require("cheerio")

async function storyLine(movieLink, movie_data){
    const {data} = await axios.get(movieLink)
    const html = data
    const $ = cheerio.load(html)

    const title = $(".video-entry").find(".page-h1").text()
    const img = $(".video-entry article figure").find("img").attr("src")

    const sub_title = $(".video-entry article").find('p').eq(0).text()
    const story_line = $(".video-entry article").find('p').eq(1).text()
    const genre = $(".video-entry article").find("p").eq(3).text()
    const release_date = $(".video-entry article").find("p").eq(4).text()
    const stars = $(".video-entry article").find("p").eq(5).text()
    const language = $(".video-entry article").find("p").eq(6).text()
    const subtitle_language = $(".video-entry article").find("p").eq(7).text()
    const source = $(".video-entry article").find("p").eq(8).text()
    const imdb = $(".video-entry article").find("p").eq(9).text()

    const download_video = $(".video-entry article").find(".db-one a").eq(0).attr("href")
        // const download_subtitle = $(".video-entry article").find(".db-one a").eq(1).attr("href")
    const base_link = "https://www.thenetnaija.co"
        // https://www.thenetnaija.co/
        // "https://www.thenetnaija.co" + download_subtitle
    const movieData = {
            title,
            img,
            movie_info:{
                sub_title,
                story_line,
                genre,
                release_date,
                stars,
                source,
                language,
                subtitle_language,
                imdb,
                video_link: base_link + download_video
            },
            // links:{
            //     sub: base_link + download_subtitle,
            // }
        }
    movie_data.push(movieData)
}

module.exports = storyLine