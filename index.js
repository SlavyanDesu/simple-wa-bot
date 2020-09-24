const { create, Client } = require('@open-wa/wa-automate')
const { color } = require('./utils')
const options = require('./utils/options')
const msgHandler = require('./handler/message')

const start = (client = new Client()) => {
    console.log('[DEV]', color('Slavyan', 'orange'))
    console.log('[CLIENT] Bot is now online!')

    // Force it to keep the current session
    client.onStateChanged((state) => {
        console.log('[Client State]', state)
        if (state === 'CONFLICT') client.forceRefocus()
    })

    // Listening on message
    client.onMessage((message) => {
        client.getAmountOfLoadedMessages() // Cut message Cache if cache more than 3K
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[CLIENT]', color(`Loaded message reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })
        // Message handler
        msgHandler(client, message)
    })
}

create('Slavyan', options(true, start))
    .then((client) => start(client))
    .catch((err) => new Error(err))
