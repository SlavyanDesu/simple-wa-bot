const { create, Client } = require('@open-wa/wa-automate')
const { color } = require('./utils')
const options = require('./utils/options')
const msgHandler = require('./handler/message')

const start = (client = new Client()) => {
    console.log('[DEV]', color('Slavyan', 'orange'))
    console.log('[CLIENT]', color('Bot is now online!', 'cyan'))

    // Force it to keep the current session
    client.onStateChanged((state) => {
        console.log('[CLIENT STATE]', state)
        if (state === 'UNPAIRED') client.forceRefocus()
        if (state === 'CONFLICT') client.forceRefocus()
    })

    // Set all received message to seen
    client.onAck((x) => {
        const { to } = x
        if (x !== 3) client.sendSeen(to)
    })

    // Listening on message
    client.onMessage((message) => {
        client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[CLIENT]', color(`Loaded message reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })
        msgHandler(client, message) // Message handler
    })

    // When someone trying to call bot, he will be blocked
    client.onIncomingCall(async (callData) => {
        await client.sendText(from, 'ID: Bot tidak menerima panggilan. Karena kamu telah melanggar rules, maka kamu telah diblok!\n\nEN: Bot is not receiving for calls. You has been blocked, because breaking the rules!')
            .then(() => client.contactBlock(callData.peerJid))
    })
}

// Creating *.data.json
create('Slavyan', options(true, start))
    .then((client) => start(client))
    .catch((err) => new Error(err))
