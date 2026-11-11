const mongoose = require('mongoose')
const {Schema} = mongoose

const cardSchema = new Schema({

    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity:{
        type: Number,
        default: 1,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
       }

})

module.exports= mongoose.model('Card',cardSchema)