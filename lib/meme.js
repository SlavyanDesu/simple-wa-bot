const { fetchJson, fetchBase64 } = require('../utils/fetcher')

const random = () => new Promise((resolve, reject) => {
    const subreddits = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'AdviceAnimals', 'MemeEconomy', 'memes', 'terriblefacebookmemes', 'teenagers', 'historymemes']
    const randSub = subreddits[Math.random() * subreddits.length | 0]
    console.log('Looking for memes on ' + randSub)
    fetchJson('https://meme-api.herokuapp.com/gimme/' + randSub)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    random
}