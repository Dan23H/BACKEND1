const { Schema, model } = require('mongoose')

const ChatScheme = Schema({

    autor: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

})

module.exports = model('Chat', ChatScheme)