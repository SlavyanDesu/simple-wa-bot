const { decryptMedia, Client } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
const os = require('os')
const axios = require('axios')
const sagiri = require('sagiri')
const sauceNao = sagiri('4c92c7ce9d1b9d1ebc956e80907ba813c3d9879e')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const { downloader, urlShortener, meme, fetish, lewd, waifu } = require('../../lib')
const { msgFilter, color, processTime, isUrl } = require('../../utils')
const responses = [
    'Adalah yoi',
    'True min',
    'Mana gw tau, emang gw bapaknya?',
    'Se7',
    'Jangan tanya gw lah',
    'Gak',
    'Ya',
    'Adalah false',
    'Adalah true',
    'Puguh',
    'Sugan mabar yekan?',
    'G u bau',
    'Cari tau sendiri',
    'Keknya sih iya',
    'Keknya sih nggak',
    'Lah serius?',
    'Anjir',
    'Gak tau',
    'Pukimak',
    'Meureun, gw juga gak tau sih',
    'Kagak',
    'Setelah gw pikir sih gak mungkin',
    'Setelah gw pikir sih mungkin aja',
    'Y',
    'G',
    'Terserah',
    'Terserah lu',
    'Tul',
    'Hah?',
    'Ngetik apaan? Burem'
]

const { menuId } = require('./text') // For help command

