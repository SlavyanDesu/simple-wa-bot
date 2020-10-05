const { rejects } = require('assert')
const { fetchJson } = require('../utils/fetcher')

const info = () => new Promise((resolve, reject) => {
    console.log('Mengambil data gempa dari BMKG')
    fetchJson('https://mhankbarbar.herokuapp.com/api/infogempa')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    info
}