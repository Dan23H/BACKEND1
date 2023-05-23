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
        type: String,
        required: true
    },
    user: {
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
    object.io = _id
    return object
})

module.exports = model('Image', ImageScheme)