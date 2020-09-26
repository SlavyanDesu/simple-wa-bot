const { fetchJson } = require ('../utils/fetcher')

const random = () => new Promise((resolve, reject) => {
    const subreddits = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone']
    const randSub = subreddits[Math.random() * subreddits.length | 0]
    console.log('Looking for lewds on ' + randSub)
    fetchJson('https://meme-api.herokuapp.com/gimme/' + randSub)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    random
}