module.exports = msgHandler = async (client = new Client(), message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await client.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const groupMembers = isGroupMsg ? await client.getGroupMembersId(groupId) : ''
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
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                if (!isUrl(url) && !url.includes('facebook.com')) return client.reply(from, '⚠️ Link tidak valid!', id)
                await client.reply(from, '_Tunggu sebentar..._', id)
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
                        const caption = `Teks: ${title} \n\nLink download: \n${link.join('\n')} \n\nBerhasil diproses selama ${processTime(t, moment())} detik`
                        await client.sendFileFromUrl(from, thumbnail, 'videos.jpg', caption, null, null, true)
                            .then((serialized) => console.log(`Sukses mengirm file dengan ID: ${serialized} diproses selama ${processTime(t, moment())}`))
                            .catch((err) => console.error(err))
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Link tidak valid!\n\n${err}`, id)
                    })
            break
            case 'instagram':
            case 'ig':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                if (!isUrl(url) && !url.includes('instagram.com')) return client.reply(from, '⚠️ Link tidak valid!', id)
                client.reply(from, '_Tunggu sebentar..._', id)
                axios.get('https://villahollanda.com/api.php?url='+ url)
                    .then(function (response) {
                        console.log('IG: ' + args[0])
                        if (response.data.descriptionc == null) {
                            client.reply(from, '🔒 Sepertinya akunnya di-private atau link tidak valid.', id)
                        } else if (response.data.mediatype == 'photo') {
                            client.sendFileFromUrl(from, response.data.descriptionc)
                        } else if (response.data.mediatype == 'video') {
                            client.sendFileFromUrl(from, response.data.descriptionc, 'video.mp4', `Berhasil diproses selama ${processTime(t, moment())} detik`, null, null, true)
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `🔒 Sepertinya akunnya di-private atau link tidak valid.\n\n${err}`, id)
                    })
            break
            case 'twitter':
            case 'twt':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                if (!isUrl(url) & !url.includes('twitter.com') || url.includes('t.co')) return client.reply(from, '⚠️ Link tidak valid!', id)
                await client.reply(from, '_Tunggu sebentar..._', id)
                downloader.tweet(url)
                    .then(async (data) => {
                        if (data.type === 'video') {
                            const content = data.variants.filter(x => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                            const result = await urlShortener(content[0].url)
                            console.log('Shortlink: ' + result)
                            await client.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link download: ${result} \n\nBerhasil diproses selama ${processTime(t, moment())} detik`, null, null, true)
                                .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} diproses selama ${processTime(t, moment())}`))
                                .catch((err) => console.error(err))
                        } else if (data.type === 'photo') {
                            for (let i = 0; i < data.variants.length; i++) {
                                await client.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', null, null, true)
                                    .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} diproses selama ${processTime(t, moment())}`))
                                    .catch((err) => console.error(err))
                            }
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Link tidak valid!\n\n${err}`, id)
                    })
            break

            // Sticker
            case 'sticker':
            case 'stiker': 
                if ((isMedia || isQuotedImage) && args.length === 0) {
                    client.reply(from, '_Tunggu sebentar..._', id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    client.sendImageAsSticker(from, imageBase64).then(() => {
                        client.reply(from, 'Silakan')
                        console.log(`Sticker processed for ${processTime(t, moment())} second`)
                    })
                } else if (args.length === 1) {
                    if (!isUrl(url)) { await client.reply(from, '⚠️ Link tidak valid!', id) }
                    client.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined)
                        ? client.sendText(from, '⚠️ Link yang dikirim tidak dapat dimuat!')
                        : client.reply(from, 'Silakan')).then(() => console.log(`Sticker processed for ${processTime(t, moment())} second`))
                } else {
                    await client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                }
            break
            case 'stickergif':
            case 'stikergif':
                if (args.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                client.reply(from, '_Tunggu sebentar..._', id)
                const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
                const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
                if (isGiphy) {
                    const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                    if (!getGiphyCode) { return client.reply(from, '⚠️ Gagal mengambil kode giphy', id) }
                    const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                    const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                    client.sendGiphyAsSticker(from, smallGifUrl)
                    .then(() => {
                        client.reply(from, 'Silakan', id)
                        console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                    })
                    .catch((err) => console.error(err))
                } else if (isMediaGiphy) {
                    const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                    if (!gifUrl) { return client.reply(from, '⚠️ Gagal mengambil kode giphy', id) }
                    const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                    client.sendGiphyAsSticker(from, smallGifUrl)
                    .then(() => {
                        client.reply(from, 'Silakan')
                        console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                    }) 
                    .catch((err) => console.error(err))
                } else {
                    await client.reply(from, '⚠️ Format salah! Ketik *$menu3* untuk penggunaan.', id)
                }
            break

            // Fun
            case 'ask':
            case '8ball':
                const question = args.join(' ')
                const answer = responses[Math.floor(Math.random() * (responses.length))]
                if (!question) client.reply(from, '⚠️ Format salah! Ketik *$menu3* untuk penggunaan.')
                await client.sendText(from, `Pertanyaan: *${question}* \n\nJawaban: ${answer}`)
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
            case 'lenny':
                await client.reply(from, '( ͡° ͜ʖ ͡°)', id)
            break
            case 'randomeme':
            case 'reddit':
                await client.reply(from, '_Sedang mencari..._', id)
                meme.random()
                    .then(({ subreddit, title, url, author }) => {
                        client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                    })
                    .catch((err) => console.error(err))
            break
            case 'reverse':
                if (args.length < 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu3* untuk penggunaan.')
                await client.sendText(from, args.join(' ').split('').reverse().join(''))
            break
            case 'roll':
            case 'dice':
                let roll = Math.floor(Math.random() * 6) + 1
                await client.reply(from, `Kamu mendapatkan angka *${roll}*.`)
            break
            case 'say':
            case 'talk':
                const sayMessage = args.join(' ')
                if (!sayMessage) return client.reply(from, '⚠️ Format salah! Ketik *$menu3* untuk penggunaan.')
                await client.sendText(from, sayMessage)
            break
        
            // Utility
            case 'clock':
            case 'jam':
            case 'waktu':
                await client.sendText(from, `Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
            break
            case 'delete':
            case 'del':
                if (!quotedMsg) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                if (!quotedMsgObj.fromMe) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
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
                await client.sendText(from,`Penggunaan RAM: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*\nCPU: *${os.cpus().length} ${os.cpus()[0].model}*`)
            break
            
            // Weeb Zone
            case 'wait':
                if ((isMedia || isQuotedImage) && args.length === 0) {
                    const fetch = require('node-fetch')
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    client.reply(from, '_Sedang mencari..._', id)
                    fetch('https://trace.moe/api/search', {
                        method: 'POST',
                        body: JSON.stringify({ image: imageBase64 }),
                        headers: { "Content-Type": "application/json" }
                    })
                    .then(respon => respon.json())
                    .then(resolt => {
                        if (resolt.docs && resolt.docs.length <= 0) {
                            client.reply(from, '😔 Maaf, saya tidak tau anime ini.', id)
                        }
                        const { title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                        teks = ''
                        if (similarity < 0.92) {
                            teks = '🤨 Tingkat kesamaan rendah:\n'
                        }
                        teks += `Title: ${title}\nTitle Chinese: ${title_chinese}\nTitle Romaji: ${title_romaji}\nTitle English: ${title_english}\n`
                        teks += `Episode: ${episode.toString()}\n`
                        teks += `Tingkat Kesamaan: ${(similarity * 100).toFixed(1)}%\n`
                        var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                            client.sendFileFromUrl(from, video, 'anime.mp4', teks, id)
                        })
                    .catch(err => {
                        console.error(err)
                        client.reply(from, `Error: ${err}`, id)
                    })
                }
            break
            case 'waifu':
                client.reply(from, '_Sedang mencari..._', id)
                waifu.random()
                    .then(({ url }) => {
                        client.sendFileFromUrl(from, url, 'waifu.jpg', null, null, true)
                    })
                    .catch((err) => console.error(err))
                break

            // Hidden
            case 'hidden':
                await client.sendText(from, menuId.hiddenMenu())
            break

            // NSFW
            case 'fetish':
                let request = args.join(' ')
                if (!request) {
                    client.reply(from, '⚠️ Silakan masukkan tag yang tersedia di *$menu*!')
                }
                client.reply(from, '_Sedang mencari..._', id)

                if (request === 'armpits') {
                    fetish.armpits()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else if (request === 'feets') {
                    fetish.feets()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else if (request === 'thighs') {
                    fetish.thighs()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else if (request === 'booty') {
                    fetish.booty()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else if (request === 'boobs') {
                    fetish.boobs()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else if (request === 'necks') {
                    fetish.necks()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else if (request === 'belly') {
                    fetish.belly()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else if (request === 'sideboobs') {
                    fetish.sideboobs()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else if (request === 'ahegao') {
                    fetish.ahegao()
                        .then(({subreddit, title, url, author}) => {
                            client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                        })
                        .catch((err) => console.error(err))
                } else {
                    client.reply(from, '🙏 Maaf tag belum tersedia. Silakan request.')
                }
            break
            case 'lewds':
            case 'lewd':
                client.reply(from, '_Sedang mencari..._', id)
                lewd.random()
                .then(({ subreddit, title, url, author }) => {
                    client.sendFileFromUrl(from, `${url}`, 'lewd.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                })
                .catch((err) => console.error(err))
            break

            // Group commands (admin only)
            case 'admin':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja!', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini!', id)
                await client.sendText(from, menuId.textAdmin())
            break
            case 'bye':
            case 'out':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja!', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini!', id)
                client.sendText(from, '👋 Bye-bye!').then(() => client.leaveGroup(groupId))
            break
            case 'demote':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja!', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini!', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu!', id)
                if (mentionedJidList.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, '❌ Dia bukan admin, gimana gw demote-nya?', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `✅ Siap mint, anjay lengser @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
            case 'kick':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja!', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini!', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu!', id)
                if (mentionedJidList.length === 0) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                await client.sendTextWithMentions(from, `✅ Siap mint, wisuda lu:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, '❌ Gak bisa kick admin gw bro')
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
            break
            case 'linkgrup':
            case 'linkgroup':
                if (!isGroupMsg) return await client.reply(from, '❌ Command ini hanya bisa digunakan di group saja!', id)
                if (!isGroupAdmins) return await client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini!', id)
                if (!isBotGroupAdmins) return await client.reply(from, '❌ Jadikan saya admin terlebih dahulu!', id)
                if (isGroupMsg) {
                    const inviteLink = await client.getGroupInviteLink(groupId)
                    client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
                }
            break
            case 'promote':
                if (!isGroupMsg) return await client.reply(from, '❌ Command ini hanya bisa digunakan di group saja!', id)
                if (!isGroupAdmins) return await client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini!', id)
                if (!isBotGroupAdmins) return await client.reply(from, '❌ Jadikan saya admin terlebih dahulu!', id)
                if (mentionedJidList.length != 1) return client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, '❌ Dia udah jadi admin njir', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, '⚠️ Format salah! Ketik *$menu* untuk penggunaan.', id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `✅ Siap mint, anjay sekarang @${mentionedJidList[0].replace('@c.us', '')} jadi admin.`)
            break
            case 'status':
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini!', id)
                const loadedMsg = await client.getAmountOfLoadedMessages()
                const chatIds = await client.getAllChatIds()
                const groups = await client.getAllGroups()
                client.sendText(from, `Status :\n- *${loadedMsg}* Message terload\n- *${groups.length}* Group\n- *${chatIds.length - groups.length}* Private chat\n- *${chatIds.length}* Total chat`)
            break
            default:
                console.log(color('[ERROR]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Unregistered command from', color(pushname))
                client.reply(from, '❓ Command tidak ditemukan, silakan cek kembali atau ketik *$menu* untuk melihat list command yang tersedia.')
            break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
