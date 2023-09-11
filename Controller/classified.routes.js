const express=require("express");
const { ClassifiedModel } = require("../models/clssified.model");

const app=express();

const classfiedRourter=express.Router();

classfiedRourter.post("/post",async(req,res)=>{
    const {name,description,category,image,location,postedAt,price}=req.body
    const newPost =new ClassifiedModel({
      name,
      description,
      category,
      image,
      location,
      postedAt,
      price,
    });
    try {
        await newPost.save();
        res.send({msg:"Data posted successfully"})
    } catch (error) {
        res.send("login first");
        console.log(error)
    }
})

classfiedRourter.get("/browse",async(req,res)=>{
    try {
      const { category, sortBy, search, page, pageSize } = req.query;
      const filter = {};

      // Apply filters if provided
      if (category) filter.category = category;
      if (search) filter.name = { $regex: search, $options: "i" }; // Case-insensitive search

      // Sort by criteria
      const sortCriteria = sortBy === "date" ? { postedAt: -1 } : {};

      // Pagination
      const skip = (page - 1) * pageSize;
      const limit = parseInt(pageSize);

      const total = await ClassifiedModel.countDocuments(filter);
      const classifieds = await ClassifiedModel.find(filter)
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit);

      res.status(200).json({ classifieds, total });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
})

module.exports={classfiedRourter}