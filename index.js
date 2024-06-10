import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose'

import authRouter from './routes/auth.js';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config(); // Load environment variables from .env file
const app = express()
const hostname=process.env.HOSTNAME
const port = process.env.PORT
const API=process.env.API_URL
const DATABASE_URL = process.env.DATABASE_URL

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*',cors())
app.use(`${API}/`,authRouter)
app.get('/api/v1', (req, res)=>{
    console.log("heelo")
    res.send("hello")
})

mongoose.connect(DATABASE_URL).then(()=>{
   
    app.listen(port,hostname,()=>{
        console.log(`listening on at http://${hostname}:${port}`)
    })
})