import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'
import cors from "cors";



 
// config env
dotenv.config();
 
// database config
connectDB();
 
 
// rest object
const app = express();  

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);





// ========================///=============
// rest api
app.get("/", (req, res)=>{
    res.send(
     "<h1>Server is running on 8000 </h1>"
    )
}); 
// PORT  
 const PORT = process.env.PORT || 8000; 
 const DEV_MODE = process.env.DEV_MODE;

//run listen 
app.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON ${DEV_MODE} MODE ON PORT ${PORT}`)
});

