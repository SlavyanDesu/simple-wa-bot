const { decryptMedia, Client } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
const os = require('os')
const md5 = require('md5')
const curse = require('curse-text')
const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
moment.tz.setDefault('Asia/Jakarta').locale('id')
const { downloader, urlShortener, meme, fetish, lewd, waifu, jadwalShalat, gempa, stalk, dataCuaca, wikipedia, bapak, currToIdr, corona, brainly } = require('../../lib')
const { msgFilter, color, processTime, isUrl } = require('../../utils')

const { textResponse } = require('./text')
const { menuId } = require('./text')

module.exports = msgHandler = async (client = new Client(), message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const botNumber = await client.getHostNumber() + '@c.us'
        const blockNumber = await client.getBlockedIds()
        const ownerNumber = '6281294958473@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isOwner = sender.id === ownerNumber
        const isBlocked = blockNumber.includes(sender.id)

        const prefix = '$'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
        const url = args.length !== 0 ? args[0] : ''
        const q = args.join(' ')
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

        // Ignore user except owner
        if (!isOwner) return

        // Ignore blocked user
        if (isBlocked) return

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
                    .then(async (hasil) => {
                        if (hasil.media_type === 'photo') {
                            await client.sendFileFromUrl(from, hasil.url, 'photo.jpg', '', null, null, true)
                                .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} Diproses selama: ${processTime(t, moment())} detik`))
                                .catch((err) => console.error(err))
                        } else if (hasil.media_type === 'video') {
                            await client.sendFileFromUrl(from, hasil.url, 'video.mp4', `Berhasil diproses selama: ${processTime(t, moment())} detik`, null, null, true)
                                .then((serialized) => console.log(`Sukses mengirim file dengan ID: ${serialized} Diproses selama: ${processTime(t, moment())} detik`))
                                .catch((err) => console.error(err))
                        } else if (hasil.media_type === 'slide') {
                            function foreach(arr, func) {
                                for (let i in arr) {
                                    func(i, arr[i])
                                }
                            }
                            if (hasil.data[0][0].type === 'foto') {
                                foreach(hasil.data[0], function(i) {
                                    client.sendFileFromUrl(from, hasil.data[0][i].url, 'slide.jpg', '', null, null, true)
                                        .then(() => console.log('Berhasil mengirim file!'))
                                        .catch((err) => console.error(err))
                                })
                            } else if (hasil.data[0][0].type === 'video') {
                                foreach(hasil.data[0], function(i) {
                                    client.sendFileFromUrl(from, hasil.data[0][i].url, 'slide.mp4', '', null, null, true)
                                        .then(() => console.log('Berhasil mengirim file!'))
                                        .catch(() => console.error(err))
                                })
                            }
                        } else {
                            return client.reply(from, '⚠️ Link tidak valid atau user private! [INVALID]', id)
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
                if (!isUrl(url) && !url.includes('youtu.be')) return client.reply(from, '⚠️ Link tidak valid! [INVALID]', id)
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
                if (!isUrl(url) && !url.includes('youtu.be')) return client.reply(from, '⚠️ Link tidak valid! [INVALID]', id)
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
                            console.log(`Stiker diproses selama: ${processTime(t, moment())} detik`)
                        })
                        .catch((err) => {
                            console.error(err)
                            client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`, id)
                        })
                    } else if (args.length === 1) {
                        if (!isUrl(url)) return client.reply(from, '⚠️ Link tidak valid!', id)
                        await client.sendStickerfromUrl(from, url)
                            .then((r) => (!r && r !== undefined) ? client.sendText(from, '⚠️ Link yang dikirim tidak dapat dimuat! [CANNOT LOAD]', id) : client.reply(from, 'Silakan', id))
                            .then(() => console.log(`Stiker diproses selama: ${processTime(t, moment())} detik`))
                    } else {
                        client.reply(from, '⚠️ Format salah! Ketik *$menu2* untuk penggunaan. [WRONG FORMAT]', id)
                    }
            break

            // Fun
            case 'ask':
            case '8ball':
                const question = args.join(' ')
                const answer = textResponse[Math.floor(Math.random() * (textResponse.length))]
                if (!question) {
                    return client.reply(from, '⚠️ Harap masukkan teks! [WRONG FORMAT]', id)
                } else {
                    client.sendText(from, `Pertanyaan: *${question}* \n\nJawaban: ${answer}`)
                }
            break
            case 'bapack':
                const kata = args.join(' ')
                if (!kata) return client.reply(from, '⚠️ Harap masukkan teks! [WRONG FORMAT]', id)
                bapak.font(kata)
                    .then(({ status, text }) => {
                        if (status === null) {
                            client.reply(from, '⚠️ Terjadi kesalahan! [ERR]', id)
                        } else {
                            client.sendText(from, text)
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            break
            case 'binary':
            case 'bin':
            case 'biner':
                exports.method = {
                    encode: input => {
                        return input.toString().split('').map(c => c.charCodeAt(0).toString(2))
                    }
                }
                const input = args.join(' ')
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
                const userText = args.join(' ')
                if (!userText) {
                    return client.reply(from, '⚠️ Harap masukkan teks! [WRONG FORMAT]', id)
                } else {
                client.sendText(from, curse(userText))
                }
            break
            case 'lenny':
                client.sendText(from, '( ͡° ͜ʖ ͡°)', id)
            break
            case 'md5':
                const yourText = args.join(' ')
                if (!yourText) {
                    return client.reply(from, '⚠️ Harap masukkan teks! Ketik *$menu3* untuk penggunaan. [WRONG FORMAT]', id)
                } else {
                    client.sendText(from, md5(yourText))
                }
            break
            case 'mocking':
            case 'mock':
                const textMock = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('')
                if (args.length < 1) {
                    return client.reply(from, '⚠️ Harap masukkan teks! Ketik *$menu3* untuk penggunaan. [WRONG FORMAT]', id)
                } else {
                    client.sendText(from, args.map(textMock).join(' '))
                }
            break
            case 'randomeme':
            case 'reddit':
                client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                meme.random()
                    .then(({ subreddit, title, url, author }) => {
                        client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, null, null, true)
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
            break
            case 'reverse':
                if (args.length < 1) return client.reply(from, '⚠️ Harap masukkan teks! Ketik *$menu3* untuk penggunaan. [WRONG FORMAT]')
                client.sendText(from, args.join(' ').split('').reverse().join(''))
            break
            case 'roll':
            case 'dice':
                const roll = Math.floor(Math.random() * 6) + 1
                client.reply(from, `Kamu mendapatkan angka *${roll}*.`)
            break
            case 'say':
            case 'talk':
                const sayMessage = args.join(' ')
                if (!sayMessage) return client.reply(from, '⚠️ Harap masukkan teks! [WRONG FORMAT]')
                client.sendText(from, sayMessage)
            break
        
            // Utility
            case 'brainly':
                if (args.length >= 2) {
                    let tanya = args.join(' ')
                    let jum = Number(tanya.split('.')[1]) || 2
                    if (jum > 10) return client.reply(from, 'Max 10!', id)
                    if (Number(tanya[tanya.length - 1])) {
                        tanya
                    }
                    await brainly.search(tanya.split('.')[0], Number(jum), function(res) {
                        res.forEach((x) => {
                            if (x.jawaban.fotoJawaban.length === 0) {
                                client.reply(from, `=> *Pertanyaan*: ${x.pertanyaan}\n\n=> *Jawaban*: ${x.jawaban.judulJawaban}\n`, id)
                            } else {
                                client.reply(from, `=> *Pertanyaan*: ${x.pertanyaan}\n\n=> *Jawaban*: ${x.jawaban.judulJawaban}\n\n=> *Link foto jawaban*: ${x.jawaban.fotoJawaban.join('\n')}`, id)
                            }
                        })
                    })
                } else {
                    client.reply(from, '⚠️ Format salah! Ketik *$menu4* untuk penggunaan [WRONG FORMAT]', id)
                }
            break
            case 'clock':
            case 'jam':
            case 'waktu':
                client.sendText(from, `Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
            break
            case 'cuaca':
                if (args.length !== 1) return client.reply(from, '⚠️ Harap masukkan nama lokasi yang valid! Ketik *$menu4* untuk penggunaan.', id)
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                dataCuaca.cuaca(q)
                    .then(({ result, error }) => {
                        if (error) return client.reply(from, error, id)
                        const array = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
                        const tanggal = new Date().getDate()
                        const bulan = new Date().getMonth()
                        const tahun = new Date().getFullYear()
                        client.sendText(from, `*Data Cuaca di ${result.tempat}*\n${tanggal} ${array[bulan]} ${tahun}\n\nCuaca: ${result.cuaca}\nSuhu: ${result.suhu}\nKelembapan: ${result.kelembapan}\nAngin: ${result.angin}\nUdara: ${result.udara}`)
                            .then(() => console.log('Berhasil mengirim data cuaca!'))

                    })
                    .catch((err) => {
                        console.error(err)
                    })
            break
            case 'corona':
                corona.indonesia()
                    .then(({ total, kasus_baru, meninggal, meninggal_baru, sembuh, penanganan, terakhir }) => {
                        client.sendText(from, `*DATA COVID-19 INDONESIA*\n\nReminder: _jaga jarak, gunakan masker, dan jangan berkerumun!_ 😷\n\nKasus baru: *${kasus_baru}*\nTotal kasus: *${total}*\nMeninggal baru: *${meninggal_baru}*\nTotal meninggal: *${meninggal}*\nSembuh: *${sembuh}*\nDalam penanganan: *${penanganan}*\n\n_Diupdate terakhir: ${terakhir}_`)
                            .then(() => console.log('Berhasil mengirim data COVID-19!'))
                            .catch((err) => console.error(err))
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            break
            case 'delete':
            case 'del':
                if (!quotedMsg) return client.reply(from, '⚠️ Harap reply salah satu pesan! Ketik *$menu4* untuk penggunaan. [WRONG FORMAT]', id)
                if (!quotedMsgObj.fromMe) return client.reply(from, '⚠️ Hanya bisa menghapus pesan dari saya! Ketik *$menu4* untuk penggunaan. [WRONG FORMAT]', id)
                await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
            case 'donate':
            case 'donasi':
                client.sendText(from, menuId.donate())
            break
            case 'faq':
                client.sendText(from, menuId.textFaq())
            break
            case 'igstalk':
            case 'igs':
                if (args.length !== 1) return client.reply(from, '⚠️ Harap masukkan username Instagram! Ketik *$menu4* untuk penggunaan. [WRONG FORMAT]', id)
                const username = args.join(' ')
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                stalk.instagram(username)
                    .then(({ Biodata, Jumlah_Followers, Jumlah_Following, Jumlah_Post, Name, Profile_pic, Username, error }) => {
                        if (error) client.reply(from, error, id)
                        client.sendFileFromUrl(from, Profile_pic, 'profile.jpg', `${Biodata}\n\nUsername: ${Username}\nName: ${Name}\nFollowers: ${Jumlah_Followers}\nFollowing: ${Jumlah_Following}\nPost: ${Jumlah_Post}`, null, null, true)
                            .then(() => console.log('Berhasil mengirim info akun Instagram!'))
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            break
            case 'infogempa':
            case 'gempa':
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                gempa.info()
                    .then(({ kedalaman, koordinat, lokasi, magnitude, map, potensi, waktu }) => {
                        client.sendFileFromUrl(from, map, 'gempa.jpg', `${lokasi}\n${potensi}\n\nKoordinat: ${koordinat}\nMagnitudo: ${magnitude} SR\nKedalaman: ${kedalaman}\nWaktu: ${waktu}`, null, null, true)
                            .then(() => console.log('Berhasil mengirim data gempa dari BMKG!'))
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan!\n\n${err}`, id)
                    })
            break
            case 'jadwalshalat':
            case 'jadwalsholat':
            case 'shalat':
            case 'sholat':
                if (args.length !== 1) return client.reply(from, '⚠️ Harap masukkan nama daerah yang valid! Ketik *$menu4* untuk penggunaan.', id)
                const namaDaerah = args.join(' ')
                const daerah = namaDaerah.charAt(0).toUpperCase() + namaDaerah.slice(1)
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                jadwalShalat.jadwal(daerah)
                    .then(({ Ashar, Dhuha, Dzuhur, Imsyak, Isya, Maghrib, Subuh, error }) => {
                        if (error) return client.reply(from, error, id)
                        const array = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
                        const tanggal = new Date().getDate()
                        const bulan = new Date().getMonth()
                        const tahun = new Date().getFullYear()
                        client.sendText(from, `Assalamu'alaikum ${pushname}\nJadwal Shalat di ${daerah}\n${tanggal} ${array[bulan]} ${tahun}\n\nImsyak: ${Imsyak}\nSubuh: ${Subuh}\nDhuha: ${Dhuha}\nDzuhur: ${Dzuhur}\nAshar: ${Ashar}\nMaghrib: ${Maghrib}\nIsya: ${Isya}`)
                            .then(() => console.log('Berhasil mengirim jadwal sholat!'))
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            break
            case 'menu':
            case 'help':
            case 'h':
                client.sendText(from, menuId.textMenu())
            break
            case 'menu1':
                client.sendText(from, menuId.textMenu1())
            break
            case 'menu2':
                client.sendText(from, menuId.textMenu2())
            break
            case 'menu3':
                client.sendText(from, menuId.textMenu3())
            break
            case 'menu4':
                client.sendText(from, menuId.textMenu4())
            break
            case 'menu5':
                client.sendText(from, menuId.textMenu5())
            break
            case 'menuall':
                client.sendText(from, menuId.textMenuAll())
            break
            case 'speed':
            case 'ping':
            case 'p':
                await client.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} detik`)
            break
            case 'rules':
            case 'rule':
                client.sendText(from, menuId.textRules())
            break
            case 'server':
                await client.sendText(from,`Penggunaan RAM: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*\nCPU: ${os.cpus()[0].model}`)
            break
            case 'status':
            case 'stats':
                const loadedMsgs = await client.getAmountOfLoadedMessages()
                const chatIds = await client.getAllChatIds()
                const groups = await client.getAllGroups()
                await client.sendText(from, `Status :\n- *${loadedMsgs}* Message terload\n- *${groups.length}* Group\n- *${chatIds.length - groups.length}* Private chat\n- *${chatIds.length}* Total chat`)
            break
            case 'toidr':
                if (args.length !== 2) return client.reply(from, '⚠️ Harap masukkan kurensi dan jumlah yang ingin di-convert! Ketik *$menu4* untuk penggunaan. [WRONG FORMAT]', id)
                currToIdr.kurensi(args[0], args[1])
                    .then(({ status, result }) => {
                        if (status === 'false') return client.reply('⚠️ Kurensi tidak ditemukan! [WRONG FORMAT]', id)
                        client.sendText(from, result.resultConvert)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            break
            case 'wikipedia':
            case 'wiki':
                if (!q) return client.reply(from, '⚠️ Harap masukkan sesuatu yang ingin dicari! Ketik *$menu4* untuk penggunaan.', id)
                await client.reply(from, '_Mohon tunggu sebentar, proses ini akan memakan waktu beberapa menit..._\n\nMerasa terbantu karena bot ini? Bantu saya dengan cara donasi melalui:\n081294958473 (Telkomsel/OVO/GoPay)\n\nTerima kasih 🙏', id)
                wikipedia.pencarian(q)
                    .then(({ result, error }) => {
                        if (error) return client.reply(from, error, id)
                        client.sendText(from, result)
                            .then(() => console.log('Berhasil mengirim wiki!'))
                    })
                    .catch((err) => {
                        console.error(err)
                    })
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
                                teks = '🤔 Tingkat kesamaan rendah.\n\n'
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
                client.sendText(from, menuId.hiddenMenu())
            break

            // NSFW
            case 'multifetish':
            case 'mfetish':
                const request = args.join(' ')
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
                            let sange = memes[i]
                            client.sendFileFromUrl(from, sange.url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Sukses mengirim file!'))
                                .catch((err) => console.log(err))
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        client.reply(from, `⚠️ Terjadi kesalahan! [ERR]\n\n${err}`)
                    })
            break

            // Group commands
            case 'add':
                const user = args.join(' ')
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [BOT NOT ADMIN]', id)
                if (!user || args.length > 1) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                try {
                    await client.addParticipant(from, `${user}@c.us`)
                        .then(() => client.sendText(from, '🎉 Selamat datang! 🎉'))
                } catch (err) {
                    console.error(err)
                    client.reply(from, `⚠️ Terjadi kesalahan saat menambah member! [ERR]\n\n${err}`)
                }
            break
            case 'group':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                client.sendText(from, menuId.textGroup())
            break
            case 'bye':
            case 'out':
            case 'leave':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                client.sendText(from, '👋 Bye-bye!')
                    .then(() => client.leaveGroup(groupId))
            break
            case 'demote':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja!', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [BOT NOT ADMIN]', id)
                if (mentionedJidList.length !== 1) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, '❌ Dia bukan admin, gimana gw demote-nya? [USER NOT AN ADMIN]', id)
                if (mentionedJidList[0] === botNumber) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `✅ Siap mint, anjay lengser @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
            case 'groupinfo':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                let groupName = name
                let groupDesc = chat.groupMetadata.desc
                let groupPic = await client.getProfilePicFromServer(chat.id)
                let totalMem = chat.groupMetadata.participants.length
                let groupOwner = chat.groupMetadata.owner
                if (groupPic === undefined) {
                    var pfp = errorurl
                } else {
                    var pfp = groupPic
                }
                await client.sendFileFromUrl(from, pfp, 'group.jpg', `*${groupName}*\n\n👥 *Member: ${totalMem}*\n🗒️ *Deskripsi grup*:\n${groupDesc}`, null, null, true)
                    .then(() => client.sendTextWithMentions(from, `Group owner: @${groupOwner}`))
            break
            case 'kick':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [BOT NOT ADMIN]', id)
                if (mentionedJidList.length === 0) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                if (mentionedJidList[0] === botNumber) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                await client.sendTextWithMentions(from, `✅ Siap mint, wisuda lu:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
            break   
            case 'linkgrup':
            case 'linkgroup':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [BOT NOT ADMIN]', id)
                if (isGroupMsg) {
                    const inviteLink = await client.getGroupInviteLink(groupId)
                    await client.sendLinkWithAutoPreview(from, inviteLink, `\nLink grup *${name}*`)
                }
            break
            case 'promote':
                if (!isGroupMsg) return client.reply(from, '❌ Command ini hanya bisa digunakan di group saja! [GROUP ONLY]', id)
                if (!isGroupAdmins) return client.reply(from, '❌ Hanya admin yang bisa menggunakan command ini! [ADMIN ONLY]', id)
                if (!isBotGroupAdmins) return client.reply(from, '❌ Jadikan saya admin terlebih dahulu! [BOT NOT ADMIN]', id)
                if (mentionedJidList.length != 1) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan. [WRONG FORMAT]', id)
                if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, '❌ Dia udah jadi admin njir [USER IS ADMIN]', id)
                if (mentionedJidList[0] === botNumber) return client.reply(from, '⚠️ Format salah! Ketik *$admin* untuk penggunaan.', id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `✅ Siap mint, anjay sekarang @${mentionedJidList[0].replace('@c.us', '')} jadi admin.`)
            break

            // Owner only
            case 'leaveall':
                if (!isOwner) return client.reply(from, '⚠️ Command ini khusus owner bot! [DENIED]', id)
                const allChats = await client.getAllChatIds()
                const allGroups = await client.getAllGroups()
                for (let gclist of allGroups) {
                    await client.sendText(gclist.contact.id, `Maad, bot sedang pembersihan, total chat aktif: ${allChats.length}`)
                    await client.leaveGroup(gclist.contact.id)
                }
                client.reply(from, 'Sukses keluar dari semua grup!', id)
            break
            case 'clearall':
                if (!isOwner) return client.reply(from, '⚠️ Command ini khusus owner bot! [DENIED]', id)
                const allChatz = await client.getAllChats()
                for (let dchat of allChatz) {
                    await client.deleteChat(dchat.id)
                }
                client.reply(from, 'Sukses menghapus semua pesan!', id)
            break
            case 'bc':
                if (!isOwner) return client.reply(from, '⚠️ Command ini khusus owner bot! [DENIED]', id)
                const brodkes = args.join(' ')
                if (!brodkes) return client.reply(from, 'Masukkin pesan lu njir', id)
                const chatz = await client.getAllChatIds()
                for (let bcz of chatz) {
                    var cvk = await client.getChatById(bcz)
                    if (!cvk.isReadOnly) await client.sendText(bcz, `[ KOSAKI BOT DEV BROADCAST ]\n\n${brodkes}`)
                }
                client.reply(from, 'Broadcast berhasil!', id)
            break
            case 'getses':
                if (!isOwner) return client.reply(from, '⚠️ Command ini khusus owner bot! [DENIED]', id)
                const ses = await client.getSnapshot()
                client.sendFile(from, ses, 'session.jpg', '', id)
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
