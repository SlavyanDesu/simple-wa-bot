const { fetchJson } = require('../utils/fetcher')

/**
* Get weather info
*
* @param {String} q
*/
const cuaca = (q) => new Promise((resolve, reject) => {
    console.log('Mengambil data cuaca di', q)
    fetchJson('https://mhankbarbar.herokuapp.com/api/cuaca?q=' + q)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    cuaca
}
