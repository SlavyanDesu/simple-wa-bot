const { decryptMedia, Client } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
const os = require('os')
const md5 = require('md5')
const curse = require('curse-text')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const { downloader, urlShortener, meme, fetish, lewd, waifu } = require('../../lib')
const { msgFilter, color, processTime, isUrl, isYt } = require('../../utils')

const { textResponse } = require('./text')
const { menuId } = require('./text') // For help command

module.exports = msgHandler = async (client = new Client(), message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const botNumber = await client.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false

        // Bot prefix
        const prefix = '$'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'

        // Avoid spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }

        // Message log
        if (!isCmd && !isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname)) }
        if (!isCmd && isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }

        // Avoid spam
        msgFilter.addFilter(from)

        switch (command) {
            // Downloader
            case 'facebook':
            case 'fb':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan. [WRONG FORMAT]', id)
                if (!isUrl(url) && !url.includes('facebook.com')) return client.reply(from, '⚠️ Link tidak valid! [INVALID]', id)
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                downloader.facebook(url)
                .then(async (videoMeta) => {
                    const title = videoMeta.response.title
                    const thumbnail = videoMeta.response.thumbnail
                    const links = videoMeta.response.links
                    const shorts = []
                    for (let i = 0; i < links.length; i++) {
                        const shortener = await urlShortener(links[i].url)
                        console.log('Shortlink: ' + shortener)
                        links[i].short = shortener
                        shorts.push(links[i])
                    }
                    const link = shorts.map((x) => `${x.resolution} Quality: ${x.short}`)
                    const caption = `Teks: ${title}\n\nLink download:\n${link.join('\n')}\n\nBerhasil diproses selama ${processTime(t, moment())} detik`
                    await client.sendFileFromUrl(from, thumbnail, 'videos.jpg', caption, null, null, true)
                    .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} Diproses selama ${processTime(t, moment())} detik`))
                    .catch((err) => console.error(err))
                })
                .catch((err) => {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`, id)
                })
            break
            case 'instagram':
            case 'ig':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu1* untuk penggunaan. [WRONG FORMAT]', id)
                if (!isUrl(url) && !url.includes('instagram.com')) return client.reply(from, '⚠️ Link tidak valid! [INVALID]', id)
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                downloader.insta(url)
                .then(async (data) => {
                    if (data.descriptionc === null) {
                        return client.reply(from, '⚠️ Link tidak valid atau user private! [INVALID]', id)
                    } else if (data.mediatype === 'photo') {
                        await client.sendFileFromUrl(from, data.descriptionc, 'photo.jpg', '', null, null, true)
                        .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} Diproses selama: ${processTime(t, moment())} detik`))
                        .catch((err) => console.error(err))
                    } else if (data.mediatype === 'video') {
                        await client.sendFileFromUrl(from, data.descriptionc, 'video.mp4', `Berhasil diproses selama: ${processTime(t, moment())} detik`, null, null, true)
                        .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} Diproses selama: ${processTime(t, moment())} detik`))
                        .catch((err) => console.error(err))
                    }
                })
                .catch((err) => {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan!\n\n${err}`, id)
                })
            break
            case 'tiktok':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu1* untuk penggunaan. [WRONG FORMAT]', id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return client.reply(from, '⚠️ Link tidak valid! [INVALID]', id)
                await client.reply(from, `_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏`, id)
                downloader.tiktok(url)
                .then(async (videoMeta) => {
                        const filename = videoMeta.authorMeta.name + '.mp4'
                        const caps = `*\nUsername: ${videoMeta.authorMeta.name} \nMusic: ${videoMeta.musicMeta.musicName} \nView: ${videoMeta.playCount.toLocaleString()} \nLike: ${videoMeta.diggCount.toLocaleString()} \nComment: ${videoMeta.commentCount.toLocaleString()} \nShare: ${videoMeta.shareCount.toLocaleString()} \nCaption: ${videoMeta.text.trim() ? videoMeta.text : '-'}`
                        await client.sendFileFromUrl(from, videoMeta.url, filename, videoMeta.NoWaterMark ? caps : `⚠ Video tanpa watermark tidak tersedia. \n\n${caps}`, '', { headers: { 'User-Agent': 'okhttp/4.5.0', referer: 'https://www.tiktok.com/' } }, true)
                        .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} Diproses selama ${processTime(t, moment())} detik`))
                        .catch((err) => console.error(err))
                })
                .catch(() => client.reply(from, '⚠️ Link tidak valid! [INVALID]', id))
            break
            case 'twitter':
            case 'twt':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu1* untuk penggunaan. [WRONG FORMAT]', id)
                if (!isUrl(url) && !url.includes('twitter.com') || url.includes('t.co')) return client.reply(from, '⚠️ Link tidak valid! [INVALID]', id)
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                downloader.tweet(url)
                .then(async (data) => {
                    if (data.type === 'video') {
                        const content = data.variants.filter(x => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                        const result = await urlShortener(content[0].url)
                        console.log('Shortlink: ' + result)
                        await client.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link download: ${result} \n\nBerhasil diproses selama ${processTime(t, moment())} detik`, null, null, true)
                        .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} diproses selama ${processTime(t, moment())} detik`))
                        .catch((err) => console.error(err))
                    } else if (data.type === 'photo') {
                        for (let i = 0; i < data.variants.length; i++) {
                            await client.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', null, null, true)
                            .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} diproses selama ${processTime(t, moment())} detik`))
                            .catch((err) => console.error(err))
                        }
                    }
                })
                .catch((err) => {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`, id)
                })
            break
            case 'ytmp3':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu1* untuk penggunaan. [WRONG FORMAT]', id)
                if (!isYt(url) && !url.includes('youtu.be') || url.includes('youtube.com')) return client.reply(from, '⚠️ Link tidak valid! [INVALID]', id)
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                downloader.ytmp3(url)
                .then(async (response) => {
                    if (response.status !== 200) {
                        return client.reply('⚠️ Link tidak valid! [INVALID]', id)
                    } else if (Number(response.filesize.split(' MB')[0]) > 50.00) {
                        return client.reply(from, '🙏 Maaf durasi video telah melewati batas.', id)
                    } else {
                        await client.sendFileFromUrl(from, response.result, `${response.title}.mp3`, '', null, null, true)
                        .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} Diproses selama: ${processTime(t, moment())} detik`))
                        .catch((err) => console.error(err))
                    }
                })
                .catch((err) => {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`, id)
                })
            break
            case 'ytmp4':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu1* untuk penggunaan. [WRONG FORMAT]', id)
                if (!isYt(url) && !url.includes('youtu.be') || ('youtube.com')) return client.reply(from, '⚠️ Link tidak valid! [INVALID]', id)
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                downloader.ytmp4(url)
                .then(async (response) => {
                    if (response.status !== 200) {
                        return client.reply('⚠️ Link tidak valid! [INVALID]', id)
                    } else if (Number(response.filesize.split(' MB')[0]) > 50.00) {
                        return client.reply(from, '🙏 Maaf durasi video telah melewati batas.', id)
                    } else {
                        await client.sendFileFromUrl(from, response.result, `${response.title}.mp4`, '', null, null, true)
                        .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} Diproses selama: ${processTime(t, moment())} detik`))
                        .catch((err) => console.error(err))
                    }
                })
                .catch((err) => {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`, id)
                })
            break

            // Sticker
            case 'sticker':
            case 'stiker': 
                if ((isMedia || isQuotedImage) && args.length === 0) {
                    await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendImageAsSticker(from, imageBase64)
                    .then(() => {
                        client.reply(from, 'Silakan', id)
                        console.log(`Stiker diproses selama: ${processTime(t, moment())} detik`))
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan!\n\n${err}`, id)
                    })
                } else if (args.length === 1) {
                    if (!isUrl(url)) return client.reply(from, '⚠️ Link tidak valid!', id)
                    await client.sendStickerfromUrl(from, url)
                    .then((r) => (!r && r !== undefined)
                        ? client.sendText(from, '⚠️ Link yang dikirim tidak dapat dimuat! [CANNOT LOAD]', id)
                        : client.reply(from, 'Silakan', id))
                            .then(() => console.log(`Stiker diproses selama: ${processTime(t, moment())} detik`))
                } else {
                    client.reply(from, '⚠️ Format salah! Ketik *$menu2* untuk penggunaan. [WRONG FORMAT]', id)
                }
            break

            // Fun
            case 'ask':
            case '8ball':
                let question = args.join(' ')
                let answer = textResponse[Math.floor(Math.random() * (textResponse.length))]
                if (!question) {
                    return client.reply(from, '⚠️ Harap masukkan teks! [WRONG FORMAT]', id)
                } else {
                    client.sendText(from, `Pertanyaan: *${question}* \n\nJawaban: ${answer}`)
                }
            break
            case 'binary':
            case 'bin':
            case 'biner':
                exports.method = {
                    encode: input => {
                        return input.toString().split('').map(c => c.charCodeAt(0).toString(2))
                    }
                }
                let input = args.join(' ')
                if (!input) {
                    return client.reply(from, '⚠️ Harap masukan teks! [WRONG FORMAT]', id)
                } else {
                    client.sendText(from, this.method.encode(input).join(' '))
                }
            break
            case 'coinflip':
            case 'coin':
            case 'flip':
                const coin = [
                    'Heads',
                    'Tails'
                ]
                const random = coin[Math.floor(Math.random() * (coin.length))]
                await client.reply(from, `Kamu mendapatkan bagian *${random}*`)
            break
            case 'curse':
                let userText = args.join(' ')
                if (!userText) {
                    return client.reply(from, '⚠️ Harap masukkan teks! [WRONG FORMAT]', id)
                } else {
                client.sendText(from, curse(userText))
                }
            break
            case 'lenny':
                client.reply(from, '( ͡° ͜ʖ ͡°)', id)
            break
            case 'md5':
                let yourText = args.join(' ')
                if (!yourText) {
                    return client.reply(from, '⚠️ Harap masukkan teks! [WRONG FORMAT]', id)
                } else {
                    client.sendText(from, md5(yourText))
                }
            break
            case 'randomeme':
            case 'reddit':
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui pulsa:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                meme.random()
                .then(({ subreddit, title, url, author }) => {
                    client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                })
                .catch((err) => {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan! [WRONG FORMAT]\n\n${err}`)
                })
            break
            case 'reverse':
                if (args.length < 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu3* untuk penggunaan. [WRONG FORMAT]')
                client.sendText(from, args.join(' ').split('').reverse().join(''))
            break
            case 'roll':
            case 'dice':
                let roll = Math.floor(Math.random() * 6) + 1
                client.reply(from, `Kamu mendapatkan angka *${roll}*.`)
            break
            case 'say':
            case 'talk':
                let sayMessage = args.join(' ')
                if (!sayMessage) return client.reply(from, '⚠️ Harap masukkan teks! [WRONG FORMAT]')
                client.sendText(from, sayMessage)
            break
        
            // Utility
            case 'clock':
            case 'jam':
            case 'waktu':
                await client.sendText(from, `Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
            break
            case 'delete':
            case 'del':
                if (!quotedMsg) return client.reply(from, '⚠️ Format salah! Ketik *$menu4* untuk penggunaan. [WRONG FORMAT]', id)
                if (!quotedMsgObj.fromMe) return client.reply(from, '⚠️ Format salah! Ketik *$menu4* untuk penggunaan. [WRONG FORMAT]', id)
                await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
            case 'donate':
            case 'donasi':
                await client.sendText(from,menuId.donate())
            break
            case 'menu':
            case 'help':
            case 'h':
                await client.sendText(from, menuId.textMenu())
            break
            case 'menu1':
                await client.sendText(from, menuId.textMenu1())
            break
            case 'menu2':
                await client.sendText(from, menuId.textMenu2())
            break
            case 'menu3':
                await client.sendText(from, menuId.textMenu3())
            break
            case 'menu4':
                await client.sendText(from, menuId.textMenu4())
            break
            case 'menu5':
                await client.sendText(from, menuId.textMenu5())
            break
            case 'menuall':
                await client.sendText(from, menuId.textMenuAll())
            break
            case 'speed':
            case 'ping':
            case 'p':
                await client.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} detik`)
            break
            case 'readme':
            case 'tnc':
                await client.sendText(from, menuId.textReadme())
            break
            case 'server':
                await client.sendText(from,`Penggunaan RAM: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*\nCPU: ${os.cpus().length}@${os.cpus()[0].model}`)
            break
            case 'status':
            case 'stats':
                const loadedMsg = await client.getAmountOfLoadedMessages()
                const chatIds = await client.getAllChatIds()
                const groups = await client.getAllGroups()
                await client.sendText(from, `Status :\n- *${loadedMsg}* Message terload\n- *${groups.length}* Group\n- *${chatIds.length - groups.length}* Private chat\n- *${chatIds.length}* Total chat`)
            break

            // Weeb Zone
            case 'wait':
                if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                    if (isMedia) {
                        var mediaData = await decryptMedia(message, uaOverride)
                    } else {
                        var mediaData = await decryptMedia(quotedMsg, uaOverride)
                    }
                    const fetch = require('node-fetch')
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                    fetch('https://trace.moe/api/search', {
                        method: 'POST',
                        body: JSON.stringify({ image: imageBase64 }),
                        headers: { "Content-Type": "application/json" }
                    })
                    .then(respon => respon.json())
                    .then(resolt => {
                        if (resolt.docs && resolt.docs.length <= 0) {
                            client.reply(from, '🙏 Maaf, saya tidak tau anime ini.', id)
                        }
                        const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                        teks = ''
                        if (similarity < 0.92) {
                            teks = '🤔 Saya kurang yakin dengan hasilnya:\n\n'
                        }
                        teks += `Judul: ${title}\nRomaji: ${title_romaji}\nEnglish : ${title_english}\n`
                        teks += `Episode: ${episode.toString()}\n`
                        teks += `Kesamaan: ${(similarity * 100).toFixed(1)}%`
                        var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                        client.sendFileFromUrl(from, video, 'anime.mp4', teks, null, null, true)
                        .catch(() => {
                            client.reply(from, teks, id)
                        })
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`, id)
                    })
                } else {
                    client.reply(from, '⚠️ Harap lampirkan foto! Ketik *$menu5* untuk penggunaan.', id)
                }
                break
            case 'waifu':
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                waifu.random()
                    .then(({ url }) => {
                        client.sendFileFromUrl(from, url, 'waifu.jpg', null, null, true)
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`, id)
                    })
                break

            // Hidden
            case 'hidden':
                await client.sendText(from, menuId.hiddenMenu())
            break

            // NSFW
            case 'multifetish':
            case 'mfetish':
                let request = args.join(' ')
                client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)

                if (args.length !== 1) {
                    return client.reply(from, '⚠️ Silakan masukkan tag yang tersedia di *$hidden*! [WRONG FORMAT]', id)
                } else if (request === 'armpits') {
                    fetish.armpits()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else if (request === 'feets') {
                    fetish.feets()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else if (request === 'thighs') {
                    fetish.thighs()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else if (request === 'booty') {
                    fetish.booty()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else if (request === 'boobs') {
                    fetish.boobs()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else if (request === 'necks') {
                    fetish.necks()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else if (request === 'belly') {
                    fetish.belly()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else if (request === 'sideboobs') {
                    fetish.sideboobs()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else if (request === 'ahegao') {
                    fetish.ahegao()
                    .then(({ memes }) => {
                        for (i = 0; i < memes.length; i++) {
                            let sauce = memes[i]
                            client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                            .then(() => console.log('Sukses mengirim file!'))
                            .catch((err) => console.error(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
                } else {
                    client.reply(from, '🙏 Maaf tag belum tersedia. Silakan request. [TAG NOT FOUND]')
                }
            break
            case 'multilewds':
            case 'multilewd':
            case 'mlewds':
            case 'mlewd':
                client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                lewd.random()
                .then(({ memes }) => {
                    for (i = 0; i < memes.length; i++) {
                        let sauce = memes[i]
                        client.sendFileFromUrl(from, sauce.url, 'lewd.jpg', '', null, null, true)
                        .then(() => console.log('Sukses mengirim file!'))
                        .catch((err) => console.log(err))
                    }
                })
                .catch((err) => {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                })
            break

            // Group commands (admin only)
            case 'add':
                const user = args.join(' ')
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [NOT ADMIN]', id)
                if (!user || args.length > 1) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                try {
                    await client.addParticipant(from, `${user}@c.us`)
                    .then(() => client.sendText(from, '🎉 Selamat datang! 🎉'))
                } catch (err) {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan saat menambah member! [ERR]\n\n${err}`)
                }
            break
            case 'admin':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                await client.sendText(from, menuId.textAdmin())
            break
            case 'bye':
            case 'out':
            case 'leave':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                client.sendText(from, '👋 Bye-bye!').then(() => client.leaveGroup(groupId))
            break
            case 'demote':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja!', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [NOT ADMIN]', id)
                if (mentionedJidList.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, '❌ Dia bukan admin, gimana gw demote-nya? [USER NOT AN ADMIN]', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `✅ Siap mint, anjay lengser @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
            case 'kick':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [NOT ADMIN]', id)
                if (mentionedJidList.length === 0) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                await client.sendTextWithMentions(from, `✅ Siap mint, wisuda lu:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, '❌ Gak bisa kick admin gw bro [NOT ALLOWED]')
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
            break   
            case 'linkgrup':
            case 'linkgroup':
                if (!isGroupMsg) return await client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return await client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return await client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [NOT ADMIN]', id)
                if (isGroupMsg) {
                    const inviteLink = await client.getGroupInviteLink(groupId)
                    client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
                }
            break
            case 'promote':
                if (!isGroupMsg) return await client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return await client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return await client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [NOT ADMIN]', id)
                if (mentionedJidList.length != 1) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, '❌ Dia udah jadi admin njir [ADMIN ALREADY]', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan.', id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `✅ Siap mint, anjay sekarang @${mentionedJidList[0].replace('@c.us', '')} jadi admin.`)
            break
            
            default:
                console.log(color('[ERROR]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Unregistered command from', color(pushname))
                client.reply(from, '❓ Command tidak ditemukan, silakan cek kembali atau ketik *$menu* untuk melihat list command yang tersedia. [COMMAND NOT FOUND]')
            break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
