require('dotenv').config()
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
const os = require('os')
const figlet = require('figlet')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const { downloader, cekResi, removebg, urlShortener, meme, translate, getLocationData } = require('../../lib')
const { msgFilter, color, processTime, isUrl } = require('../../utils')
const { uploadImages } = require('../../utils/fetcher')
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
    'Setelah gw pikir sih mungkin aja'
]

const { menuId, menuEn } = require('./text') // Indonesian & English menu
const { youtube } = require('video-url-link')

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
        const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }

        // Bot Prefix
        const prefix = '$'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const uaOverride = process.env.UserAgent
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'

        // [BETA] Avoid Spam Message
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        //
        if (!isCmd && !isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname)) }
        if (!isCmd && isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }

        // [BETA] Avoid Spam Message
        msgFilter.addFilter(from)

        switch (command) {
        // Utilities
        case 'speed':
        case 'ping':
            await client.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_`)
            break
        case 'menu':
        case 'help':
            await client.sendText(from, menuId.textMenu(pushname))
                .then(() => ((isGroupMsg) && (isGroupAdmins)) ? client.sendText(from, 'Menu buat admin: *$admin*') : null)
            break
        case 'tnc':
        case 'readme':
            await client.sendText(from, menuId.textTnC())
            break
        case 'server':
            await client.sendText(from, `Penggunaan RAM: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*\nCPU: *${os.cpus().length} ${os.cpus()[0].model}*`)
            break
        case 'ev':
        case 'eval':
            try {
                const code = args.join(' ')
                if (!code) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*')
                let evaled = eval(code)

                if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled)

                await client.sendText(from, clean(evaled), {code:'xl'})
            } catch (err) {
                client.sendText(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
            }
            break
        case 'clock':
        case 'jam':
        case 'waktu':
            await client.sendText(from, `Waktu Indonesia Barat: ${moment().utcOffset('+0700').format('HH:mm')} WIB \nWaktu Indonesia Tengah: ${moment().utcOffset('+0800').format('HH:mm')} WITA \nWaktu Indonesia Timur: ${moment().utcOffset('+0900').format('HH:mm')} WIT`)
            break

        // Fun
        case 'ascii':
            if (!args) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*')
            figlet (args.join(' '), function (err, data) {
                if (err) {
                    console.log('Something is wrong...')
                    console.dir(err)
                    return
                }
                client.sendText(from, '```' + data + '```')
            })
            break
        case 'ask':
        case '8ball':
            const question = args.join(' ')
            const answer = responses[Math.floor(Math.random() * (responses.length))]
            if (!question) client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*')
            await client.sendText(from, `Pertanyaan lu: ${question} \n\nJawaban gw: ${answer}`)
            break
        case 'reverse':
            if (args.length < 1) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*')
            await client.sendText(from, args.join(' ').split('').reverse().join(''))
            break
        case 'roll':
        case 'dice':
            let roll = Math.floor(Math.random() * 6) + 1
            await client.reply(from, `Lu mendapatkan angka *${roll}*.`)
            break
        case 'talk':
        case 'say':
            const sayMessage = args.join(' ')
            if (!sayMessage) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*')
            await client.sendText(from, sayMessage)
            break
        case 'coinflip':
        case 'coin':
        case 'flip':
            const coin = [
                'Heads',
                'Tails'
            ]
            const random = coin[Math.floor(Math.random() * (coin.length))]
            await client.reply(from, `Lu dapet *${random}*`)
        break

        // Buat bikin stiker
        case 'sticker':
        case 'stiker': {
            if ((isMedia || isQuotedImage) && args.length === 0) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                client.sendImageAsSticker(from, imageBase64).then(() => {
                    client.reply(from, 'Nih bangsat')
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                })
            } else if (args.length === 1) {
                if (!isUrl(url)) { await client.reply(from, 'Link antum tidak valid.', id) }
                client.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined)
                    ? client.sendText(from, 'Gambar yang lu kirim kagak bisa dimuat')
                    : client.reply(from, 'Nih bangsat')).then(() => console.log(`Sticker Processed for ${processTime(t, moment())} Second`))
            } else {
                await client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            }
            break
        }
        
        // Downloader
        case 'ig':
        case 'instagram':
            if (args.length !== 1) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            if (!isUrl(url) && !url.includes('instagram.com')) return client.reply(from, 'Link lu kagak valid.', id)
            await client.reply(from, 'Tunggu bentar...', id)
            downloader.insta(url).then(async (data) => {
                if (data.type == 'GraphSidecar') {
                    if (data.image.length != 0) {
                        data.image.map((x) => client.sendFileFromUrl(from, x, 'photo.jpg', '', null, null, true))
                            .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                            .catch((err) => console.error(err))
                    }
                    if (data.video.length != 0) {
                        data.video.map((x) => client.sendFileFromUrl(from, x.videoUrl, 'video.jpg', '', null, null, true))
                            .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                            .catch((err) => console.error(err))
                    }
                } else if (data.type == 'GraphImage') {
                    client.sendFileFromUrl(from, data.image, 'photo.jpg', '', null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                } else if (data.type == 'GraphVideo') {
                    client.sendFileFromUrl(from, data.video.videoUrl, 'video.mp4', '', null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                }
            })
                .catch((err) => {
                    if (err === 'Not a video') { return client.reply(from, 'Link lu bukan video', id) }
                    client.reply(from, 'Gak bisa, kayaknya link lu invalid atau IG-nya private', id)
                })
            break
            case 'fb':
            case 'facebook':
                if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                if (!isUrl(url) && !url.includes('facebook.com')) return client.reply(from, 'Maaf, url yang kamu kirim tidak valid. [Invalid Link]', id)
                await client.reply(from, '_Scraping Metadata..._ \n\nTerimakasih telah menggunakan bot ini, kamu dapat membantu pengembangan bot ini dengan menyawer melalui https://saweria.co/donate/yogasakti atau mentrakteer melalui https://trakteer.id/red-emperor \nTerimakasih.', id)
                downloader.facebook(url).then(async (videoMeta) => {
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
                    const caption = `Text: ${title} \n\nLink Download: \n${link.join('\n')} \n\nProcessed for ${processTime(t, moment())} _Second_`
                    await client.sendFileFromUrl(from, thumbnail, 'videos.jpg', caption, null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                })
                    .catch((err) => client.reply(from, `Error, url tidak valid atau tidak memuat video. [Invalid Link or No Video] \n\n${err}`, id))
            break
            case 'twt':
            case 'twitter':
                if (args.length !== 1) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
                if (!isUrl(url) & !url.includes('twitter.com') || url.includes('t.co')) return client.reply(from, 'Link lu kagak valid', id)
                await client.reply(from, 'Tunggu bentar...', id)
                downloader.tweet(url).then(async (data) => {
                    if (data.type === 'video') {
                        const content = data.variants.filter(x => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                        const result = await urlShortener(content[0].url)
                        console.log('Shortlink: ' + result)
                        await client.sendFileFromUrl(from, content[0].url, 'video.mp4', `Download: ${result} \n\nBerhasil diproses selama ${processTime(t, moment())} detik`, null, null, true)
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
                    .catch(() => client.sendText(from, 'Link lu kagak valid'))
                break
        
        // Group Commands (group admin only)
        case 'admin':
            if (!isGroupMsg) return client.reply(from, 'Command ini cuman bisa dipake di grup', id)
            if (!isGroupAdmins) return client.reply(from, 'Lo bukan admin juga woy!', id)
            await client.sendText(from, menuId.textAdmin())
            break
        case 'kick':
            if (!isGroupMsg) return client.reply(from, 'Command ini cuman bisa dipake di grup', id)
            if (!isGroupAdmins) return client.reply(from, 'Lo bukan admin juga woy!', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Jadiin gw admin dulu, baru bisa', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            await client.sendTextWithMentions(from, `Siap mint, wisuda lu:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, 'Gak bisa kick admin gw bro')
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case 'promote':
            if (!isGroupMsg) return await client.reply(from, 'Command ini cuman bisa dipake di grup', id)
            if (!isGroupAdmins) return await client.reply(from, 'Lo bukan admin juga woy!', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Jadiin gw admin dulu, baru bisa', id)
            if (mentionedJidList.length != 1) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Dia udah jadi admin njir', id)
            if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Siap mint, anjay sekarang @${mentionedJidList[0].replace('@c.us', '')} jadi admin.`)
            break
        case 'demote':
            if (!isGroupMsg) return client.reply(from, 'Command ini cuman bisa dipake di grup', id)
            if (!isGroupAdmins) return client.reply(from, 'Lo bukan admin juga woy!', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Jadiin gw admin dulu, baru bisa', id)
            if (mentionedJidList.length !== 1) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Dia bukan admin, gimana gw demote-nya?', id)
            if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Siap mint, anjay lengser @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
        case 'out':
        case 'bye':
            if (!isGroupMsg) return client.reply(from, 'Command ini cuman bisa dipake di grup', id)
            if (!isGroupAdmins) return client.reply(from, 'Lo bukan admin juga woy!', id)
            client.sendText(from, 'Tega lu bang :(').then(() => client.leaveGroup(groupId))
            break
        case 'del':
            if (!isGroupAdmins) return client.reply(from, 'Lo bukan admin juga woy!', id)
            if (!quotedMsg) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Lah? Salah bego. Cek formatnya di *$menu*', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case 'status': {
            if (!isGroupAdmins) return client.reply(from, 'Lo bukan admin juga woy!', id)
            const loadedMsg = await client.getAmountOfLoadedMessages()
            const chatIds = await client.getAllChatIds()
            const groups = await client.getAllGroups()
            client.sendText(from, `Status :\n- *${loadedMsg}* Message terload\n- *${groups.length}* Group\n- *${chatIds.length - groups.length}* PC\n- *${chatIds.length}* Total chat`)
            break
        }
        default:
            console.log(color('[ERROR]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Unregistered Command from', color(pushname))
            break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
