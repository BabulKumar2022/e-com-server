import mongoose from "mongoose";


const connectDB =  async() =>{
try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`DB is connected ${conn.connection.host}`)
} catch (error) {
    console.log("DB is not connected")
}
}
 
export default connectDB; 