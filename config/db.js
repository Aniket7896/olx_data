const mongoose=require("mongoose")
require("dotenv").config();

const connection=mongoose.connect(process.env.MONGOURL).then((res)=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err)
})

module.exports={connection}