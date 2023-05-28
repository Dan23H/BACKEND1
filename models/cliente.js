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
    },
    photo: {
        type: String,
        required: false
    },
    frontPage: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
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
    localField: "_id",
    foreignField: "client",
    justOne: false
})

ClienteScheme.virtual('comentarios', {
    ref: "Comment",
    localField: "_id",
    foreignField: "client",
    justOne: false
})

module.exports = model("Cliente", ClienteScheme)