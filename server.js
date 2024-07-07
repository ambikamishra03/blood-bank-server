import express from "express";
import  authRoutes  from "./routes/authRoutes.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import dbConnection from "./config/db.js";

dotenv.config()
//mpongodb connection
dbConnection()

//rest object
const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))  // which url hitted will show on dev console
 
// port
const PORT = process.env.PORT || 8080
// const DEV_MODE = process.env.DEV_MODE


// routes
app.use('/api/v1/auth',authRoutes);



//listen
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})





//    mongodb+srv://ambikamishra9236:Ambika9236@cluster0.ovkygia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0