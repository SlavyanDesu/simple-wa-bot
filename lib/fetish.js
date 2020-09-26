const { fetchJson } = require('../utils/fetcher')

const armpits = () => new Promise((resolve, reject) => {
    console.log('Looking for armpits...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animearmpits')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const feets = () => new Promise((resolve, reject) => {
    console.log('Looking for feets...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animefeets')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const thighs = () => new Promise((resolve, reject) => {
    console.log('Looking for thighs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animethighss')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const booty = () => new Promise((resolve, reject) => {
    console.log('Looking for booty...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebooty')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const boobs = () => new Promise((resolve, reject) => {
    console.log('Looking for boobs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/biganimetiddies')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const necks = () => new Promise((resolve, reject) => {
    console.log('Looking for necks...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animenecks')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const belly = () => new Promise((resolve, reject) => {
    console.log('Looking for belly...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebellybutton')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const sideboobs = () => new Promise((resolve, reject) => {
    console.log('Looking for sideboobs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/sideoppai')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const ahegao = () => new Promise((resolve, reject) => {
    console.log('Looking for ahegao...')
    fetchJson('https://meme-api.herokuapp.com/gimme/ahegao')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    armpits,
    feets,
    thighs,
    booty,
    boobs,
    necks,
    belly,
    sideboobs,
    ahegao
}
