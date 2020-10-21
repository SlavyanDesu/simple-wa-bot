const { fetchJson } = require('../utils/fetcher')

/**
 * Get jadwal sholat
 *
 * @param {String} daerah
 */
const jadwal = (daerah) => new Promise((resolve, reject) => {
    console.log('Mengambil jadwal sholat di', daerah)
    fetchJson('https://mhankbarbar.herokuapp.com/api/jadwalshalat?daerah=' + daerah)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    jadwal
}
