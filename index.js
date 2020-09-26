const { create, Client } = require('@open-wa/wa-automate')
const { color } = require('./utils')
const options = require('./utils/options')
const msgHandler = require('./handler/message')

const start = (client = new Client()) => {
    console.log('[DEV]', color('Slavyan', 'orange')) // Change your name and color here
    console.log('[CLIENT] Bot is now online!')

    // Force it to keep the current session
    client.onStateChanged((state) => {
        console.log('[Client State]', state)
        if (state === 'UNPAIRED') client.forceRefocus()
        if (state === 'CONFLICT') client.forceRefocus()
    })
    
    // Set all received message to seen
    client.onAck((x => {
        const { from, to, ack } = x
        if (x !== 3) client.sendSeen(to)
    }))

    // Listening on message
    client.onMessage((message) => {
        client.getAmountOfLoadedMessages() // Cut message cache if it reach more than 3K
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

// Creating Slavyan.data.json
create('Slavyan', options(true, start)) // Change your session name here
    .then((client) => start(client))
    .catch((err) => new Error(err))
