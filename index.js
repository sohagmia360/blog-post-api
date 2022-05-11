import bodyParser from "body-parser"
import cors from 'cors'
import dotenv from "dotenv"
import express from "express"
const app = express()
const port = process.env.PORT || 5000

/* middleWere */
dotenv.config()
app.use(cors())
app.use(bodyParser.json())



app.get('/',(req ,res)=>{
    res.send("hello word")
})

app.listen(port, ()=>{
    console.log(`server is running on ${port} ...`);
})