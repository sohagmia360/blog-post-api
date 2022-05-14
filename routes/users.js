import bcrypt from "bcrypt";
import express from "express";
import Post from "../models/PostSchema.js";
import User from "../models/UserSchema.js";
const UserRoute = express.Router();

/* UPDATE USER */

UserRoute.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.send(200).json(updatedUser);
    } catch (error) {
      res.status(5000).json({ error: error.message });
    }
  } else {
    res.status(404).json("Your Update only your account ");
  }
});

/* DELETE USER */

UserRoute.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.body.id);
      try {
        console.log("User  :>> ", user);
        user && (await Post.deleteMany({ username: user.username }));
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    res.status(404).json("Your Delete  only your account ");
  }
});



/* GET USER */

UserRoute.get("/:id" , async (req , res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password , ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})










export default UserRoute;
