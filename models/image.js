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
        contentType: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente'
    }
    
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

ImageScheme.method('toJSON', function() {
    const {__v,_id,...object} = this.toObject()
    object.id = _id
    return object
})

CommentScheme.virtual('comentarios', {
    ref: "Comment",
    localField: "_id",
    foreignField: "image",
    justOne: false
})

module.exports = model('Image', ImageScheme)