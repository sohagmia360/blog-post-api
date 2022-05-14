import bcrypt from 'bcrypt';
import express from "express";
import User from "../models/UserSchema.js";
const Route = express.Router();

/* REGISTER */

Route.post("/register", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password , 10)
  try {
    const NewUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword
    });

    const user = await NewUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(5000).json({ error: error.message });
  }
});

/* LOGIN */


Route.post("/login" ,async (req , res)=>{
  try {
    const user = await User.findOne({username : req.body.username})
    !user && res.status(400).json({error : 'Your Information is messing !'})

    const validPassword = await bcrypt.compare(req.body.password , user.password)
    !validPassword && res.status(400).json({error : 'Your Information is messing !'})
    const {password , ...others} = user._doc
    res.status(200).json(others)

  } catch (error) {
    res.send(500).json({error : error.message})
  }

})



export default Route