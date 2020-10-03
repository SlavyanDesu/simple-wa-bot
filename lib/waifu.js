const { fetchJson } = require('../utils/fetcher')

const random = () => new Promise((resolve, reject) => {
    const type = ['waifu', 'neko']
    const randTag = type[Math.random() * type.length | 0]
    console.log('Looking for', randTag)
    fetchJson('https://waifu.pics/api/sfw/' + randTag)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    random
}
