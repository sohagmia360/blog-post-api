import bodyParser from "body-parser"
import cors from 'cors'
import 'dotenv/config'
import express from "express"
import multer from "multer"
import mongoDb from './MongoDBconnection/MongoDBconnection.js'
import AuthRoute from './routes/auth.js'
import CategoriesRoute from './routes/categories.js'
import PostRoute from './routes/posts.js'
import UserRoute from './routes/users.js'
const app = express()
const port = process.env.PORT || 5000

/* middleWere */
app.use(cors())
app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , "images")
    },filename : (req , file , cb)=>{
        cb(null , "hello.jpg")
    }
})

const upload = multer({storage : storage})

//  ,


app.post("/api/uploaded", upload.single("file") ,  (req , res)=>{
    res.status(200).json("success to upload")
})


/* ALL ROUTES */
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/post', PostRoute)
app.use('/api/categories', CategoriesRoute)

/* mongoDB connection */
mongoDb()



app.get('/',(req ,res)=>{
    res.send("hello word bg final output")
})

app.listen(port, ()=>{
    console.log(`server is running on ${port} ...`);
})