const mongoose=require("mongoose");

const classified_Shema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Clothing", "Electronics", "Furniture", "Other"],
    required: true,
  },
  image:{type:String,required:true},
  location:{type:String,required:true},
  postedAt:{type:Date,default:Date.now()},
  price:{type:Number,required:true}
});

const ClassifiedModel=mongoose.model("classified",classified_Shema);
module.exports={ClassifiedModel}
