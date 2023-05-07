import orderModel from "../models/orderModel.js";
import { v4 as uuidv4 } from 'uuid';



import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51N3LwID3DUasc0CjVIsJmI7RAlUfDJ7z5QK8R4zQ0MPQVAHNPeT7lQBomCVhjcELmht0VWvbu1Nn6BffMFUOZzS800HyPESzbl');


//========create==product-oder================
export const createOrderController  =  async(req, res) =>{
const {token, totalPrice, currentUser, cartItem} = req.body
    try {
        const customer = await stripe.customer.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: totalPrice * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })
        if(payment && payment){
            const newOrder =  {
                name: currentUser.name,
                email: currentUser.email,
                userId: currentUser._id,
                orderItems: cartItem,
                orderAmount: totalPrice,
                shippingAddress: {
                    street: token.card.address_line1,
                    city:token.card.address_city,
                    code:token.card.address_zip
                },
                transactionId: payment.source.id
            }
            // newOrder.save()
            // res.send('Payment Success')

            const order = await new orderModel(newOrder).save()
            res.status(201).send({
                success: true,
                massage:  "Payment Success" ,
                order,
                
            }); 
        }else{
            res.send('Payment Failed')
        }
    } catch (error) {
       res.status(400).json({
        message: "Something went wrong",
        error
       })
        
    }
}