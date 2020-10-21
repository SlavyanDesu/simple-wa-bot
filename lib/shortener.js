const { fetchText } = require('../utils/fetcher')

/**
 * Create shortlink
 *
 * @param {String} url
 */
module.exports = shortener = (url) => new Promise((resolve, reject) => {
    console.log('Membuat shortener')
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})
