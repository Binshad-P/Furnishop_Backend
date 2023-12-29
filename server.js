import express  from "express"
import { connectDb } from "./config/dbConnection.js";
import router from '../Backend/routes/routes.js'
import cors from "cors"
const app=express()
connectDb()
app.use(express.json())
app.use(cors())
app.use('/product',router)

app.listen(3001,()=>{
    console.log("server started on port 3001");
})