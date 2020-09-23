const { fetchJson } = require ('../utils/fetcher')

const hentong = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for ecchi')
    fetchJson('https://meme-api.herokuapp.com/gimme/ecchi/')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    hentong
}