import express from "express";
import  testRoutes  from "./routes/testRoutes.js";
import dotenv from "dotenv";
import colors from "colors";
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
const PORT = process.env.PORT || 8000
const DEV_MODE = process.env.DEV_MODE


//routes 
app.use('/api/v1/test',testRoutes);


//listen
app.listen(PORT,()=>{
    console.log(`Server running in ${DEV_MODE} mode on port ${PORT}`.bgBlue);
})