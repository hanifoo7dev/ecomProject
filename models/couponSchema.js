const mongoose = require('mongoose')
const {Schema} = mongoose

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  couponType: {
    type: String,
    enum: ['percent', 'fixed'],
    required: true
  },
  couponAmount: {
    type: Number,
    required: true
  },
    minimumAmount: {   
    type: Number,
    },
    redeenCustomer:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' }]
    },owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
       }
})

module.exports= mongoose.model('Coupon',couponSchema)