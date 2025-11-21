import express from 'express';
import userrouter from './router/userroutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(express.json());
app.use('/api',userrouter);
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
app.listen(5000,()=>{
    console.log("server is running on port 5000");
})