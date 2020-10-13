const { fetchJson } = require('../utils/fetcher')

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