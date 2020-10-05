const { fetchJson } = require('../utils/fetcher')

const jadwal = (daerah) => new Promise((resolve, reject) => {
    console.log('Mengambil jadwal sholat daerah', daerah)
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