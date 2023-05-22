const {Schema, model} = require('mongoose')

const ClienteScheme = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    toJSON: {
        virtuals: true
    }, 
    toObject: {
        virtuals: true
    }
})

ClienteScheme.virtual('imagenes', {
    ref: "Image",
    localfield: "_id",
    foreignField: "client",
    justOne: false
})

module.exports = model("Cliente", ClienteScheme)