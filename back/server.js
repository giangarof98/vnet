import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();

import connectDB from "./config/mongo.js";
connectDB()

import user from './routes/user.js'
import post from './routes/post.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/user', user)
app.use('/api/post', post)

const port = 8000;
app.listen(port, () => console.log(`running on port ${port}`))