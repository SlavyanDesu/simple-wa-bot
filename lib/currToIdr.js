const { fetchJson } = require('../utils/fetcher')

/**
 * Convert currency to IDR (Indonesian Rupiah)
 *
 * @param {String} curr
 * @param {String} bal
 */
const kurensi = (curr, bal) => new Promise((resolve, reject) => {
    fetchJson('https://api.terhambar.com/currency?curr=' + curr + '&bal=' + bal)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    kurensi
}
