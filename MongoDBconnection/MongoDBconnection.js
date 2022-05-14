 import mongoose from 'mongoose';

 const MongoDBconnection = async()=>{
     
     try {
         await mongoose.connect(process.env.MONGODB_URL)
         console.log("mongoDB Connection successFull");
     } catch (error) {
         console.log(error);
     }
     
}

export default MongoDBconnection