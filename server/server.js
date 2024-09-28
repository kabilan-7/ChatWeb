import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectdb } from './config/db.js'
import authRoute from './routes/authRoute.js'

dotenv.config()
const app=express()
const port=process.env.PORT || 3000
app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
}))
app.use("/uploads/profiles",express.static('uploads/profile'))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoute)
connectdb()
app.listen(port,()=>{
    console.log(`The server is running at http://localhost:${port}`)
})