const { fetchJson } = require('../utils/fetcher')

/**
 * Get earthquake data from JSON
 *
 * @return {Promise} Return data
 */
const info = () => new Promise((resolve, reject) => {
    console.log('Getting earthquake info...')
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
