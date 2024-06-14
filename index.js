import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose'

import authRouter from './routes/auth.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authjwt } from './middlewares/jwt.js';
import { erroHandler } from './middlewares/error_handler.js';
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
app.use(authjwt)
app.use(erroHandler)
app.use(`${API}/`,authRouter)
// app.use(`${API}/users`,)
app.get(`${API}/users`, (req, res)=>{
    console.log("heelo")
    return res.json([{name:'Paul',org:'dbsteach',age:150}])
})

mongoose.connect(DATABASE_URL).then(()=>{
   
    app.listen(port,hostname,()=>{
        console.log(`listening on at http://${hostname}:${port}`)
    })
})