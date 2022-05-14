import express from "express";
import Categories from "../models/CategorySchema.js";
const CategoriesRoute = express.Router();

/* POST CATEGORIEs */

CategoriesRoute.post("/", async (req, res) => {

    try {
        const newCat = new Categories(req.body)
        const saveCat = await newCat.save()
        res.status(200).json(saveCat)
    } catch (error) {
        res.status(500).json(error)
    }
    
});


/* GET ALL CATEGORIES */

CategoriesRoute.get("/", async (req, res) => {

    try {
        const cates = await Categories.find()
        res.status(200).json(cates)
    } catch (error) {
        res.status(500).json(error)
    }
    
});


export default CategoriesRoute;
