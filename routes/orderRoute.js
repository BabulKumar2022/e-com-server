import express from 'express'
import { createOrderController } from '../controllers/orderController.js';
import {  requireSignIn } from "../middlewares/authMiddleware.js";


const  router = express.Router();


 

router.post('/order-product', requireSignIn,  createOrderController)


export default router