const { Schema, model } = require('mongoose')

const CommentScheme = Schema({

    comentario: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }
    
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

CommentScheme.method('toJSON', function() {
    const {__v,_id,...object} = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Comment', CommentScheme)