import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const MONGO_URI = process.env.MONGO_URI

const dbConnection = async () =>{
   try {
    const conn = await mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
      })
      console.log(`Mongodb connected: ${mongoose.connection.host}`.bgGreen);
   } catch (error) {
    console.log("Error while connecting to database",error.message.bgRed);
   }
}


export default dbConnection;