const { Schema, model, default: mongoose } = require('mongoose')

const ImageScheme = new mongoose.Schema({

    categoria: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String
        }
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