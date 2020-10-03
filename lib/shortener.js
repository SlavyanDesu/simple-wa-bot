const { fetchText } = require('../utils/fetcher')

const shortener = (url) => new Promise((resolve, reject) => {
    console.log('Creating shortener')
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})

module.exports = {
    shortener
}