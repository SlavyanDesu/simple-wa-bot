const { user } = require('tiktok-scraper')
const { fetchJson } = require('../utils/fetcher')

const instagram = (username) => new Promise((resolve, reject) => {
    console.log('Mengambil info dari akun', username)
    fetchJson('https://mhankbarbar.herokuapp.com/api/stalk?username=' + username)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    instagram
}