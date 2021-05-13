const mongoose = require("mongoose")

const shippingInfoSchema = new mongoose.Schema({
    name:{type:String, required:true},
    country:{type:String,required:true},
    city:{type:String,required:true},
    address:{type:String,required:true},
    postalcode: {type:String,required:true}
})

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true,default:1 },
    image: { type: String, required: true },
    price: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
  });
  

  const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shipping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shippingInfo',
      required: true
    },
    payment: {type:String,required:true},
    itemsPrice: { type: Number },
    tax: { type: Number,required:true },
    shippingPrice: { type: Number,required:true},
    totalPrice: { type: Number,required:true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  }, {
    timestamps: true
  });

  const Order = mongoose.model("Orders",orderSchema)

  module.exports = Order;