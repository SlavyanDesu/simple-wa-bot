const { fetchJson } = require('../utils/fetcher')

const random = () => new Promise((resolve, reject) => {
    const tag = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone']
    const randTag = tag[Math.random() * tag.length | 0]
    console.log('Looking for lewds on', randTag)
    fetchJson('https://meme-api.herokuapp.com/gimme/' + randTag +'/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    random
}