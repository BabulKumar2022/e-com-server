import mongoose from "mongoose"



const orderSchema = new mongoose.Schema({
name: {
    type: String,
    // required: [true, 'Order Name required']
},
email:{
    type: String,
    // required: [true, 'email is required']
},
userId:{
    type: String,
    // required: true
},
orderItems: [],
shippingAddress:{
    type: Object,
  
},

    orderAmount: {
        type: String,
        // required: true
    },
    isDelivered:{
        type: String,
        // required: true
    },
    transactionId:{
        type: String,
        // required: true
    }

},
{timestamps: true}
)
export default mongoose.model("orders", orderSchema ) 