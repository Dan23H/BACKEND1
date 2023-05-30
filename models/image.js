const { Schema, model } = require('mongoose')

const ImageScheme = Schema({

    categoria: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String
    },
    likes: {
        data: Number
    },
    dislikes: {
        type: Number
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente'
    }

}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

ImageScheme.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

ImageScheme.virtual('comentarios', {
    ref: "Comment",
    localField: "_id",
    foreignField: "image",
    justOne: false
})

module.exports = model('Image', ImageScheme)