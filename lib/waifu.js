const { fetchJson } = require('../utils/fetcher')

module.exports = random = () => new Promise((resolve, reject) => {
    const type = ['waifu', 'neko']
    const randType = type[Math.random() * type.length | 0]
    console.log('Looking for waifu images on ' + randType)
    fetchJson('https://waifu.pics/api/sfw/' + randType)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})