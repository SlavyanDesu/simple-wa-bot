const { fetchJson } = require('../utils/fetcher')

/**
 * Get COVID-19 data
 *
 * @param {Promise} Return COVID-19 data
 */
const indonesia = () => new Promise((resolve, reject) => {
    console.log('Mengambil data COVID-19')
    fetchJson('https://api.terhambar.com/negara/Indonesia')
        .then((result) =>  resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    indonesia
}
