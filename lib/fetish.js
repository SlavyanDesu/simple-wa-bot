const { fetchJson } = require('../utils/fetcher')

const armpits = () => new Promise((resolve, reject) => {
    console.log('Mencari armpits')
    fetchJson('https://meme-api.herokuapp.com/gimme/animearmpits/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const feets = () => new Promise((resolve, reject) => {
    console.log('Mencari feets')
    fetchJson('https://meme-api.herokuapp.com/gimme/animefeets/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const thighs = () => new Promise((resolve, reject) => {
    console.log('Mencari thighs')
    fetchJson('https://meme-api.herokuapp.com/gimme/animethighss/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const booty = () => new Promise((resolve, reject) => {
    console.log('Mencari booty')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebooty/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const boobs = () => new Promise((resolve, reject) => {
    console.log('Mencari boobs')
    fetchJson('https://meme-api.herokuapp.com/gimme/biganimetiddies/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const necks = () => new Promise((resolve, reject) => {
    console.log('Mencari necks')
    fetchJson('https://meme-api.herokuapp.com/gimme/animenecks/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const belly = () => new Promise((resolve, reject) => {
    console.log('Mencari belly')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebellybutton/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const sideboobs = () => new Promise((resolve, reject) => {
    console.log('Mencari sideboobs')
    fetchJson('https://meme-api.herokuapp.com/gimme/sideoppai/5')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const ahegao = () => new Promise((resolve, reject) => {
    console.log('Mencari ahegao')
    fetchJson('https://meme-api.herokuapp.com/gimme/ahegao/5')
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
