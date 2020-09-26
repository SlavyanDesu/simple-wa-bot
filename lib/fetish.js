const { fetchJson } = require('../utils/fetcher')

const armpits = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for armpits...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animearmpits')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const feets = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for feets...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animefeets')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const thighs = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for thighs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animethighss')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const booty = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for booty...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebooty')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const boobs = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for boobs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/biganimetiddies')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const necks = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for necks...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animenecks')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const belly = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for belly...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebellybutton')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const sideboobs = (subreddit) => new Promise((resolve, reject) => {
    console.log('Looking for sideboobs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/sideoppai')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const ahegao = (subreddit) => new Promise((resolve, reject) => {
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
