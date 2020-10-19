/* eslint-disable prefer-promise-reject-errors */
const { fetchJson } = require('../utils/fetcher')
const { promisify } = require('util')
const { twitter } = require('video-url-link')
const { getVideoMeta } = require('tiktok-scraper')

const twtGetInfo = promisify(twitter.getInfo)

/**
 * Get Twitter metadata
 *
 * @param {String} url
 */
const tweet = (url) => new Promise((resolve, reject) => {
    console.log('Mengambil metadata dari =>', url)
    twtGetInfo(url, {})
        .then((content) => resolve(content))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

/**
 * Get Instagram metadata
 *
 * @param {String} url
 */
const insta = (url) => new Promise((resolve, reject) => {
    console.log('Mengambil metadata dari =>', url)
    fetchJson('https://api.fdci.se/sosmed/insta.php?url=' + url)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

/**
 * Get TikTok metadata
 *
 * @param {String} url
 */
const tiktok = (url) => new Promise((resolve, reject) => {
    console.log('Mengambil metadata dari =>', url)
    getVideoMeta(url, { noWaterMark: true, hdVideo: true })
        .then(async (result) => {
            console.log('Get video from', '@' + result.authorMeta.name, 'ID:', result.id)
            if (result.videoUrlNoWaterMark) {
                result.url = result.videoUrlNoWaterMark
                result.NoWaterMark = true
            } else {
                result.url = result.videoUrl
                result.NoWaterMark = false
            }
            resolve(result)
        })
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

/**
 * Get Facebook metadata
 *
 * @param {String} url
 */
const facebook = (url) => new Promise((resolve, reject) => {
    console.log('Mengambil metadata dari =>', url)
    const apikey = 'iG44qFRadt514XMlOA86xVWkJw231TSJk0vcOC0kS5hBhZP2h2'
    fetchJson('http://keepsaveit.com/api/?api_key=' + apikey + '&url=' + url, { method: 'GET' })
        .then((result) => {
            const key = result.code
            switch (key) {
            case 212:
                return reject('Access blocked, you have reached maximum 5 limit per-minute hits, please stop extra hits.')
            case 101:
                return reject('API key error: Your access key is wrong.')
            case 102:
                return reject('Your account is not activated.')
            case 103:
                return reject('Your account is suspend for some resons.')
            case 104:
                return reject('API key error: You have not set your api_key in parameters.')
            case 111:
                return reject('Full access is not allow with DEMO API key.')
            case 112:
                return reject('Sorry, something wrong, or an invalid link. Please try again or check your link.')
            case 113:
                return reject('Sorry this website is not supported.')
            case 404:
                return reject('The link you followed may be broken, or the page may have been removed.')
            case 405:
                return reject('You can\'t download media in private profile. Looks like the video you want to download is private and it is not accessible from our server.')
            default:
                return resolve(result)
            }
        })
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

/**
 * Get YouTube MP3
 *
 * @param {String} url
 */
const ytmp3 = (url) => new Promise((resolve, rejects) => {
    console.log('Mengambil metadata dari =>', url)
    fetchJson('https://mhankbarbar.herokuapp.com/api/yta?url=' + url)
        .then((result) => resolve(result))
        .catch((err) => {
            console.log(err)
            rejects(err)
        })
})

/**
 * Get YouTube MP4
 *
 * @param {String} url
 */
const ytmp4 = (url) => new Promise((resolve, rejects) => {
    console.log('Mengambil metadata dari =>', url)
    fetchJson('https://mhankbarbar.herokuapp.com/api/ytv?url=' + url)
        .then((result) => resolve(result))
        .then((err) => {
            console.log(err)
            rejects(err)
        })
})

module.exports = {
    tweet,
    tiktok,
    insta,
    facebook,
    ytmp3,
    ytmp4
}
