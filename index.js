import express from 'express'

const app = express()
const hostname='0.0.0.0'
const port = 3000

app.get('/', (req, res)=>{
    console.log("heelo")
})
app.listen(port,hostname,()=>{
    console.log(`listening on at http://${hostname}:${port}`)
})