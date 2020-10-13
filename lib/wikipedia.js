const { fetchJson } = require('../utils/fetcher')

const pencarian = (q) => new Promise((resolve, reject) => {
    console.log('Mengambil data', q)
    fetchJson('https://mhankbarbar.herokuapp.com/api/wiki?q=' + q)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    pencarian
}