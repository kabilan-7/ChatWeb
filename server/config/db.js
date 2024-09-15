import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const connectdb = async ()=>{
    await mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("DB is connected")).catch((err)=>console.log(err.message))
} 